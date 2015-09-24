var $ = require('gulp-load-plugins')();
var browser = require('browser-sync');
var fs = require('fs');
var gulp = require('gulp');
var octophant = require('octophant');
var Parker = require('parker/lib/Parker');
var prettyJSON = require('prettyjson');
var rimraf = require('rimraf');
var shipyard = require('shipyard');
var supercollider = require('supercollider');

// Official Foundation for Sites compatibility
var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'and_chr >= 2.3'
];

var files = {
  assets: [
    'docs/assets/**/*',
    'node_modules/zeroclipboard/dist/ZeroClipboard.swf',
    '!docs/assets/{js,scss}',
    '!docs/assets/{js,scss}/**/*'
  ],
  sassPaths: [
    'scss'
  ],
  sassTestPaths: [
    'scss/**/*.scss',
    '!scss/vendor/**/*.scss',
    '!scss/components_old/**/*.scss'
  ],
  javascript: [
    'js/foundation.core.js',
    'js/foundation.util.*.js',
    'js/*.js'
  ],
  javascriptDeps: [
    'node_modules/jquery/dist/jquery.js'
  ],
  docsJavascript: [
    'node_modules/zeroclipboard/dist/ZeroClipboard.js',
    'bower_components/typeahead.js/dist/typeahead.bundle.js',
    'docs/assets/js/docs.*.js',
    'docs/assets/js/docs.js'
  ]
}

// Erases the dist folder
gulp.task('clean', function() {
  rimraf.sync('_build');
});

// Copies static assets
gulp.task('copy', function() {
  gulp.src(files.assets)
    .pipe(gulp.dest('_build/assets'));
});

// Assembles the layout, pages, and partials in the docs folder
gulp.task('html', function() {
  var mdFilter = $.filter(['*.md']);

  return gulp.src('docs/pages/**/*')
    .pipe($.cached('docs'))
    .pipe(mdFilter)
      .pipe(supercollider.init({
        template: 'docs/layout/component.html',
        adapters: ['sass', 'js'],
        marked: require('./lib/marked'),
        handlebars: require('./lib/handlebars')
      }))
    .pipe(mdFilter.restore())
    .pipe(shipyard({
      layouts: 'docs/layout/',
      partials: 'docs/partials/*.html'
    }))
    .pipe(gulp.dest('_build'));
});
gulp.task('html:reset', function() {
  delete $.cached.caches['docs'];
  gulp.run('html');
});
gulp.task('html:search', ['html'], function(cb) {
  require('./lib/buildSearch')(supercollider.tree, cb);
});
gulp.task('html:debug', ['html'], function(cb) {
  require('fs').writeFile('./_debug.json', JSON.stringify(supercollider.tree, null, '  '), cb);
});

// Compiles Sass files into CSS
gulp.task('sass', ['sass:foundation', 'sass:docs']);
gulp.task('sass:foundation', function() {
  return gulp.src('./foundation-sites.scss')
    .pipe($.sass({
      includePaths: files.sassPaths
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.rename('foundation.css'))
    .pipe(gulp.dest('_build/assets/css'));
});
gulp.task('sass:docs', function() {
  return gulp.src('docs/assets/scss/docs.scss')
    .pipe($.sass({
      includePaths: files.sassPaths
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(gulp.dest('_build/assets/css'));
});

// Audits CSS filesize, selector count, specificity, etc.
gulp.task('sass:audit', ['sass:foundation'], function(cb) {
  fs.readFile('./_build/assets/css/foundation-sites.css', function(err, data) {
    var parker = new Parker(require('parker/metrics/All'));
    var results = parker.run(data.toString());
    console.log(prettyJSON.render(results));
    cb();
  });
});

// Generates a settings file
gulp.task('sass:settings', function() {
  var options = {
    title: 'Foundation for Sites Settings',
    output: './scss/_settings.scss',
    groups: {
      'grid': 'The Grid',
      'off-canvas': 'Off-canvas',
      'typography-base': 'Base Typography'
    }
  }

  octophant(['./scss'], options);
});

// Compiles JavaScript into a single file
gulp.task('javascript', ['javascript:foundation', 'javascript:deps', 'javascript:docs'])
gulp.task('javascript:foundation', function() {
  return gulp.src(files.javascript)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('_build/assets/js'));
});
gulp.task('javascript:deps', function() {
  return gulp.src(files.javascriptDeps)
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('_build/assets/js'));
});
gulp.task('javascript:docs', function() {
  return gulp.src(files.docsJavascript)
    .pipe($.concat('docs.js'))
    .pipe(gulp.dest('_build/assets/js'));
});

// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', ['lint:sass', 'lint:javascript']);
gulp.task('lint:sass', function() {
  return gulp.src(files.sassTestPaths)
    .pipe($.scssLint({
      'config': 'config/scss-lint.yml'
    }));
});
gulp.task('lint:javascript', function() {
  $.jshint.lookup = false;

  return gulp.src('js/*.js')
    .pipe($.jshint('./config/.jshintConfig'))
    .pipe($.jshint.reporter('default'));
});


// Runs unit tests
gulp.task('test', function() {
  return $.rubySass('./spec/scss/spec.scss', {
    loadPath: ['scss', 'node_modules/bootcamp/dist'],
    style: 'nested',
    quiet: true
  })
    .on('data', function(data) {
      console.log(data.contents.toString());
    });
});

// Deployment
gulp.task('dist', ['deploy:dist']);
gulp.task('deploy:dist', ['sass:foundation', 'javascript:foundation'], function() {
  var cssFilter = $.filter(['*.css']);
  var jsFilter  = $.filter(['*.js']);

  return gulp.src(['./_build/assets/css/foundation.css', '_build/assets/js/foundation.js'])
    .pipe(cssFilter)
      .pipe(gulp.dest('./dist'))
      .pipe($.minifyCss())
      .pipe($.rename('foundation.min.css'))
      .pipe(gulp.dest('./dist'))
    .pipe(cssFilter.restore())
    .pipe(jsFilter)
      .pipe(gulp.dest('./dist'))
      .pipe($.uglify())
      .pipe($.rename('foundation.min.js'))
      .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean', 'copy', 'html', 'html:search', 'sass', 'javascript']);
// Starts a BrowerSync instance
gulp.task('serve', ['build'], function(){
  browser.init({server: './_build'});
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['serve'], function() {
  gulp.watch('docs/**/*', ['html', browser.reload]);
  gulp.watch('docs/layout/*.html', ['html:reset', browser.reload]);
  gulp.watch('scss/**/*', ['sass', browser.reload]);
  gulp.watch('docs/assets/scss/**/*', ['sass:docs', browser.reload]);
  gulp.watch('js/**/*', ['javascript:foundation', browser.reload]);
  gulp.watch('docs/assets/js/**/*', ['javascript:docs', browser.reload]);
});
