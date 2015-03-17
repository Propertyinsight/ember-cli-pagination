import Ember from 'ember';

export default Ember.Mixin.create({

    queryParams: ['q', 'page', 'pageSize'],
    q: '',
    page: 1,
    pageSize: 10,

    domain: null, // this must be defined by the consuming class

    total: function() {
        return this.store.metadataFor(this.get('domain')).paging ? this.store.metadataFor(this.get('domain')).paging.total : null;
    }.property('model'),

    paging: function() {
        return this.store.metadataFor(this.get('domain')).paging;
    }.property('model'),

    timer: null,

    isLoading: false,

    filter: function () {

        if (!this.get('domain'))
            throw new Error('domain must be defined.');

        Ember.run.cancel(this.timer);

        this.set('isLoading', true);
        
        var params = {};
        this.get('queryParams').forEach(function(param){
          params[param.underscore()] = this.get(param);
        }, this);

        this.store.find(this.get('domain'), params).then(function(data){
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
