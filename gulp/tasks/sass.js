var gulp = require('gulp');
var sass = require('gulp-sass');
var eyeglass = require('eyeglass');
var gss = require('gulp-shopify-sass');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var CONFIG = require('../config.js');

// Compiles Sass files into SCSS and CSS
gulp.task('sass', gulp.series('sass:foundationCSS', 'sass:docs'));

// Concat Foundation Sass and its dependencies into a single SCSS file
// TODO: This is not ran with the default deploy and sass tasks. There are still issues with eyeglass and gulp-shopify-sass
gulp.task('sass:foundationSCSS', function() {
  return gulp.src(['assets/foundation.scss'])
    .pipe(gss(eyeglass()))
    .pipe(rename('foundation.scss'))
    .pipe(gulp.dest('_build/assets/scss'));
});

// Compiles Foundation Sass into CSS
gulp.task('sass:foundationCSS', function() {
  return gulp.src(['assets/*'])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass(eyeglass()).on('error', sass.logError))
    .pipe(postcss([autoprefixer()])) // uses ".browserslistrc"
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/css'));
});

// Compiles docs Sass (includes Foundation code also)
gulp.task('sass:docs', function() {
  return gulp.src('docs/assets/scss/docs.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(eyeglass({
      includePaths: CONFIG.SASS_DOC_PATHS
    })).on('error', sass.logError))
    .pipe(postcss([autoprefixer()])) // uses ".browserslistrc"
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/css'));
});
