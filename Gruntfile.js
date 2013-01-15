module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
      qunit: {
        all: ['test/javascripts/tests/**/*.html']
      },
      watch: {
        all: {
            files: [
                'test/javascripts/tests/**/*.html',
                'test/javascripts/tests/**/*.js',
                'lib/assets/javascripts/foundation/*.js'
            ],
            tasks: 'default',
            options: {
                interrupt: true
            }
        }
      }
    });

    // Default task.
    grunt.registerTask('default', ['qunit']);
};