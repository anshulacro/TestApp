module.exports = function (config) {
  'use strict';

  config.set({
    frameworks: [ 'jasmine-jquery', 'jasmine' ],

    files: [
    'vendor/angular/angular.js',
    'vendor/lodash/dist/lodash.js',
    'vendor/angular-simple-logger/dist/angular-simple-logger.js',
    'vendor/angular-google-maps/dist/angular-google-maps.js',
    'vendor/angular-mocks/angular-mocks.js',
    'http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false',
    'src/app/app.js',
    'src/app/location_controller.js',
    'src/app/factory.js',
    'src/app/auto_complete_directive.js',
    'tests/*.js'
    ],

    reporters: ['progress'],
    plugins:[
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-jasmine-jquery',
       'karma-ng-html2js-preprocessor'

    ],
    port: 9876,
    colors: true,
    autoWatch: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],
    preprocessors: {
      'src/templates/**/*.html' : 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/'
    },
  });
};