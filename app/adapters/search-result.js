import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://circus.ewi.utwente.nl:16842',
  namespace: 'searsia',

  headers: {
    'Accept': 'application/searsia+json;charset=UTF-8',
  },

  urlForQuery() {
    return `${this.buildURL()}/search`;
  },
});
