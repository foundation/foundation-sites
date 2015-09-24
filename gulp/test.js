var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');

// Runs unit tests
gulp.task('test', function() {
  return rubySass('./spec/scss/spec.scss', {
    loadPath: ['scss', 'node_modules/bootcamp/dist'],
    style: 'nested',
    quiet: true
  })
    .on('data', function(data) {
      console.log(data.contents.toString());
    });
});
