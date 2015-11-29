import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  keywords: DS.attr('array'),
  icon: DS.attr('string'),
});
