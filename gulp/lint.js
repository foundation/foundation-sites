var gulp = require('gulp');
var scssLint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');

var PATHS = [
  'scss/**/*.scss',
  '!scss/vendor/**/*.scss',
  '!scss/components_old/**/*.scss'
];

// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', ['lint:sass', 'lint:javascript']);

gulp.task('lint:sass', function() {
  return gulp.src(PATHS)
    .pipe(scssLint());
});

gulp.task('lint:javascript', function() {
  jshint.lookup = false;

  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint:eslint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['js/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
        	useEslintrc: true,
        	configFile: '.eslintrc'
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});
