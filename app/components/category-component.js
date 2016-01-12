import Ember from 'ember';

let CategoryComponent = Ember.Component.extend({
  classNames: ['category'],
  classNameBindings: ['isSelected:is-selected:is-not-selected'],

  isSelected: false,

  action: Ember.computed('isSelected', function() {
    return this.get('isSelected') ? 'deselect' : 'select';
  }),

  click() {
    this._super(...arguments);
    this.sendAction('action', this.attrs.category);
    this.toggleProperty('isSelected');
  },

  didInsertElement() {
    this._super();
    Ember.run.schedule('afterRender', window.elementQuery);
  }
});

CategoryComponent.reopenClass({
  positionalParams: ['category'],
});

export default CategoryComponent;
