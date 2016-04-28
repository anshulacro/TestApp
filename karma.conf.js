module.exports = function (config) {
  'use strict';

  config.set({
    frameworks: [ 'jasmine-jquery', 'jasmine' ],

    files: [
    'vendor/angular/angular.js',
    'vendor/angular-mocks/angular-mocks.js',

    'src/app/app.js',

    'tests/**/*.js'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],
    preprocessors: {
      'src/templates/**/*.html' : 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/'
    },
  });
};