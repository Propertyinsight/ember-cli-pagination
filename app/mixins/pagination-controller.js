import Ember from 'ember';

export default Ember.Mixin.create({

    calculatedQueryParams: [],
    queryParams: ['q', 'page', 'pageSize'],
    q: '',
    page: 1,
    pageSize: 10,

    modelName: null, // this must be defined by the consuming class

    total: function() {
        return this.store.metadataFor(this.get('modelName')).paging ? this.store.metadataFor(this.get('modelName')).paging.total : null;
    }.property('model'),

    paging: function() {
        return this.store.metadataFor(this.get('modelName')).paging;
    }.property('model'),

    timer: null,

    isLoading: false,

    filter: function () {

        if (!this.get('modelName'))
            throw new Error('modelName must be defined.');

        Ember.run.cancel(this.timer);

        this.set('isLoading', true);
        
        var params = {};
        this.get('queryParams').forEach(function(param){
          params[param.underscore()] = this.get(param);
        }, this);

        // if we want to use calculated query params, we need to store them in a separate property
        // otherwise they get wiped out.
        this.get('calculatedQueryParams').forEach(function(param){
          params[param.underscore()] = this.get(param);
        }, this);

        this.store.find(this.get('modelName'), params).then(function(data){
            this.set('model', data);
            this.set('isLoading', false);
        }.bind(this), function (error) {
            this.set('isLoading', false);

            if (error.status === 401)
                this.send('error', error);
            else
                this.session.showGlobalAlert(error, 6000, 'danger');
        }.bind(this));
    },

    onPageChange: function() {
        this.filter();
    }.observes('page'),

    onQChange: function(){
        this.set('isLoading', true);
        Ember.run.cancel(this.timer);
        this.timer = Ember.run.later(this, this.filter, 500);
    }.observes('q'),

    actions: {
        pageTo: function(page) {
            this.set('page', page);
        }
    }

});
