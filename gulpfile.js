var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var shipyard = require('shipyard');
var supercollider = require('supercollider').init;
var rimraf = require('rimraf');

var files = {
  sassSrc: 'scss/foundation.scss',
  sassPaths: ['scss'],
  sassTestPaths: ['scss/**/*.scss', '!scss/vendor/**/*.scss', '!scss/components_old/**/*.scss'],
  javascript: ['js/foundation.core.js', 'js/*.js']
}

gulp.task('clean', function() {
  rimraf.sync('dist');
});

// Assembles the layout, pages, and partials in the docs folder
gulp.task('html', function() {
  var mdFilter = $.filter(['*.md']);

  gulp.src('docs/pages/**/*')
    .pipe($.cached('docs'))
    .pipe(mdFilter)
      .pipe(supercollider({
        template: 'docs/layout/component.html',
        adapters: ['sass', 'js']
      }))
    .pipe(mdFilter.restore())
    .pipe(shipyard({
      layout: 'docs/layout/default.html',
      partials: 'docs/partials/*.html'
    }))
    .pipe(gulp.dest('dist'));
});

// Compiles Sass files into CSS
gulp.task('sass', ['sass:foundation', 'sass:docs']);

gulp.task('sass:foundation', function() {
  return gulp.src(files.sassSrc)
    .pipe($.sass({
      includePaths: files.sassPaths,
      errLogToConsole: true
    }))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('sass:docs', function() {
  return gulp.src('docs/assets/scss/docs.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('dist/assets/css'));
})

// Compiles JavaScript into a single file
gulp.task('javascript', function() {
  return gulp.src(files.javascript)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', function() {
  $.jshint.lookup = false;
  
  gulp.src(files.sassTestPaths)
    .pipe($.scssLint({
      'config': 'config/scss-lint.yml'
    }));

  gulp.src('js/*.js')
    .pipe($.jshint('./config/.jshintConfig'))
    .pipe($.jshint.reporter('default'));
});

// Runs unit tests
gulp.task('test', function() {
  return $.rubySass('./spec/scss/spec.scss', {
    loadPath: ['scss', 'bower_components/bootcamp/dist'],
    style: 'nested',
    quiet: true
  })
    .on('data', function(data) {
      console.log(data.contents.toString());
    });
})

gulp.task('build', ['clean', 'html', 'sass', 'javascript']);

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['build'], function() {
  gulp.watch('docs/**/*', ['html']);
  gulp.watch('scss/**/*', ['sass:foundation']);
  gulp.watch('docs/assets/scss/**/*', ['sass:docs'])
  gulp.watch('js/**/*', ['javascript']);
});
