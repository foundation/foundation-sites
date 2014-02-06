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
      all: {
        src: 'src/**/*.js'
      },
      none: {
        src: []
      }
    },
    log: {
      all: {
        src: 'src/**/*.js',
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

  grunt.registerTask('default', function() {

    grunt.task.run([
      // run the task without newer, expect all files
      'log',
      'assert:that:modified:all',

      // run the task with newer, expect all files
      'newer:log',
      'assert:that:modified:all',

      // HFS+ filesystem mtime resolution
      'wait:1001',

      // run the task again without modifying any, expect no files
      'newer:log',
      'assert:that:modified:none'

    ]);

  });

};
