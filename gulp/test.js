var gulp = require('gulp');
var opener = require('opener');
var rubySass = require('gulp-ruby-sass');

// Runs unit tests
gulp.task('test', ['test:sass', 'test:javascript']);

gulp.task('test:sass', function() {
  return rubySass('./test/sass/tests.scss', {
    loadPath: ['scss', 'node_modules/bootcamp/dist'],
    style: 'nested',
    quiet: true
  })
    .on('data', function(data) {
      console.log(data.contents.toString());
    });
});

gulp.task('test:javascript', function(cb) {
  opener('../test/javascript/index.html');
  cb();
});
