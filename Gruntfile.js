module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.initConfig({
      jasmine: {
        src: [
            'js/foundation/foundation.js',
            'js/foundation/*.js'
        ],
        options: {
            specs: 'spec/**/*Spec.js',
            helpers: 'spec/**/*Helper.js',
            keepRunner: true,
            styles: ['test/stylesheets/normalize.css', 'test/stylesheets/foundation.css']
        },

        zepto: {
            src: '<%= jasmine.src %>',
            options: {
                outfile: 'test/_SpecRunner_zepto.html',
                vendor: [
                    'js/vendor/custom.modernizr.js',
                    'js/vendor/zepto.js'
                ],
            }
        },

        jquery: {
            src: '<%= jasmine.src %>',
            options: {
                outfile: 'test/_SpecRunner_jquery.html',
                vendor: [
                    'js/vendor/custom.modernizr.js',
                    'js/vendor/jquery.js'
                ]
            }
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
      watch: {
        css: {
            files: 'scss/**/*.scss',
            tasks: ['sass']
        },
        tests: {
            files: [
                'js/**/*.js',
                'spec/**/*.js'
            ],
            tasks: 'test',
            options: {
                interrupt: true
            }
        }
      }
    });

    grunt.registerTask('test', ['sass:test', 'jasmine:zepto', 'jasmine:jquery']);

    grunt.registerTask('default', ['test']);
};