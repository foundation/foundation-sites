var gulp = require('gulp');
var cacheBust = require('gulp-cache-bust');
var cached = require('gulp-cached');
var supercollider = require('supercollider');
var buildSearch = require('../lib/buildSearch');
var panini = require('panini');

supercollider
  .config({
    template: 'docs/layout/component.html',
    marked: require('../lib/marked'),
    handlebars: require('../lib/handlebars'),
    keepFm: true
  })
  .adapter('sass')
  .adapter('js');

// Assembles the layout, pages, and partials in the docs folder
gulp.task('docs', function() {
  return gulp.src('docs/pages/**/*')
    .pipe(cached('docs'))
    .pipe(supercollider.init())
    .pipe(panini({
      root: 'docs/pages/',
      layouts: 'docs/layout/',
      partials: 'docs/partials/'
    }))
    .pipe(cacheBust())
    .pipe(gulp.dest('_build'));
});

gulp.task('docs:reset', function() {
  delete cached.caches['docs'];
  gulp.run('docs');
});

gulp.task('docs:search', ['docs'], function(cb) {
  buildSearch(supercollider.tree, cb);
});

gulp.task('docs:debug', ['docs'], function(cb) {
  var output = JSON.stringify(supercollider.tree, null, '  ');
  require('fs').writeFile('./_debug.json', output, cb);
});
