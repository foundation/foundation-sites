var fs = require('fs');
var gulp = require('gulp');
var octophant = require('octophant');
var Parker = require('parker/lib/Parker');
var prettyJSON = require('prettyjson');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var PATHS = [
  'scss',
  'node_modules/motion-ui/src'
];

var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'and_chr >= 2.3'
];

// Compiles Sass files into CSS
gulp.task('sass', ['sass:foundation', 'sass:docs']);

// Compiles Foundation Sass
gulp.task('sass:foundation', function() {
  return gulp.src('./foundation-sites.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: PATHS
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(rename('foundation.css'))
    .pipe(gulp.dest('_build/assets/css'));
});

// Compiles docs Sass (includes Foundation code also)
gulp.task('sass:docs', function() {
  return gulp.src('docs/assets/scss/docs.scss')
    .pipe(sass({
      includePaths: PATHS
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(gulp.dest('_build/assets/css'));
});

// Audits CSS filesize, selector count, specificity, etc.
gulp.task('sass:audit', ['sass:foundation'], function(cb) {
  fs.readFile('./_build/assets/css/foundation-sites.css', function(err, data) {
    var parker = new Parker(require('parker/metrics/All'));
    var results = parker.run(data.toString());
    console.log(prettyJSON.render(results));
    cb();
  });
});

// Generates a settings file
gulp.task('sass:settings', function() {
  var options = {
    title: 'Foundation for Sites Settings',
    output: './scss/_settings.scss',
    groups: {
      'grid': 'The Grid',
      'off-canvas': 'Off-canvas',
      'typography-base': 'Base Typography'
    },
    sort: [
      'global',
      'breakpoints',
      'grid',
      'typography-base',
      'typography-helpers'
    ],
    imports: ['util/util']
  }

  octophant('./scss', options);
});
