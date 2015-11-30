import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: { selectedIds: 'ids' },
  selectedIds: [],

  selectedCategories: Ember.computed('selectedIds', 'model.@each.id', function() {
    return this.get('model').filter(this.isSelected.bind(this));
  }),

  isSelected(category) {
    return this.get('selectedIds').contains(parseInt(category.get('id')));
  },

  actions: {
    select(category) {
      this.get('selectedIds').addObject(parseInt(category.get('id')));
    },
    deselect(category) {
      this.get('selectedIds').removeObject(parseInt(category.get('id')));
    },
  }
});
