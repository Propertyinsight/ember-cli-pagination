import Ember from 'ember';

export default Ember.Mixin.create({

    queryParams: {
        q: {
            refreshModel: true,
            replace: true
        },
        page: {
            refreshModel: true
        }
    }

});
