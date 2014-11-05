import Ember from 'ember';
import PaginationRouteMixin from 'ember-cli-pagination/mixins/pagination-route';

module('PaginationRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var PaginationRouteObject = Ember.Object.extend(PaginationRouteMixin);
  var subject = PaginationRouteObject.create();
  ok(subject);
});
