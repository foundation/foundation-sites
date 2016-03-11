var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var customizer = require('../customizer/lib');
var File = require('vinyl');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var Readable = require('stream').Readable;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var touch = require('touch');
var uglify = require('gulp-uglify');
var yaml = require('js-yaml').safeLoad;
var yargs = require('yargs');

var ARGS = require('yargs').argv;
var CUSTOMIZER_CONFIG;
var MODULE_LIST;

gulp.task('customizer:loadConfig', function() {
  var config = fs.readFileSync('customizer/config.yml');
  var moduleListPath = path.relative(__dirname, path.join(process.cwd(), ARGS.modules));
  var moduleList = require(moduleListPath);

  CUSTOMIZER_CONFIG = yaml(config.toString());
  MODULE_LIST = moduleList.modules;
  VARIABLE_LIST = moduleList.variables;
});

gulp.task('customizer:sass', ['customizer:loadConfig'], function() {
  var sassFile = customizer.sass(CUSTOMIZER_CONFIG, MODULE_LIST, VARIABLE_LIST);

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
  var jsPaths = customizer.js(CUSTOMIZER_CONFIG, MODULE_LIST);

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
