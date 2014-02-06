/*
 * grunt-contrib-jasmine
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 GruntJS Team
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	
  grunt.initConfig({

    connect: {
      return500: {
        options: {
          port: 9000,
            middleware: function(connect, options) {
              return [function(req, res, next){
                res.statusCode = 500;
                res.end();
              }];
            }
          }
        }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jasmine: {
      pivotal: {
        src: 'test/fixtures/pivotal/src/**/*.js',
        options: {
          specs: 'test/fixtures/pivotal/spec/*Spec.js',
          helpers: 'test/fixtures/pivotal/spec/*Helper.js',
          junit: {
            path: 'junit'
          }
        }
      },
      phantom_polyfills: {
        src: 'test/fixtures/phantom-polyfills/src/**/*.js',
        options : {
          specs : 'test/fixtures/phantom-polyfills/spec/**/*.js',
        }
      },
      legacyVersion: {
        src: 'test/fixtures/pivotal/src/**/*.js',
        options: {
          specs: 'test/fixtures/pivotal/spec/*Spec.js',
          helpers: 'test/fixtures/pivotal/spec/*Helper.js',
          version: '1.2.0',
          junit: {
            path: 'junit'
          }
        }
      },
      deepOutfile: {
        src: 'test/fixtures/pivotal/src/**/*.js',
        options: {
          specs: 'test/fixtures/pivotal/spec/*Spec.js',
          helpers: 'test/fixtures/pivotal/spec/*Helper.js',
          outfile: 'tmp/spec.html'
        }
      },
      externalVendor: {
        src: 'test/fixtures/externalVendor/src/**/*.js',
        options: {
          specs: 'test/fixtures/externalVendor/spec/**/*.js',
          vendor: 'http://code.jquery.com/jquery-1.10.1.min.js'
        }
      },
// @todo: automate fail case here
//      syntaxError: {
//        src: 'test/fixtures/syntaxError/src/**/*.js',
//        options: {
//          specs: 'test/fixtures/syntaxError/spec/**/*.js'
//        }
//      },
      customTemplate: {
        src: 'test/fixtures/pivotal/src/**/*.js',
        options: {
          specs: 'test/fixtures/pivotal/spec/*Spec.js',
          helpers: 'test/fixtures/pivotal/spec/*Helper.js',
          template: 'test/fixtures/customTemplate/custom.tmpl',
          junit: {
            path: 'junit/customTemplate',
            consolidate: true
          }
        }
      },
      selfTest: {
        options: {
          specs:["test/selfTest/*.js"],
          "--web-security": "no"
        }
      }
    },


    nodeunit: {
      tasks: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['connect:return500', 'jasmine', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};
