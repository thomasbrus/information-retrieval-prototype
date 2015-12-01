import Ember from 'ember';

export default Ember.Route.extend({
  search: Ember.inject.service(),
  queryParams: { categoryIds: { refreshModel: true } },

  model(params) {
    return this.store.findAll('category').then(categories => {
      let categorySelection = this.store.createRecord('category-selection', {});

      categories.forEach(category => {
        if (params.selectedCategoryIds.contains(category.get('id'))) {
          categorySelection.get('categories').addObject(category);
        }
      });

      let query = categorySelection.get('searchQuery');
      let searchResults = this.get('search').perform(query);

      return Ember.RSVP.hash({ categories, searchResults });
    });
  },

  serializeQueryParam(value, urlKey) {
    if (urlKey === 'categoryIds') {
      return JSON.stringify(value.map(id => parseInt(id)));
    } else {
      this._super(...arguments);
    }
  },

  deserializeQueryParam(value, urlKey) {
    if (urlKey === 'categoryIds') {
      return Ember.A(JSON.parse(value).map(id => id.toString()));
    } else {
      this._super(...arguments);
    }
  },
});
