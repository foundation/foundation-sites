/*
 * grunt-contrib-connect
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var certs = path.join(__dirname, 'tasks', 'certs');

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    },

    connect: {
      custom_base: {
        options: {
          base: 'test',
        },
      },
      custom_port: {
        options: {
          port: 9000,
        },
      },
      custom_https: {
        options: {
          port: 8001,
          protocol: 'https',
        }
      },
      custom_https_certs: {
        options: {
          port: 8002,
          protocol: 'https',
          key: grunt.file.read(path.join(certs, 'server.key')).toString(),
          cert: grunt.file.read(path.join(certs, 'server.crt')).toString(),
          ca: grunt.file.read(path.join(certs, 'ca.crt')).toString(),
          passphrase: 'grunt',
        }
      },
      custom_middleware: {
        options: {
          port: 9001,
          base: '.',
          middleware: function(connect, options) {
            // Return array of whatever middlewares you want
            return [
              connect.static(options.base),
              function(req, res, next) {
                res.end('Hello from port ' + options.port);
              }
            ];
          },
        },
      },
      multiple_base: {
        options: {
          base: ['test', 'docs'],
          port: 9002,
        },
      },
      multiple_base_directory: {
        options: {
          base: ['test', 'docs'],
          directory: 'test/fixtures/',
          port: 9003,
        },
      },
    },
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('test', ['connect', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};
