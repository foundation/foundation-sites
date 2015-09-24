var gulp = require('gulp');
var rimraf = require('rimraf').sync;

// Erases the dist folder
gulp.task('clean', function() {
  rimraf('_build');
});
