var assert = require('assert');
var path = require('path');


/**
 * @param {Object} grunt Grunt.
 */
module.exports = function(grunt) {

  var log = [];

  grunt.initConfig({
    newer: {
      options: {
        cache: path.join(__dirname, '.cache')
      }
    },
    modified: {
      one: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'one.coffee',
          dest: 'dest/',
          ext: '.js'
        }]
      },
      all: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.coffee',
          dest: 'dest/',
          ext: '.js'
        }]
      },
      none: {
        src: []
      }
    },
    log: {
      all: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.coffee',
          dest: 'dest/',
          ext: '.js'
        }],
        getLog: function() {
          return log;
        }
      }
    },
    assert: {
      that: {
        getLog: function() {
          return log;
        }
      }
    }
  });

  grunt.loadTasks('../../../tasks');
  grunt.loadTasks('../../../test/integration/tasks');

  grunt.registerTask('assert-reconfigured', function() {
    var config = grunt.config.get(['log', 'all']);
    assert.deepEqual(Object.keys(config).sort(), ['files', 'getLog']);
    var files = config.files;
    assert.equal(files.length, 1);
    assert.deepEqual(Object.keys(files[0]).sort(),
        ['cwd', 'dest', 'expand', 'ext', 'src']);
    assert.equal(files[0].src, '**/*.coffee');
  });

  grunt.registerTask('default', function() {

    grunt.task.run([
      // run the log task with newer, expect all files
      'newer:log',
      'assert:that:modified:all',

      // HFS+ filesystem mtime resolution
      'wait:1001',

      // modify one file
      'modified:one',

      // run assert task again, expect one file
      'newer:log',
      'assert:that:modified:one',

      // check that log:all task has been reconfigured with original config
      'assert-reconfigured'
    ]);

  });

};
