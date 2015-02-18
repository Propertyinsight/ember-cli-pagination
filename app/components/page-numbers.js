import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'ul',

    classNames: ['pagination', 'width-100'],

    page: function () {
        return this.get('paging') ? this.get('paging').page : null;
    }.property('paging'),

    pages: function () {
        return this.get('paging') ? this.get('paging').pages : null;
    }.property('paging'),

    blocks: function () {
        var blocks = [];
        var page = this.get('page');
        var pages = this.get('pages');
        for (var i = 1; i <= pages; i++) {
            if (i === 1 || i === pages || (i >= (page - 2) && i <= (page + 2)))
                blocks.push({
                    link: true,
                    page: i,
                    active: i === page
                });
            else if (i === 2 && page > 4)
                blocks.push({
                    link: false
                });
            else if (i === (pages - 1) && page < (pages - 4))
                blocks.push({
                    link: false
                });
        }

        return blocks;
    }.property('page', 'pages'),

    hasPrevious: function () {
        return this.get('page') > 1;
    }.property('page'),

    hasNext: function () {
        return this.get('page') < this.get('pages');
    }.property('page', 'pages'),

    previous: function () {
        return this.get('page') - 1;
    }.property('page'),

    next: function () {
        return this.get('page') + 1;
    }.property('page')

});
