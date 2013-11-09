module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
      karma: {
        options: {
          configFile: 'karma.conf.js',
          runnerPort: 9999,
          //background: true
        },
        continuous: {
          singleRun: true,
          browsers: ['TinyPhantomJS', 'SmallPhantomJS']
        },
        zepto: {
          configFile: 'karma.zepto.conf.js',
          singleRun: true,
          browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'SmallChrome', 'Firefox'],
          reporters: 'dots'
        },
        dev: {
          singleRun: true,
          browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'SmallChrome', 'Firefox'],
          reporters: 'dots'
        },
        zepto_watch: {
          background: true,
          configFile: 'karma.zepto.conf.js',
          browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'SmallChrome', 'Firefox'],
        },
        dev_watch: {
          background: true,
          browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'SmallChrome', 'Firefox'],
        },
        dev_watch_mac: {
          background: true,
          browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'SmallChrome', 'Firefox', 'Safari']
        },
        dev_watch_win: {
          background: true,
          browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'SmallChrome', 'Firefox', 'IE']
        }
      },
      sass: {
        test: {
            files: {
                'test/stylesheets/normalize.css' : 'scss/normalize.scss',
                'test/stylesheets/foundation.css' : 'scss/foundation.scss'
            }
        }
      },
      watch_start: {
        karma: {
            files: [
                'js/**/*.js',
                'spec/**/*.js',
                'test/stylesheets/**/*.css'
            ],
            tasks: ['karma:dev_watch:run', 'karma:zepto_watch:run']
        },
        css: {
            files: 'scss/**/*.scss',
            tasks: ['sass']
        },
      }
    });

    grunt.registerTask('test', ['sass:test']);
    grunt.registerTask('default', ['test', 'karma:dev', 'karma:zepto']);

    grunt.task.renameTask('watch', 'watch_start');
    grunt.task.registerTask('watch', ['karma:dev_watch:start', 'karma:zepto_watch:start', 'watch_start']);
    grunt.task.registerTask('watch:mac', ['karma:dev_watch_mac:start', 'watch_start']);
    grunt.task.registerTask('watch:win', ['karma:dev_watch_win:start', 'watch_start']);
};