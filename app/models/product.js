import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  imageUrl: DS.attr('string'),
  price: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
});
