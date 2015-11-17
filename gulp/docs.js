var gulp = require('gulp');
var cached = require('gulp-cached');
var supercollider = require('supercollider');
var filter = require('gulp-filter');
var buildSearch = require('../lib/buildSearch');
var panini = require('panini');

supercollider
  .config({
    template: 'docs/layout/component.html',
    marked: require('../lib/marked'),
    handlebars: require('../lib/handlebars')
  })
  .adapter('sass')
  .adapter('js');

// Assembles the layout, pages, and partials in the docs folder
gulp.task('docs', function() {
  var mdFilter = filter(['*.md']);

  return gulp.src('docs/pages/**/*')
    .pipe(cached('docs'))
    .pipe(mdFilter)
      .pipe(supercollider.init())
    .pipe(mdFilter.restore())
    .pipe(panini({
      root: 'docs/pages/',
      layouts: 'docs/layout/',
      partials: 'docs/partials/'
    }))
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
