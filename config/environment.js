/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'information-retrieval-prototype',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    // See https://github.com/rwjblue/ember-cli-content-security-policy#example
    contentSecurityPolicy: {
      'font-src': "'self' https://fonts.gstatic.com",
      'style-src': "'self' https://fonts.googleapis.com",
      'img-src': "'self' data: https://*.s3.amazonaws.com",
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
    ENV.baseURL = '/information-retrieval-prototype/';
    ENV['ember-cli-mirage'] = { enabled: true };
  }

  return ENV;
};
