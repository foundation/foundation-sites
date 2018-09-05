var gulp = require('gulp');
var concat = require('gulp-concat');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var named = require('vinyl-named');
var sourcemaps = require('gulp-sourcemaps');

var utils = require('../utils.js');
var CONFIG = require('../config.js');

// ----- WEBPACK CONFIGURATION -----
//
// The following sets up all imports from within Foundation as externals, for the purpose
// of replicating the "drop in dist file" approach of prior versions.
// THIS IS NOT RECOMMENDED FOR MOST USERS. Chances are you either want everything
// (just throw in foundation.js or foundation.min.js) or you should be using a build
// system.

// Generate plugin Externals config for UMD modules
var webpackExternalPlugins = Object.assign(
  utils.umdExternals({
    'jquery': 'jQuery',
  }),
  utils.umdExternals({
    // Import path                    | Exported file
    './foundation.core':              'foundation.core',
    './foundation.core.utils':        'foundation.core',
    './foundation.core.plugin':       'foundation.core',
    './foundation.util.imageLoader':  'foundation.util.imageLoader',
    './foundation.util.keyboard':     'foundation.util.keyboard',
    './foundation.util.mediaQuery':   'foundation.util.mediaQuery',
    './foundation.util.motion':       'foundation.util.motion',
    './foundation.util.nest':         'foundation.util.nest',
    './foundation.util.timer':        'foundation.util.timer',
    './foundation.util.touch':        'foundation.util.touch',
    './foundation.util.box':          'foundation.util.box',
    './foundation.dropdownMenu':      'foundation.dropdownMenu',
    './foundation.drilldown':         'foundation.drilldown',
    './foundation.accordionMenu':     'foundation.accordionMenu',
    './foundation.accordion':         'foundation.accordion',
    './foundation.tabs':              'foundation.tabs',
    './foundation.smoothScroll':      'foundation.smoothScroll',
  }, { namespace: CONFIG.JS_BUNDLE_NAMESPACE })
);

var webpackOutputAsExternal = {
  library: [CONFIG.JS_BUNDLE_NAMESPACE, '[name]'],
  libraryTarget: 'umd',
};

var webpackConfig = {
  mode: 'development',
  externals: utils.umdExternals({
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
    libraryTarget: 'umd',
  },
  // https://github.com/shama/webpack-stream#source-maps
  devtool: 'source-map',
  stats: {
    chunks: false,
    entrypoints: false,
  }
}

// ----- TASKS -----
//

// Compiles JavaScript into a single file
gulp.task('javascript', gulp.series('javascript:foundation', 'javascript:deps', 'javascript:docs'));

// Core has to be dealt with slightly differently due to bootstrapping externals
// and the dependency on foundation.core.utils
//
gulp.task('javascript:plugin-core', function() {
  return gulp.src('js/entries/plugins/foundation.core.js')
    .pipe(named())
    .pipe(sourcemaps.init())
    .pipe(webpackStream(Object.assign({}, webpackConfig, {
        output: webpackOutputAsExternal,
      }), webpack))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/js/plugins'));
});
gulp.task('javascript:plugins', gulp.series('javascript:plugin-core', function () {
  return gulp.src(['js/entries/plugins/*.js', '!js/entries/plugins/foundation.core.js'])
    .pipe(named())
    .pipe(sourcemaps.init())
    .pipe(webpackStream(Object.assign({}, webpackConfig, {
        externals: webpackExternalPlugins,
        output: webpackOutputAsExternal,
      }), webpack))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/js/plugins'));
}));

gulp.task('javascript:foundation', gulp.series('javascript:plugins', function() {
  return gulp.src('js/entries/foundation.js')
    .pipe(named())
    .pipe(sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/js'));
}));

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
