import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  iconUrl: DS.attr('string'),

  searchTerm: Ember.computed('title', function() {
    return title.decamelize();
  }),
});
