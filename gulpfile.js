// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var gulp     = require('gulp');
var sequence = require('gulp-sequence');
var argv     = require('yargs').argv;
var del      = require('del');
var exec     = require('child_process').exec;
var karma    = require('karma').Server;


// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  appJS: [
    'src/app/app.js',
    'src/app/location_controller.js',
    'src/app/factory.js',
    'src/app/auto_complete_directive.js'
  ],

  angularJS: [
    'vendor/angular/angular.js',
    'vendor/lodash/dist/lodash.js',
    'vendor/angular-simple-logger/dist/angular-simple-logger.js',
    'vendor/angular-google-maps/dist/angular-google-maps.js'
  ],

  assets: [
    './src/index.html'
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function() {
  return del(['./build']);
});

// Copies static assets
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './src/'
  })
  .pipe(gulp.dest('./build'));
});


gulp.task('uglify', ['uglify:angular', 'uglify:app'])

gulp.task('uglify:angular', function(cb) {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.angularJS)
  .pipe(uglify)
  .pipe($.concat('angular.js'))
  .pipe(gulp.dest('./build/vendor/js/'))
  ;
});

gulp.task('uglify:app', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
  .pipe(uglify)
  .pipe($.concat('app.js'))
  .pipe(gulp.dest('./build/app/'))
  ;
});

/**
 * Runs tests once and exits
 */
gulp.task('karma', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});

// Run tests then watches for changes
gulp.task('karma-live', function(done) {
    karma.start({
      configFile: __dirname + '/karma.conf.js'
    }, function() {
      done();
    });
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', function() {
  gulp.src('./build')
  .pipe(
    $.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    })
  );
});


// Watches source files and invokes associated task when changes happen
gulp.task('watch', function () {
  // Watch Test
  gulp.watch(paths.appJS, ['karma']);
  gulp.watch(['./test/**/*.js'], ['karma']);

  // Watch JavaScript
  gulp.watch(paths.appJS, ['uglify:app']);
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', 'karma', 'copy', 'uglify', cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', function (cb) {
  sequence('build', 'server', 'watch', cb);
});
