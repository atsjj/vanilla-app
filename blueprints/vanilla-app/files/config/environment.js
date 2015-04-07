/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: '<%= modulePrefix %>',
    environment: environment,
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      rootElement: 'body'
    }
  };

  if (environment === 'development') {
    // Here you can define specific flags/options to your application
    // instance based of this environment
  }

  if (environment === 'test') {
    ENV.APP.rootElement = '#vanilla-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
