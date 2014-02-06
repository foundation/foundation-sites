'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      // all of the targets will use/override these options
      options: {
        browsers: ['Chrome'],
        files: [
          'node_modules/expect.js/expect.js',
          'test/**/*.js'
        ],
        frameworks: ['mocha'],
        plugins: ['karma-mocha', 'karma-chrome-launcher']
      },
      continuous: {
        singleRun: true
      },
      // watch using grunt-watch
      dev: {
        reporters: 'dots',
        background: true
      },
      // watch using karma
      auto: {
        autoWatch: true
      }
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },

    watch: {
      tests: {
        files: 'test/**/*.js',
        tasks: ['karma:dev:run']
      }
    },

    release: {
      options: {
        npmtag: false
      }
    }

  });

  //Load karma plugin
  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['karma:continuous']);
};
