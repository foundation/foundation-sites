var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var onBabelError = require('./babel-error.js');
var rename = require('gulp-rename');
var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');
var named = require('vinyl-named');

var CONFIG = require('../config.js');

// ----- WEBPACK CONFIGURATION -----
//
// The following sets up all imports from within Foundation as externals, for the purpose
// of replicating the "drop in dist file" approach of prior versions.
// THIS IS NOT RECOMMENDED FOR MOST USERS. Chances are you either want everything
// (just throw in foundation.js or foundation.min.js) or you should be using a build
// system.

// Convert an external config object for UMD modules
// See: https://webpack.js.org/configuration/externals/#object
function umdExternals(externals, options) {
  options = Object.assign({ namespace: '' }, options);
  const umdExternalPath = (...args) => [...args].filter(v => v && !!v.length);

  return Object.keys(externals).reduce(function(obj, k) {
    obj[k] = {
      root: umdExternalPath(options.namespace, externals[k]),
      amd: k,
      commonjs: k,
      commonjs2: k,
    };
    return obj;
  }, {});
};

// Generate plugin Externals config for UMD modules
var pluginsAsExternals = Object.assign(
  umdExternals({
    'jquery': 'jQuery',
  }),
  umdExternals({
    './foundation.core': 'foundation.core',
    './foundation.util.imageLoader': 'foundation.util.imageLoader',
    './foundation.util.keyboard': 'foundation.util.keyboard',
    './foundation.util.mediaQuery': 'foundation.util.mediaQuery',
    './foundation.util.motion': 'foundation.util.motion',
    './foundation.util.nest': 'foundation.util.nest',
    './foundation.util.timer': 'foundation.util.timer',
    './foundation.util.touch': 'foundation.util.touch',
    './foundation.util.box': 'foundation.util.box',
    './foundation.dropdownMenu': 'foundation.dropdownMenu',
    './foundation.drilldown': 'foundation.drilldown',
    './foundation.accordionMenu': 'foundation.accordionMenu',
    './foundation.accordion': 'foundation.accordion',
    './foundation.tabs': 'foundation.tabs',
    './foundation.smoothScroll': 'foundation.smoothScroll',
  }, { namespace: CONFIG.JS_BUNDLE_NAMESPACE })
);

var webpackConfig = {
  externals: umdExternals({
    'jquery': 'jQuery'
  }),
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
    library: [CONFIG.JS_BUNDLE_NAMESPACE, '[name]'],
    libraryTarget: 'umd',
  }
}

// ----- TASKS -----
//

// Compiles JavaScript into a single file
gulp.task('javascript', ['javascript:foundation', 'javascript:deps', 'javascript:docs']);

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
    .pipe(webpackStream(Object.assign({}, webpackConfig, { externals: pluginsAsExternals }), webpack2))
    .pipe(gulp.dest('_build/assets/js/plugins'));
});

gulp.task('javascript:foundation', ['javascript:plugins'], function() {
  return gulp.src('js/entries/foundation.js')
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe(gulp.dest('_build/assets/js'));
});

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
