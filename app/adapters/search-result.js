import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://glacial-crag-9384.herokuapp.com',

  urlForQuery() {
    return `${this.buildURL()}/search.php`;
  },
});
