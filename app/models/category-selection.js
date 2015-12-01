import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  categories: DS.hasMany('categories', { async: false }),

  searchQuery: Ember.computed('categories.@each.keywords', function() {
    return this.get('categories').reduce((query, category) => {
      return `${query} ${category.get('keywords').join(' ')}`;
    }, "");
  }),
});
