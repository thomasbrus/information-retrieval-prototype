import Ember from 'ember';

let CategoryComponent = Ember.Component.extend({
  tagName: 'a',

  classNames: ['category'],
  classNameBindings: ['isSelected:is-selected:is-not-selected'],

  isSelected: false,

  action: Ember.computed('isSelected', function() {
    return this.get('isSelected') ? 'deselect' : 'select';
  }),

  click() {
    this._super(...arguments);
    this.sendAction('action', this.attrs.category);
  },
});

CategoryComponent.reopenClass({
  positionalParams: ['category'],
});

export default CategoryComponent;
