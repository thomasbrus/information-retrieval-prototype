import Ember from 'ember';

let CategoriesComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['categories'],

  selectedIds: [],

  actions: {
    select(category) {
      this.get('selectedIds').addObject(category.get('id'));
    },
    deselect(category) {
      this.get('selectedIds').removeObject(category.get('id'));
    },
  }
});

CategoriesComponent.reopenClass({
  positionalParams: ['categories'],
});

export default CategoriesComponent;
