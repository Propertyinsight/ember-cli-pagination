import Ember from 'ember';

export default Ember.Mixin.create({

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
        controller.filter();
    }

});
