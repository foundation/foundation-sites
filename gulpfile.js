var gulp  = require('gulp');
var Super = require('supercollider');
var $     = require('gulp-load-plugins')();
$.uncomment = require('./lib/uncomment-css');

var files = {
  sassSrc: 'docs_old/assets/scss/docs.scss',
  sassPaths: ['scss'],
  javascript: ['js/foundation/foundation.*.js', 'js/foundation/foundation.js']
}

gulp.task('dist', function() {
  gulp.src('scss/foundation.scss')
    .pipe($.sass({
      includePaths: files.sassPaths
    }))
    .pipe($.uncomment())
    .pipe(gulp.dest('dist/css'))
    .pipe($.minifyCss({
      advanced: false,
      keepSpecialComments: 0
    }))
    .pipe($.rename('foundation.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function() {
  gulp.src('docs/pages/**/*.html')
    .pipe($.assemble({
      flatten: false,
      assets: 'build/assets',
      data: ['docs/data/*.json'],
      partials: ['docs/includes/**/*.{html,scss}'],
      layoutdir: 'docs/layouts',
      layout: 'default.html'
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('docs', function() {
  Super({
    html: './scss',
    sass: './scss',
    js: './js/**/*.js',
    dest: './build'
  });
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