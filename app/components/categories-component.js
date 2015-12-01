import Ember from 'ember';

let CategoriesComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['categories'],

  selectedIds: [],

  selectCategoryAction: 'selectCategory',
  deselectCategoryAction: 'deselectCategory',

  actions: {
    select(category) {
      this.sendAction('selectCategoryAction', category);
      // this.get('selectedIds').addObject(category.get('id'));
    },
    deselect(category) {
      this.sendAction('deselectCategoryAction', category);
      // this.get('selectedIds').removeObject(category.get('id'));
    },
  },
});

CategoriesComponent.reopenClass({
  positionalParams: ['categories'],
});

export default CategoriesComponent;
