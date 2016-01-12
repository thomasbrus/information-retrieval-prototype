import Ember from 'ember';

let SearchResultComponent = Ember.Component.extend({
  tagName: 'a',
  classNames: ['search-result'],
  attributeBindings: ['href'],

  href: Ember.computed.oneWay('searchResult.product.url'),

  didInsertElement() {
    this._super();
    Ember.run.schedule('afterRender', window.elementQuery);
  }
});

SearchResultComponent.reopenClass({
  positionalParams: ['searchResult'],
});

export default SearchResultComponent;
