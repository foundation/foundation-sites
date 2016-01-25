var gulp = require('gulp');
var opener = require('opener');
var mocha = require('gulp-mocha');

// Runs unit tests
gulp.task('test', ['test:sass', 'test:javascript']);

gulp.task('test:sass', function() {
  return gulp.src('./test/sass/test_sass.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('test:javascript', function(cb) {
  opener('../test/javascript/index.html');
  cb();
});
