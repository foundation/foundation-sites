var gulp = require('gulp');

var FILES = [
  'docs/assets/**/*',
  '!docs/assets/{js,scss}',
  '!docs/assets/{js,scss}/**/*'
];

// Copies static assets
gulp.task('copy', function() {
  gulp.src(FILES)
    .pipe(gulp.dest('_build/assets'));
});
