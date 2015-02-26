var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var shipyard = require('shipyard');

var files = {
  sassSrc: 'scss/foundation.scss',
  sassPaths: ['scss'],
  javascript: ['js/foundation/foundation.*.js', 'js/foundation/foundation.js']
}

// Assembles the layout, pages, and partials in the docs folder
gulp.task('html', function() {
  gulp.src('docs/pages/**/*.html')
    .pipe(shipyard({
      layout: 'docs/layout/default.html',
      partials: 'docs/partials/*.html'
    }))
    .pipe(gulp.dest('dist'));
});

// Compiles Sass files into CSS
gulp.task('sass', function() {
  gulp.src(files.sassSrc)
    .pipe($.sass({
      includePaths: files.sassPaths,
      errLogToConsole: true
    }))
    .pipe(gulp.dest('dist/assets/css'));
});

// Compiles JavaScript into a single file
gulp.task('javascript', function() {
  gulp.src(files.javascript)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

// Lints Sass files for formatting issues
gulp.task('lint', function() {
  gulp.src(['scss/**/*.scss', '!scss/vendor/**/*.scss', '!scss/components_old/**/*.scss'])
    .pipe($.scssLint({
      'config': 'config/scss-lint.yml'
    }));
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['html', 'sass', 'javascript'], function() {
  gulp.watch('docs/**/*.html', ['html']);
  gulp.watch('scss/**/*', ['sass']);
  gulp.watch('js/**/*', ['javascript']);
});
