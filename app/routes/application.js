import Ember from 'ember';

export default Ember.Route.extend({
  actions:  {
    loading() {
      NProgress.start();
      this.router.one('didTransition', NProgress.done);
      return true;
    },

    error() {
      NProgress.done();
      return true;
    }
  }
});
