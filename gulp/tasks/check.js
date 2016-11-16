'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var doiuse = require('doiuse');

var CONFIG = require('../config.js');

// Check browser support
gulp.task('check:browserSupport', function() {
  return gulp.src(['_build/assets/css/foundation.css'])
    .pipe(postcss([doiuse({
      browsers: CONFIG.COMPATIBILITY,
      onFeatureUsage: function (usageInfo) {
        console.log(usageInfo.message)
      }
    })]))
});
