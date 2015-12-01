import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      categories: this.store.findAll('category'),
      // searchResults: this.store.query('search-result', { q: 'auto' })
    });
  }

  serializeQueryParam(value, urlKey) {
    if (urlKey === 'categoryIds') {
      return JSON.stringify(value.map(id => parseInt(id)));
    } else {
      this._super(...arguments);
    }
  },

  deserializeQueryParam(value, urlKey) {
    if (urlKey === 'categoryIds') {
      return Ember.A(JSON.parse(value).map(id => id.toString()));
    } else {
      this._super(...arguments);
    }
  },
});
