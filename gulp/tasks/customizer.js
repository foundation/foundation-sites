var addSrc = require('gulp-add-src');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var customizer = require('../../customizer/lib');
var Vinyl = require('vinyl');
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
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var ARGS = yargs.argv;
var FOUNDATION_VERSION = require('../../package.json').version;
var OUTPUT_DIR = ARGS.output || 'custom-build';
var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'and_chr >= 2.3'
];
var CUSTOMIZER_CONFIG;
var MODULE_LIST;
var VARIABLE_LIST;

// Load the configuration file for the customizer. It's a list of modules to load and Sass variables to override
gulp.task('customizer:loadConfig', function(done) {
  fs.readFile('customizer/config.yml', function(err, data) {
    var moduleListPath = ARGS.modules || '../../customizer/complete';
    var moduleList = require(moduleListPath);

    CUSTOMIZER_CONFIG = yaml(data.toString());
    MODULE_LIST = moduleList.modules;
    VARIABLE_LIST = moduleList.variables || {};
    done();
  });
});

// Prepare dependencies
gulp.task('customizer:prepareSassDeps', function() {
  return gulp.src([
      'node_modules/@(normalize-scss)/sass/**/*.scss',
      'node_modules/@(sassy-lists)/stylesheets/helpers/missing-dependencies',
      'node_modules/@(sassy-lists)/stylesheets/helpers/true',
      'node_modules/@(sassy-lists)/stylesheets/functions/purge',
      'node_modules/@(sassy-lists)/stylesheets/functions/remove',
      'node_modules/@(sassy-lists)/stylesheets/functions/replace',
      'node_modules/@(sassy-lists)/stylesheets/functions/to-list'
    ])
    .pipe(gulp.dest('_vendor'));
});

// Creates a Sass file from the module/variable list and creates foundation.css and foundation.min.css
gulp.task('customizer:sass', ['customizer:loadConfig', 'customizer:prepareSassDeps'], function() {
  var sassFile = customizer.sass(CUSTOMIZER_CONFIG, MODULE_LIST, VARIABLE_LIST);

  // Create a stream with our makeshift Sass file
  var stream = new Readable({ objectMode: true });
  stream._read = function() {};
  stream.push(new Vinyl({
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
    .pipe(postcss([autoprefixer({
      browsers: COMPATIBILITY
    })]))
    .pipe(gulp.dest(path.join(OUTPUT_DIR, 'css')))
    .pipe(cssnano())
    .pipe(rename('foundation.min.css'))
    .pipe(gulp.dest(path.join(OUTPUT_DIR, 'css')));
});

// Creates a Foundation JavaScript file from the module list, and also copies dependencies (jQuery, what-input)
gulp.task('customizer:javascript', ['customizer:loadConfig'], function() {
  var jsPaths = customizer.js(CUSTOMIZER_CONFIG, MODULE_LIST);

  return gulp.src(jsPaths)
    .pipe(babel())
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest(path.join(OUTPUT_DIR, 'js/vendor')))
    .pipe(uglify())
    .pipe(rename('foundation.min.js'))
    .pipe(addSrc([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/what-input/dist/what-input.js'
    ]))
    .pipe(gulp.dest(path.join(OUTPUT_DIR, 'js/vendor')));
});

// Copies the boilerplate index.html to the custom download folder
gulp.task('customizer:html', ['customizer:loadConfig'], function() {
  var rtlEnabled = VARIABLE_LIST['global-text-direction'] && VARIABLE_LIST['global-text-direction'] === 'rtl';

  return gulp.src('customizer/index.html')
    .pipe(If(rtlEnabled, replace('ltr', 'rtl')))
    .pipe(gulp.dest(OUTPUT_DIR));
});

// Creates a custom build by:
//   - Generating a CSS file
//   - Generating a JS file
//   - Copying the index.html file
//   - Creating a blank app.css file
//   - Creating an app.js file with Foundation initialization code
gulp.task('customizer', ['customizer:sass', 'customizer:javascript', 'customizer:html'], function(done) {
  var outputFolder = path.dirname(OUTPUT_DIR);
  var outputFileName = path.basename(OUTPUT_DIR);

  touch(path.join(OUTPUT_DIR, 'css/app.css'));
  touch(path.join(OUTPUT_DIR, 'js/app.js'));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'js/app.js'), '$(document).foundation()\n');

  gulp.src(path.join(OUTPUT_DIR, '/**/*'))
    .pipe(zip(path.basename(outputFileName) + '.zip'))
    .pipe(gulp.dest(outputFolder))
    .on('finish', function() {
      rimraf(OUTPUT_DIR, done);
    });
});
