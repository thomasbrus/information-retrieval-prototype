import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: { selectedCategoryIds: 'categoryIds' },
  selectedCategoryIds: [],

  actions: {
    selectCategory(category) {
      this.get('selectedCategoryIds').addObject(category.get('id'));
    },
    deselectCategory(category) {
      this.get('selectedCategoryIds').removeObject(category.get('id'));
    },
  },
});
