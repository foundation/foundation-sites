module.exports = function(grunt) {
  var hljs = require('highlight.js');
  hljs.LANGUAGES['scss'] = require('./js/vendor/scss.js')(hljs);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    foundation: {
      js: ['js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
      scss: ['scss/foundation/components/_*.scss']
    },

    assemble: {
      options: {
        marked: {
          gfm: true,
          sanitize: false,
          highlight: function(code, lang) {
            if (lang === undefined) lang = 'bash';
            if (lang === 'html') lang = 'xml';
            if (lang === 'js') lang = 'javascript';
            return '<div class="code-container">' + hljs.highlight(lang, code).value + '</div>';
          }
        }
      },
      dist_docs: {
        options: {
          flatten: false,
          assets: 'dist/docs/assets',
          data: ['doc/data/*.json'],
          partials: ['doc/includes/**/*.{html,scss}'],
          helpers: ['doc/helpers/*.js'],
          layout: 'doc/layouts/default.html'
        },
        expand: true,
        cwd: 'doc/pages',
        src: '**/*.{html,md}',
        dest: 'dist/docs/'
      }
    },

    sass: {
      dist: {
        files: {
          'dist/assets/css/foundation.css': '<%= foundation.scss %>',
        }
      },
      dist_docs: {
        options: {
          includePaths: ['scss']
        },
        files: {
          'dist/docs/assets/css/docs.css': 'doc/assets/scss/docs.scss'
        }
      }
    },

    concat: {
      dist: {
        files: {
          'dist/assets/js/foundation.js': '<%= foundation.js %>',
          'dist/docs/assets/js/all.js': ['js/vendor/fastclick.js', '<%= foundation.js %>', 'doc/assets/js/docs.js']
        }
      }
    },

    copy: {
      docs: {
        files: [
          {cwd: 'doc/assets/', expand:true, filter: 'isFile', src: '{img}/**/*', dest: 'dist/docs/assets/'},
          {cwd: 'js/vendor/', expand:true, filter: 'isFile', src: '**/*', dest: 'dist/docs/assets/js'},
          {cwd: 'js/vendor/', expand:true, filter: 'isFile', src: '**/*', dest: 'dist/docs/assets/js/vendor'},
          {cwd: 'scss/', expand:true, filter: 'isFile', src: '**/*', dest: 'dist/assets/scss/'}
        ]
      }
    },

    clean: ['dist/'],

    watch: {
      styles: {
        files: ['scss/**/*.scss', 'doc/assets/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['js/**/*.js', 'doc/assets/js/**/*.js'],
        tasks: ['concat']
      },
      docs: {
        files: ['doc/{includes,layouts,pages}/**/*.{html}'],
        tasks: ['assemble:docs']
      },
      assets: {
        files: ['doc/assets/{img}/**/*'],
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

  grunt.registerTask('compile', ['clean', 'sass', 'concat', 'copy', 'assemble'])
  grunt.registerTask('default', ['compile', 'watch']);
};