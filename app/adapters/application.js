import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  shouldReloadAll() { return true; },
  isNewSerializerAPI: true
});
