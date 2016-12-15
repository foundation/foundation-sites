var gulp = require('gulp');

var CONFIG = require('../config.js');

// Copies static assets
gulp.task('copy', function() {
  gulp.src(CONFIG.ASSETS_FILES)
    .pipe(gulp.dest('_build/assets'));
});
