var assert = require('assert');
var path = require('path');
var fs = require('fs');


/**
 * @param {Object} grunt Grunt.
 */
module.exports = function(grunt) {

  var gruntfileSrc = 'gruntfile.js';
  var tasksSrc = ['tasks/**/*.js', 'lib/**/*.js'];
  var testSrc = 'test/**/*.spec.js';
  var fixturesJs = 'test/integration/fixtures/**/*.js';
  var fixturesAll = 'test/integration/fixtures/**/*';

  grunt.initConfig({

    cafemocha: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: testSrc
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: gruntfileSrc
      },
      tasks: {
        src: tasksSrc
      },
      tests: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: testSrc
      },
      fixturesJs: {
        src: fixturesJs
      }
    },

    watch: {
      tasks: {
        files: tasksSrc,
        tasks: ['cafemocha']
      },
      tests: {
        files: testSrc,
        tasks: ['newer:cafemocha']
      },
      fixturesAll: {
        files: fixturesAll,
        tasks: ['cafemocha']
      },
      allJs: {
        files: [gruntfileSrc, tasksSrc, testSrc, fixturesJs],
        tasks: ['newer:jshint']
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('test', ['newer:jshint', 'cafemocha']);

  grunt.registerTask('default', 'test');

};
