import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  perform(query) {
    if (Ember.isBlank(query)) { return DS.PromiseArray.create({ promise: Ember.RSVP.resolve([]) }); }
    return this.get('store').query('search-result', { q: query });
  }
});
