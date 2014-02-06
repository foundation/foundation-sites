/*
 * grunt-contrib-compress
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Chris Talkington, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var compress = require('./lib/compress')(grunt);

  grunt.registerMultiTask('compress', 'Compress files.', function() {
    compress.options = this.options({
      archive: null,
      mode: null,
      level: 1,
    });

    compress.options.mode = compress.options.mode || compress.autoDetectMode(compress.options.archive);
    grunt.verbose.writeflags(compress.options, 'Options');

    if (grunt.util._.include(['zip', 'tar', 'tgz', 'gzip', 'deflate', 'deflateRaw'], compress.options.mode) === false) {
      grunt.fail.warn('Mode ' + String(compress.options.mode).cyan + ' not supported.');
    }

    if (compress.options.mode === 'gzip' || compress.options.mode.slice(0, 7) === 'deflate') {
      compress[compress.options.mode](this.files, this.async());
    } else {
      compress.tar(this.files, this.async());
    }
  });
};
