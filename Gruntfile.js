module.exports = function(grunt) {
  var manifest = require('./manifest.json');
  var hljs = require('highlight.js');
  hljs.LANGUAGES['scss'] = require('./js/vendor/scss.js')(hljs);

  grunt.initConfig({

    assemble: {
      options: {
        flatten: true,
        assets: 'dist/docs/assets',
        data: ['doc/data/*.{json,yml}'],
        marked: {
          gfm: true,
          sanitize: true,
          highlight: function(code, lang) {
            if (lang === 'html') lang = 'xml';
            // if (lang === 'scss') lang = 'scss';
            if (lang === 'js') lang = 'javascript';
            return hljs.highlight(lang, code).value;
          }
        }
      },
      docs: {
        options: {
          partials: ['doc/includes/*.html'],
          helpers: ['doc/helpers/*.js'],
          layout: 'doc/layouts/default.html'
        },
        src: 'doc/pages/*.html',
        dest: 'dist/docs/'
      }
    },

    sass: {
      dist: {
        files: {
          'dist/assets/foundation.css': 'scss/foundation.scss',
        }
      },
      docs: {
        options: {
          includePaths: ['scss']
        },
        files: {
          'dist/docs/assets/css/docs.css': 'doc/assets/scss/docs.scss'
        }
      }
    },

    concat: {
      options: {},
      dist: {
        files: {
          'dist/assets/foundation.js': ['js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
          'dist/assets/all.js': ['js/vendor/jquery.js', 'js/vendor/fastclick.js', 'js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
          'dist/assets/custom.modernizr.js': ['js/vendor/custom.modernizr.js'],
          'dist/assets/foundation.scss': manifest.sass
        }
      },
      docs: {
        files: {
          'dist/docs/assets/js/custom.modernizr.js': ['js/vendor/custom.modernizr.js'],
          'dist/docs/assets/js/all.js': ['js/vendor/jquery.js', 'js/vendor/fastclick.js', 'js/foundation/foundation.js', 'js/foundation/foundation.*.js', 'doc/assets/js/docs.js']
        }
      }
    },

    copy: {
      docs: {
        files: [
          {cwd: 'doc/assets/img/',expand: true,filter: 'isFile',src: '**/*',dest: 'dist/docs/assets/img/'},
          {cwd: 'doc/assets/fonts/',expand: true,filter: 'isFile',src: '**/*',dest: 'dist/docs/assets/fonts/'}
        ]
      }
    },

    clean: ['dist/'],

    watch: {
      styles: {
        files: ['scss/**/*.scss', 'doc/assets/scss/**/*.scss'],
        tasks: ['sass', 'assemble:docs']
      },
      js: {
        files: ['js/**/*.js', 'doc/assets/js/**/*.js'],
        tasks: ['concat:dist']
      },
      docs: {
        files: ['doc/**/*'],
        tasks: ['assemble:docs']
      },
      docs_assets: {
        files: ['doc/assets/img/**/*', 'doc/assets/fonts/**/*'],
        tasks: ['copy:docs']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('compile', ['clean', 'sass', 'concat', 'copy', 'assemble:docs'])
  grunt.registerTask('default', ['compile', 'watch']);
};