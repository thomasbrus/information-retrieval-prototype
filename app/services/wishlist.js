import Ember from 'ember';

export default Ember.Service.extend({
  items: [],

  addItem(item) {
    this.get('items').addObject(item);
  },

  removeItem(item) {
    this.get('items').removeObject(item);
  },
});
