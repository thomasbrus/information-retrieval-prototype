import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  perform(query) {
    return this.get('store').query('search-result', { q: Ember.isBlank(query) ? '*' : query });
  }
});
