import DS from 'ember-data';

export default DS.Model.extend({
  rank: DS.attr('number'),
  resourceId: DS.attr('string'),
  score: DS.attr('number'),
  query: DS.attr('string'),
  product: DS.belongsTo('product'),
});
