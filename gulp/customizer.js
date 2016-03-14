var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var customizer = require('../customizer/lib');
var File = require('vinyl');
var fs = require('fs');
var gulp = require('gulp');
var If = require('gulp-if');
var path = require('path');
var Readable = require('stream').Readable;
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var touch = require('touch');
var uglify = require('gulp-uglify');
var yaml = require('js-yaml').safeLoad;
var yargs = require('yargs');
var zip = require('gulp-zip');

var ARGS = require('yargs').argv;
var FOUNDATION_VERSION = require('../package.json').version;
var CUSTOMIZER_CONFIG;
var MODULE_LIST;
var VARIABLE_LIST;

// Load the configuration file for the customizer. It's a list of modules to load and Sass variables to override
gulp.task('customizer:loadConfig', function() {
  // Config file with list of all Foundation modules and dependencies
  var config = fs.readFileSync('customizer/config.yml');

  // Module file, created from customizer form data
  var moduleListPath = ARGS.modules;
  var moduleList = require(moduleListPath);

  CUSTOMIZER_CONFIG = yaml(config.toString());
  MODULE_LIST = moduleList.modules;
  VARIABLE_LIST = moduleList.variables;
});

// Creates a Sass file from the module/variable list and creates foundation.css and foundation.min.css
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

// Creates a Foundation JavaScript file from the module list, and also copies dependencies (jQuery, what-input)
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

// Copies the boilerplate index.html to the custom download folder
gulp.task('customizer:html', ['customizer:loadConfig'], function() {
  var rtlEnabled = VARIABLE_LIST['global-text-direction'] && VARIABLE_LIST['global-text-direction'] === 'rtl';

  return gulp.src('customizer/index.html')
    .pipe(If(rtlEnabled, replace('ltr', 'rtl')))
    .pipe(gulp.dest('.customizer'));
});

// Creates a custom build by:
//   - Generating a CSS file
//   - Generating a JS file
//   - Copying the index.html file
//   - Creating a blank app.css file
//   - Creating an app.js file with Foundation initialization code
gulp.task('customizer', ['customizer:sass', 'customizer:javascript', 'customizer:html'], function(done) {
  touch('.customizer/css/app.css');
  touch('.customizer/js/app.js');
  fs.writeFileSync('.customizer/js/app.js', '$(document).foundation()\n');

  gulp.src('.customizer/**/*')
    .pipe(zip('foundation-' + FOUNDATION_VERSION + '.zip'))
    .pipe(gulp.dest('.'))
    .on('finish', function() {
      rimraf('.customizer', done);
    });
});
