var gulp = require('gulp');
var browser = require('browser-sync');
var requireDir = require('require-dir');
var sequence = require('run-sequence');
var port = process.env.SERVER_PORT || 3000;

requireDir('./gulp/tasks');

// Builds the documentation and framework files
gulp.task('build', function(cb) {
  sequence('clean', 'copy', 'sass', 'javascript', 'docs:all', cb)
});

// Starts a BrowerSync instance
gulp.task('serve', ['build'], function(){
  browser.init({server: './_build', port: port});
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('docs/**/*', ['docs', browser.reload]);
  gulp.watch(['docs/layout/*.html', 'docs/partials/*{html,hbs}', 'docs/assets/partials/*{html,hbs}', 'node_modules/foundation-docs/templates/*{html,hbs}'], ['docs:all', browser.reload]);
  gulp.watch('scss/**/*', ['sass', browser.reload]);
  gulp.watch(['docs/assets/scss/**/*', 'node_modules/foundation-docs/scss/**/*'], ['sass:docs', browser.reload]);
  gulp.watch('js/**/*', ['javascript:foundation', browser.reload]);
  gulp.watch(['docs/assets/js/**/*', 'node_modules/foundation-docs/js/**/*'], ['javascript:docs', browser.reload]);
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', function(cb) {
  sequence('serve', 'watch', cb)
});
