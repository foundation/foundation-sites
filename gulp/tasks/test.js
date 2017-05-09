var gulp = require('gulp');
var opener = require('opener');
var browser = require('browser-sync');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var onBabelError = require('./babel-error.js');
var rimraf = require('rimraf').sync;

var CONFIG = require('../config.js');

// Runs unit tests
gulp.task('test', ['sass:foundation', 'test:transpile-js', 'watch'], function() {
  browser.init({
    server: { 
      baseDir: 'test/visual',
      directory: true,
      routes: {
        "/assets": "_build/assets",
        "/motion-ui": "node_modules/motion-ui"
      }
    }
  });
  gulp.watch(['test/visual/**/*'], ['test:reload']);
});

gulp.task('test:reload', function(done) {
  browser.reload();
  done();
});

gulp.task('test:transpile-js', ['javascript:foundation', 'javascript:deps'], function() {
  rimraf('test/javascript/js-tests.js');
  
  return gulp.src(CONFIG.TEST_JS_FILES)
  	.pipe(babel()
  		.on('error', onBabelError))
  	.pipe(concat('js-tests.js'))
  	.pipe(gulp.dest('test/javascript'));
});
