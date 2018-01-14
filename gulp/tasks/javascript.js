var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var onBabelError = require('./babel-error.js');
var rename = require('gulp-rename');
var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');
var named = require('vinyl-named');

var CONFIG = require('../config.js');

// Compiles JavaScript into a single file
gulp.task('javascript', ['javascript:foundation', 'javascript:deps', 'javascript:docs']);

// NOTE: This sets up all imports from within Foundation as externals, for the purpose
// of replicating the "drop in dist file" approach of prior versions.
// THIS IS NOT RECOMMENDED FOR MOST USERS. Chances are you either want everything
// (just throw in foundation.js or foundation.min.js) or you should be using a build
// system.
var pluginsAsExternals = {
  'jquery': 'jQuery',
  './foundation.core': '{Foundation: window.Foundation}',
  './foundation.util.core' : '{rtl: window.Foundation.rtl, GetYoDigits: window.Foundation.GetYoDigits, transitionend: window.Foundation.transitionend}',
  './foundation.util.imageLoader' : '{onImagesLoaded: window.Foundation.onImagesLoaded}',
  './foundation.util.keyboard' : '{Keyboard: window.Foundation.Keyboard}',
  './foundation.util.mediaQuery' : '{MediaQuery: window.Foundation.MediaQuery}',
  './foundation.util.motion' : '{Motion: window.Foundation.Motion, Move: window.Foundation.Move}',
  './foundation.util.nest' : '{Nest: window.Foundation.Nest}',
  './foundation.util.timer' : '{Timer: window.Foundation.Timer}',
  './foundation.util.touch' : '{Touch: window.Foundation.Touch}',
  './foundation.util.box' : '{Box: window.Foundation.Box}',
  './foundation.plugin' : '{Plugin: window.Foundation.Plugin}',
  './foundation.dropdownMenu' : '{DropdownMenu: window.Foundation.DropdownMenu}',
  './foundation.drilldown' : '{Drilldown: window.Foundation.Drilldown}',
  './foundation.accordionMenu' : '{AccordionMenu: window.Foundation.AccordionMenu}',
  './foundation.accordion' : '{Accordion: window.Foundation.Accordion}',
  './foundation.tabs' : '{Tabs: window.Foundation.Tabs}',
  './foundation.smoothScroll' : '{SmoothScroll: window.Foundation.SmoothScroll}',
};

var webpackConfig = {
  externals: {
    'jquery': 'jQuery'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: 'umd',
  }
}

// Core has to be dealt with slightly differently due to bootstrapping externals
// and the dependency on foundation.util.core
//
gulp.task('javascript:plugin-core', function() {
  return gulp.src('js/entries/plugins/foundation.core.js')
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe(gulp.dest('_build/assets/js/plugins'));
});
gulp.task('javascript:plugins', ['javascript:plugin-core'], function () {
  return gulp.src(['js/entries/plugins/*.js', '!js/entries/plugins/foundation.core.js'])
    .pipe(named())
    .pipe(webpackStream(Object.assign({ externals: pluginsAsExternals }, webpackConfig), webpack2))
    .pipe(gulp.dest('_build/assets/js/plugins'));
});

gulp.task('javascript:foundation', ['javascript:plugins'], function() {
  return gulp.src('js/entries/foundation.js')
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe(gulp.dest('_build/assets/js'));
});
//gulp.task('javascript:foundation', function() {
//  return gulp.src(CONFIG.JS_FILES)
//    .pipe(babel()
//      .on('error', onBabelError))
//    .pipe(gulp.dest('_build/assets/js/plugins'))
//    .pipe(concat('foundation.js'))
//    .pipe(gulp.dest('_build/assets/js'));
//});

gulp.task('javascript:deps', function() {
  return gulp.src(CONFIG.JS_DEPS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

gulp.task('javascript:docs', function() {
  return gulp.src(CONFIG.JS_DOCS)
    .pipe(concat('docs.js'))
    .pipe(gulp.dest('_build/assets/js'));
});
