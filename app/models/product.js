import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('string'),
  url: DS.attr('string'),
  imageUrl: DS.attr('string'),
});
