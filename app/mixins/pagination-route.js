import Ember from 'ember';

export default Ember.Mixin.create({

    fetched: false,

    queryParams: {
        q: {
            replace: true
        }
    },

    model: function() {
        return [];
    },

    setupController: function(controller, model) {
        this._super(controller, model);

        if (!this.get('fetched'))
            controller.filter();

        this.set('fetched', true);
    }

});
