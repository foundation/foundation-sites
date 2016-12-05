'use strict';

var fs = require('fs');
var gulp = require('gulp');
var Parker = require('parker/lib/Parker');
var prettyJSON = require('prettyjson');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');

var CONFIG = require('../config.js');

// Compiles Sass files into CSS
gulp.task('sass', ['sass:foundation', 'sass:docs']);

// Compiles Foundation Sass
gulp.task('sass:foundation', function() {
  return gulp.src(['assets/*'])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      includePaths: CONFIG.SASS_DEPS_PATHS
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/css'))
    .on('finish', function() {
      gulp.src(CONFIG.SASS_LINT_FILES)
        .pipe(sassLint({
            config: './.sass-lint.yml'
          }))
        .pipe(sassLint.format());
    });
});

// Compiles docs Sass (includes Foundation code also)
gulp.task('sass:docs', function() {
  return gulp.src('docs/assets/scss/docs.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: CONFIG.SASS_DEPS_PATHS.concat(CONFIG.SASS_DOC_PATHS)
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: CONFIG.CSS_COMPATIBILITY
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/css'));
});

// Audits CSS filesize, selector count, specificity, etc.
gulp.task('sass:audit', ['sass:foundation'], function(cb) {
  fs.readFile('./_build/assets/css/foundation.css', function(err, data) {
    var parker = new Parker(require('parker/metrics/All'));
    var results = parker.run(data.toString());
    console.log(prettyJSON.render(results));
    cb();
  });
});
