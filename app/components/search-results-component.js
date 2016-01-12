import Ember from 'ember';

let SearchResultsComponent = Ember.Component.extend({
  tagName: 'ul',
  classNames: ['search-results'],

  isLoading: false,
});

SearchResultsComponent.reopenClass({
  positionalParams: ['searchResults'],
});

export default SearchResultsComponent;
