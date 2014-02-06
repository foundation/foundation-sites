module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    watch: {
      negate: {
        files: ['lib/**/*.js', '!lib/sub/*.js'],
        tasks: ['echo'],
      },
    },
  });

  // Load this watch task
  grunt.loadTasks('../../../tasks');

  grunt.registerTask('default', ['echo']);

  grunt.registerTask('echo', function() {
    grunt.log.writeln('echo task has ran.');
  });
};
