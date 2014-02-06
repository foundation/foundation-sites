module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    watch: {
      all: {
        files: ['lib/*.js'],
      },
      onlyAdded: {
        options: {
          event: 'added',
        },
        files: ['lib/*.js'],
      },
      onlyChanged: {
        options: {
          event: 'changed',
        },
        files: ['lib/*.js'],
      },
      onlyDeleted: {
        options: {
          event: 'deleted',
        },
        files: ['lib/*.js'],
      },
      onlyAddedAndDeleted: {
        options: {
          event: ['added', 'deleted'],
        },
        files: ['lib/*.js'],
      },
      targetOne: { files: ['lib/one/*.js'] },
      targetTwo: { files: ['lib/two/*.js'] },
    },
  });

  // Load this watch task
  grunt.loadTasks('../../../tasks');

  var timeout;

  // trigger on watch events
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(filepath + ' was indeed ' + action);
    if (target !== undefined) {
      grunt.log.writeln(target + ' specifc event was fired')
    }
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      grunt.util.exit(0);
    }, 2000);
  });

};
