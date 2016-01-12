import Ember from 'ember';
import CategorySelection from '../models/category-selection';

export default Ember.Route.extend({
  searchService: Ember.inject.service('search'),
  queryParams: { category_ids: { refreshModel: true } },

  model(params) {
    return this.store.findAll('category').then(categories => {
      let categorySelection = new CategorySelection(categories.filter(category =>
        params.selectedCategoryIds.contains(category.get('id'))
      ));

      let query = categorySelection.buildSearchQuery();
      let searchResults = this.get('searchService').perform(query);

      return Ember.RSVP.hash({ categories, searchResults });
    });
  },

  serializeQueryParam(value, urlKey) {
    if (urlKey === 'category_ids') {
      return JSON.stringify(value.map(id => parseInt(id)));
    } else {
      return this._super(...arguments);
    }
  },

  deserializeQueryParam(value, urlKey) {
    if (urlKey === 'category_ids') {
      return Ember.A(JSON.parse(value).map(id => id.toString()));
    } else {
      return this._super(...arguments);
    }
  },

  actions:  {
    loading() {
      let controller = this.controllerFor(this.routeName);
      controller.set('isLoading', true);
      this.router.one('didTransition', () => controller.set('isLoading', false));
      return true;
    },

    error() {
      this.controllerFor(this.routeName).set('isLoading', false);
      return true;
    }
  }
  
});
