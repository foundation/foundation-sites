var gulp = require('gulp');
var scssLint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');

var PATHS = [
  'scss/**/*.scss',
  '!scss/vendor/**/*.scss',
  '!scss/components_old/**/*.scss'
];

// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', ['lint:sass', 'lint:javascript']);

gulp.task('lint:sass', function() {
  return gulp.src(PATHS)
    .pipe(scssLint({
      'config': 'config/scss-lint.yml'
    }));
});

gulp.task('lint:javascript', function() {
  jshint.lookup = false;

  return gulp.src('js/*.js')
    .pipe(jshint('./config/.jshintConfig'))
    .pipe(jshint.reporter('default'));
});
