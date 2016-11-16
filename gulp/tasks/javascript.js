var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var onBabelError = require('./babel-error.js');

var CONFIG = require('../config.js');

// Compiles JavaScript into a single file
gulp.task('javascript', ['javascript:foundation', 'javascript:deps', 'javascript:docs']);

gulp.task('javascript:foundation', function() {
  return gulp.src(CONFIG.JS_FILES)
    .pipe(babel()
      .on('error', onBabelError))
    .pipe(gulp.dest('_build/assets/js/plugins'))
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

gulp.task('javascript:deps', function() {
  return gulp.src(CONFIG.JS_DEPS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

gulp.task('javascript:docs', function() {
  return gulp.src(CONFIG.JS_DOCS)
    .pipe(concat('docs.js'))
    .pipe(gulp.dest('_build/assets/js'));
});
