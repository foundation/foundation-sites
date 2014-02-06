/*
 * assemble-handlebars
 * https://github.com/assemble/assemble-handlebars
 *
 * Copyright (c) 2013 Assemble
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'lib/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('test', ['default']);

};
