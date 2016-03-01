var gulp = require('gulp');
var opener = require('opener');
var mocha = require('gulp-mocha');
var browser = require('browser-sync');

// Runs unit tests
gulp.task('test', ['sass:foundation', 'javascript:foundation', 'watch'], function() {
  browser.init({ server: 'test/visual' });
  gulp.watch(['scss/**/*', 'js/**/*', 'test/visual/**/*'], ['test:reload']);
});

gulp.task('test:reload', function(done) {
  browser.reload();
  done();
});
