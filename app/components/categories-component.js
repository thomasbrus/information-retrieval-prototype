import Ember from 'ember';

let CategoriesComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['categories'],

  selectedIds: [],

  selectedCategories: Ember.computed('selectedIds', 'attrs.categories.@each.id', function() {
    return this.get('attrs.categories').filter(this.isSelected.bind(this));
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

CategoriesComponent.reopenClass({
  positionalParams: ['categories'],
});

export default CategoriesComponent;
