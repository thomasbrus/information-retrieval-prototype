import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(value) {
    return Ember.isArray(value) ? Ember.A(value) : Ember.A();
  },
  serialize(value) {
    return Ember.isArray(value) ? Ember.A(value) : Ember.A();
  }
});
