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
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var touch = require('touch');

var CUSTOMIZER_CONFIG;
var MODULE_LIST = ['accordion', 'tabs'];

gulp.task('customizer:loadConfig', function(done) {
  fs.readFile('customizer/config.yml', function(err, data) {
    if (err) throw err;
    CUSTOMIZER_CONFIG = yaml(data.toString());
    done();
  });
});

gulp.task('customizer:sass', ['customizer:loadConfig'], function() {
  var sassFile = sassBuild(CUSTOMIZER_CONFIG, MODULE_LIST, {});

  // Create a stream with our makeshift Sass file
  var stream = new Readable({ objectMode: true });
  stream._read = function() {};
  stream.push(new File({
    path: 'foundation.scss',
    contents: new Buffer(sassFile)
  }));
  stream.push(null);

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

gulp.task('customizer:javascript', ['customizer:loadConfig'], function() {
  var jsPaths = jsGlob(CUSTOMIZER_CONFIG, MODULE_LIST);

  return gulp.src(jsPaths)
    .pipe(babel())
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('.customizer/js/vendor'))
    .pipe(uglify())
    .pipe(rename('foundation.min.js'))
    .pipe(gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/what-input/what-input.js'
    ]))
    .pipe(gulp.dest('.customizer/js/vendor'));
});

gulp.task('customizer:html', ['customizer:loadConfig'], function() {
  return gulp.src('customizer/index.html')
    .pipe(gulp.dest('.customizer'));
});

gulp.task('customizer', ['customizer:sass', 'customizer:javascript', 'customizer:html'], function(done) {
  touch('.customizer/css/app.css');
  touch('.customizer/js/app.js');
  fs.writeFile('.customizer/js/app.js', '$(document).foundation()\n', done);
});
