var gulp = require('gulp');
var filter = require('gulp-filter');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('deploy', ['deploy:dist']);

gulp.task('deploy:dist', ['sass:foundation', 'javascript:foundation'], function() {
  var cssFilter = filter(['*.css']);
  var jsFilter  = filter(['*.js']);

  return gulp.src(['./_build/assets/css/foundation.css', '_build/assets/js/foundation.js'])
    .pipe(cssFilter)
      .pipe(gulp.dest('./dist'))
      .pipe(minifyCss())
      .pipe(rename('foundation.min.css'))
      .pipe(gulp.dest('./dist'))
    .pipe(cssFilter.restore())
    .pipe(jsFilter)
      .pipe(gulp.dest('./dist'))
      .pipe(uglify())
      .pipe(rename('foundation.min.js'))
      .pipe(gulp.dest('./dist'));
});
gulp.task('deploy:custom', ['sass:foundation', 'javascript:foundation'], function() {
  var cssFilter = filter(['*.css']);
  var jsFilter  = filter(['*.js']);

  gulp.src('./_build/assets/css/foundation.css')
      .pipe(minifyCss())
      .pipe(rename('foundation.min.css'))
      .pipe(gulp.dest('./_build/assets/css'));

  gulp.src('_build/assets/js/foundation.js')
      .pipe(uglify())
      .pipe(rename('foundation.min.js'))
      .pipe(gulp.dest('./_build/assets/js'));
});
