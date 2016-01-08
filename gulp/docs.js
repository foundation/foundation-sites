var cacheBust = require('gulp-cache-bust');
var foundationDocs = require('foundation-docs');
var gulp = require('gulp');
var newer = require('gulp-newer');
var panini = require('panini');
var supercollider = require('supercollider');

var PANINI_CONFIG = {
  root: 'docs/pages/',
  layouts: 'docs/layout/',
  partials: 'docs/partials/',
  helpers: foundationDocs.handlebarsHelpers
}

supercollider
  .config({
    template: foundationDocs.componentTemplate,
    marked: foundationDocs.marked,
    handlebars: foundationDocs.handlebars,
    keepFm: true
  })
  .adapter('sass')
  .adapter('js');

// Assembles the layout, pages, and partials in the docs folder
gulp.task('docs', function() {
  return gulp.src('docs/pages/**/*')
    .pipe(newer({
      dest: '_build',
      ext: '.html'
    }))
    .pipe(supercollider.init())
    .pipe(panini(PANINI_CONFIG))
    .pipe(cacheBust())
    .pipe(gulp.dest('_build'))
    .on('finish', buildSearch);
});

gulp.task('docs:all', function() {
  panini.refresh();

  return gulp.src('docs/pages/**/*')
    .pipe(supercollider.init())
    .pipe(panini(PANINI_CONFIG))
    .pipe(cacheBust())
    .pipe(gulp.dest('_build'))
    .on('finish', buildSearch);
});

function buildSearch() {
  foundationDocs.buildSearch(supercollider.tree);
}

gulp.task('docs:debug', ['docs'], function(cb) {
  var output = JSON.stringify(supercollider.tree, null, '  ');
  require('fs').writeFile('./_debug.json', output, cb);
});
