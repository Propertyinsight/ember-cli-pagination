import Ember from 'ember';
import PaginationControllerMixin from 'ember-cli-pagination/mixins/pagination-controller';

module('PaginationControllerMixin');

// Replace this with your real tests.
test('it works', function() {
  var PaginationControllerObject = Ember.Object.extend(PaginationControllerMixin);
  var subject = PaginationControllerObject.create();
  ok(subject);
});
