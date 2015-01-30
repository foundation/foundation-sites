var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var files = {
  sassSrc: 'docs/assets/scss/docs.scss',
  sassPaths: ['scss'],
  javascript: ['js/foundation/foundation.*.js', 'js/foundation/foundation.js']
}

gulp.task('html', function() {
  gulp.src('docs/pages/**/*.html')
    .pipe($.assemble({
      assets: 'build/assets',
      data: ['docs/data/*.json'],
      partials: ['docs/includes/**/*.{html,scss}'],
      layoutdir: 'docs/layouts',
      layout: 'default.html'
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('css', function() {
  gulp.src(files.sassSrc)
    .pipe($.sass({
      includePaths: files.sassPaths
    }))
    .pipe(gulp.dest('build/assets/scss'));
});

gulp.task('javascript', function() {
  gulp.src(files.javascript)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('build/assets/js'));
});

gulp.task('default', ['html', 'css', 'javascript'], function() {

});