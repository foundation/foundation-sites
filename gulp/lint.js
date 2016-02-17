var gulp = require('gulp');
var scssLint = require('gulp-scss-lint');
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

gulp.task('lint:javascript', function () {
    return gulp.src(['js/*.js'])
        .pipe(eslint({
        	useEslintrc: true,
        	configFile: '.eslintrc'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
