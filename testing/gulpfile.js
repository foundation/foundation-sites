var $      = require('gulp-load-plugins')();
var browser = require('browser-sync')
var gulp   = require('gulp');
var rimraf = require('rimraf');
var sequence = require('run-sequence');

// Delete the "_build" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf('./_build', done);
});

// Copy files out of the assets folder
gulp.task('copy', function() {
  return gulp.src('./*.html')
    .pipe(gulp.dest('./_build'));
});

// Compile Sass into CSS
gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./_build/css'));
});

// Combine JavaScript into one file
gulp.task('javascript', function() {
  return gulp.src([
    '../node_modules/jquery/dist/jquery.js',
    '../js/foundation.core.js',
    '../js/foundation.util.*.js',
    '../js/*.js',
    './js/**/*.js'
  ])
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./_build/js'));
});

// Create the "_build" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['copy', 'sass', 'javascript'], done);
});

// Starts a BrowerSync instance
gulp.task('server', ['build'], function() {
  browser.init({server: './_build', port: '3000'});
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['server'], function() {
  gulp.watch(['./*.html'], ['copy', browser.reload]);
  gulp.watch(['./scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['./js/**/*.js'], ['javascript', browser.reload]);
});
