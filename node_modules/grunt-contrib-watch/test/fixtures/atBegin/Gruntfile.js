module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    echo: {
      one: { message: 'one has changed' }
    },
    watch: {
      options:{
        atBegin: true
      },
      one: {
        files: ['lib/one.js', 'Gruntfile.js'],
        tasks: 'echo:one',
      }
    }
  });
  // Load the echo task
  grunt.loadTasks('../tasks');
  // Load this watch task
  grunt.loadTasks('../../../tasks');
  grunt.registerTask('default', ['echo']);
};
