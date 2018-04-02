var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sassLint = require('gulp-sass-lint');
var eslint = require('gulp-eslint');
var sequence = require('run-sequence');
var CONFIG = require('../config.js');

// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', function(cb) {
  sequence('lint:sass', 'lint:javascript', cb)
});

gulp.task('lint:sass', function() {
  return gulp.src(CONFIG.SASS_LINT_FILES)
    .pipe(plumber())
    .pipe(sassLint({
      config: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('lint:javascript', function () {
    return gulp.src(CONFIG.JS_FILES)
        .pipe(eslint({
        	useEslintrc: true,
        	configFile: '.eslintrc'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
