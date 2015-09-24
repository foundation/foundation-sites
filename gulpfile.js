var gulp = require('gulp');
var browser = require('browser-sync');
var requireDir = require('require-dir');

requireDir('./gulp');

// Builds the documentation and framework files
gulp.task('build', ['clean', 'copy', 'docs', 'docs:search', 'sass', 'javascript']);

// Starts a BrowerSync instance
gulp.task('serve', ['build'], function(){
  browser.init({server: './_build'});
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['serve'], function() {
  gulp.watch('docs/**/*', ['docs', browser.reload]);
  gulp.watch('docs/layout/*.html', ['docs:reset', browser.reload]);
  gulp.watch('scss/**/*', ['sass', browser.reload]);
  gulp.watch('docs/assets/scss/**/*', ['sass:docs', browser.reload]);
  gulp.watch('js/**/*', ['javascript:foundation', browser.reload]);
  gulp.watch('docs/assets/js/**/*', ['javascript:docs', browser.reload]);
});
