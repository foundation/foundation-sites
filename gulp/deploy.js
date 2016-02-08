var gulp = require('gulp');
var filter = require('gulp-filter');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var confirm = require('gulp-prompt').confirm;
var prompt = require('gulp-prompt').prompt;
var rsync = require('gulp-rsync');
var replace = require('gulp-replace');
var git = require('gitty')(process.cwd() + '/');
var octophant = require('octophant');
var sequence = require('run-sequence');
var inquirer = require('inquirer');
var exec = require('child_process').execSync;

var VERSIONED_FILES = [
  'bower.json',
  'composer.json',
  'docs/pages/installation.md',
  'js/foundation.core.js',
  'meteor-README.md',
  'package.js',
  'package.json',
  'scss/foundation.scss'
];

var DIST_FILES = [
  './_build/assets/css/foundation.css',
  './_build/assets/css/foundation-flex.css',
  '_build/assets/js/foundation.js'
];

var CURRENT_VERSION = require('../package.json').version;
var NEXT_VERSION;

gulp.task('deploy', function(cb) {
  sequence('deploy:prompt', 'deploy:version', 'deploy:dist', 'deploy:settings', 'deploy:commit', 'deploy:templates', cb);
});

gulp.task('deploy:prompt', function(cb) {
  inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: 'What version are we moving to? (Current version is ' + CURRENT_VERSION + ')'
  }], function(res) {
    NEXT_VERSION = res.version;
    cb();
  });
});

// Bumps the version number in any file that has one
gulp.task('deploy:version', function() {
  return gulp.src(VERSIONED_FILES, { base: process.cwd() })
    .pipe(replace(CURRENT_VERSION, NEXT_VERSION))
    .pipe(gulp.dest('.'));
});

// Generates compiled CSS and JS files and puts them in the dist/ folder
gulp.task('deploy:dist', ['sass:foundation', 'javascript:foundation'], function() {
  var cssFilter = filter(['*.css'], { restore: true });
  var jsFilter  = filter(['*.js'], { restore: true });

  return gulp.src(DIST_FILES)
    .pipe(cssFilter)
      .pipe(gulp.dest('./dist'))
      .pipe(cssnano())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./dist'))
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
      .pipe(gulp.dest('./dist'))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./dist'));
});

// Generates a settings file
gulp.task('deploy:settings', function(cb) {
  var options = {
    title: 'Foundation for Sites Settings',
    output: './scss/settings/_settings.scss',
    groups: {
      'grid': 'The Grid',
      'off-canvas': 'Off-canvas',
      'typography-base': 'Base Typography'
    },
    sort: [
      'global',
      'breakpoints',
      'grid',
      'typography-base',
      'typography-helpers'
    ],
    imports: ['util/util']
  }

  octophant('./scss', options, cb);
});

// Writes a commit with the changes to the version numbers
gulp.task('deploy:commit', function(cb) {
  exec('git commit -am "Bump to version "' + NEXT_VERSION);
  exec('git tag v' + NEXT_VERSION);
  exec('git push origin develop --follow-tags');
  cb();
});

// Uploads the documentation to the live server
gulp.task('deploy:docs', ['build'], function() {
  return gulp.src('./_build/**')
    .pipe(confirm('Make sure everything looks right before you deploy.'))
    .pipe(rsync({
      root: './_build',
      hostname: 'deployer@72.32.134.77',
      destination: '/home/deployer/sites/foundation-sites-6-docs'
    }));
});

gulp.task('deploy:templates', function() {
  exec('git clone https://github.com/zurb/foundation-sites-template');
  exec('cp scss/settings/_settings.scss foundation-sites-template/scss/_settings.scss');
  exec('cd foundation-sites-template');
  exec('git commit -am "Update settings file to match Foundation "' + NEXT_VERSION);
  exec('git push origin master');
  exec('cd ..');
  exec('rm -rf foundation-sites-template');

  exec('git clone https://github.com/zurb/foundation-zurb-template');
  exec('cp scss/settings/_settings.scss foundation-zurb-template/src/assets/scss/_settings.scss');
  exec('cd foundation-zurb-template');
  exec('git commit -am "Update settings file to match Foundation "' + NEXT_VERSION);
  exec('git push origin master');
  exec('cd ..');
  exec('rm -rf foundation-zurb-template');
});

// The Customizer runs this function to generate files it needs
gulp.task('deploy:custom', ['sass:foundation', 'javascript:foundation'], function() {
  gulp.src('./_build/assets/css/foundation.css')
      .pipe(cssnano())
      .pipe(rename('foundation.min.css'))
      .pipe(gulp.dest('./_build/assets/css'));

  return gulp.src('_build/assets/js/foundation.js')
      .pipe(uglify())
      .pipe(rename('foundation.min.js'))
      .pipe(gulp.dest('./_build/assets/js'));
});
