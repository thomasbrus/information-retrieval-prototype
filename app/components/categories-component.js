import Ember from 'ember';

let CategoriesComponent = Ember.Component.extend({
  tagName: 'ul',
  classNames: ['categories'],

  selectedIds: [],

  selectCategoryAction: 'selectCategory',
  deselectCategoryAction: 'deselectCategory',

  actions: {
    select(category) {
      this.sendAction('selectCategoryAction', category);
    },
    deselect(category) {
      this.sendAction('deselectCategoryAction', category);
    },
  },
});

CategoriesComponent.reopenClass({
  positionalParams: ['categories'],
});

export default CategoriesComponent;
