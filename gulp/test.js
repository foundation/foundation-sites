var gulp = require('gulp');
var opener = require('opener');
var mocha = require('gulp-mocha');
var browser = require('browser-sync');

// Runs unit tests
gulp.task('test', ['sass:foundation', 'javascript:foundation', 'test:sass', 'test:javascript', 'watch'], function() {
  browser.init({ server: 'test/visual' });
  gulp.watch(['scss/**/*', 'js/**/*', 'test/visual/**/*'], ['test:reload']);
});

gulp.task('test:reload', function(done) {
  browser.reload();
  done();
})

gulp.task('test:sass', function() {
  return gulp.src('./test/sass/test_sass.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('test:javascript', function(cb) {
  opener('../test/javascript/index.html');
  cb();
});
