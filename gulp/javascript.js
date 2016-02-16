var gulp = require('gulp');
var chalk = require('chalk');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

var FOUNDATION = [
  'js/foundation.core.js',
  'js/foundation.util.*.js',
  'js/*.js'
];

var DEPS = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/motion-ui/dist/motion-ui.js',
  'node_modules/what-input/what-input.js'
];

var DOCS = [
  'node_modules/clipboard/dist/clipboard.js',
  'node_modules/corejs-typeahead/dist/typeahead.bundle.js',
  'docs/assets/js/docs.*.js',
  'docs/assets/js/docs.js'
];

// Compiles JavaScript into a single file
gulp.task('javascript', ['javascript:foundation', 'javascript:deps', 'javascript:docs']);

gulp.task('javascript:foundation', function() {
  return gulp.src(FOUNDATION)
    .pipe(babel()
      .on('error', onBabelError))
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

gulp.task('javascript:deps', function() {
  return gulp.src(DEPS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

gulp.task('javascript:docs', function() {
  return gulp.src(DOCS)
    .pipe(concat('docs.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

function onBabelError(err) {
  console.log(
    chalk.red(
      err.fileName +
      (
          err.loc ?
          '(' + err.loc.line + ',' + err.loc.column + '): ' :
          ': '
      )
    ) +
    'error Babel: ' + err.message + '\n' +
    err.codeFrame
  );
}
