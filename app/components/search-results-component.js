import Ember from 'ember';

let SearchResultsComponent = Ember.Component.extend({
  tagName: 'ul',
  classNames: ['search-results'],

  isLoading: false,

  searchResultsSorting: ['rank:asc'],
  sortedSearchResults: Ember.computed.sort('searchResults', 'searchResultsSorting')
});

SearchResultsComponent.reopenClass({
  positionalParams: ['searchResults'],
});

export default SearchResultsComponent;
