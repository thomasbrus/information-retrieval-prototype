import Ember from 'ember';

let SearchResultsComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['search-results'],

  searchResultsSorting: ['rank:asc'],
  sortedSearchResults: Ember.computed.sort('searchResults', 'searchResultsSorting'),
});

SearchResultsComponent.reopenClass({
  positionalParams: ['searchResults'],
});

export default SearchResultsComponent;
