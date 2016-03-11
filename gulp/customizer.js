var gulp = require('gulp');
var File = require('vinyl');
var sassBuild = require('../customizer/lib/sass');
var jsGlob = require('../customizer/lib/js');
var fs = require('fs');
var yaml = require('js-yaml').safeLoad;
var sass = require('gulp-sass');
var Readable = require('stream').Readable;
var source = require('vinyl-source-stream');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

var CUSTOMIZER_CONFIG;
var MODULE_LIST = ['accordion', 'tabs'];

gulp.task('customizer:loadConfig', function(done) {
  fs.readFile('customizer/config.yml', function(err, data) {
    if (err) throw err;
    CUSTOMIZER_CONFIG = yaml(data.toString());
    done();
  });
});

gulp.task('customizer:sass', ['customizer:loadConfig'], function(done) {
  var sassFile = sassBuild(CUSTOMIZER_CONFIG, MODULE_LIST, {});

  var stream = new Readable({ objectMode: true });
  stream._read = function() {};
  stream.push(new File({
    path: 'foundation.scss',
    contents: new Buffer(sassFile)
  }));

  return stream
    .pipe(sass({
      includePaths: [
        'scss',
        'node_modules/motion-ui/src'
      ]
    }))
    .pipe(gulp.dest('.customizer/css'))
    .pipe(cssnano())
    .pipe(rename('foundation.min.css'))
    .pipe(gulp.dest('.customizer/css'));
});
