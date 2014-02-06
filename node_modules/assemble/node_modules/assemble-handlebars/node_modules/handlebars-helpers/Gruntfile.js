/*
 * handlebars-helpers
 * http://github.com/assemble/handlebars-helpers
 *
 * Copyright (c) 2013 Assemble
 * MIT License
 */


module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        globals: {
          it: true,
          describe: true,
          expect: true,
          module: true,
          exports: true,
          require: true,
          before: true,
          after: true
        }
      },
      all: [
        'Gruntfile.js',
        'test/**/*.js',
        'lib/**/*.js'
      ]
    },


    // Run mocha tests.
    mochaTest: {
      tests: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*_test.js']
      }
    },


    // Generate lists of helpers that need docs and tests.
    coverage: {
      options: {
        srcPattern: /\s*(.+((?!(')).)):\s*function/g,
        srcSanitize: ['_readme', '.md', '.hbs', 'helper-']
      },
      documented: {
        options: {
          namespace: 'docsDifference',
          compareAgainst: 'docs/helpers/**/*.md',
          compareSanitize: []
        },
        src: ['lib/helpers/*.js'],
        dest: 'docs/undocumented.json',
      },
      tests: {
        options: {
          namespace: 'testsDifference',
          compare: 'content',
          compareAgainst: 'test/helpers/*.js',
          comparePattern: /^(?!  )describe\((?:'|")(.+)(?:'|").+/gm,
          compareSanitize: []
        },
        src: ['lib/helpers/*.js'],
        dest: 'docs/notest.json',
      }
    },

    readme: {
      options: {
        metadata: ['docs/*.json']
      }
    },

    compress: {
      zip: {
        options: {
          archive: 'docs/helpers.zip'
        },
        files: [
          {expand: true, cwd: 'docs/helpers/', src: ['**/*']}
        ]
      },
    },

    // Clean test files before building or re-testing.
    clean: {
      helpers: ['lib/**/*']
    }
  });

  // Load plugins to provide the necessary tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Tests to be run
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('docs', ['coverage', 'compress', 'readme', 'sync']);

  // By default, build templates using helpers and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'docs']);
};
