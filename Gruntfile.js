module.exports = function(grunt) {
  var hljs = require('highlight.js');
  hljs.LANGUAGES['scss'] = require('./lib/scss.js')(hljs);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    foundation: {
      js: ['js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
      scss: ['scss/foundation.scss']
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
      },
      dist_download: {
        options: {
          assets: 'dist/assets'
        },
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },

    sass: {
      dist: {
        options: {
          includePaths: ['scss']
        },
        files: {
          'dist/assets/css/foundation.css': '<%= foundation.scss %>',
          'dist/docs/assets/css/docs.css': 'doc/assets/scss/docs.scss'
        }
      },
      dist_compressed: {
        options: {
          outputStyle:'compressed',
          includePaths: ['scss']
        },
        files: {
          'dist/assets/css/foundation.min.css': '<%= foundation.scss %>'
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

    uglify: {
      dist: {
        files: {
          'dist/assets/js/foundation.min.js': ['<%= foundation.js %>']
        }        
      }
    },

    copy: {
      dist: {
        files: [
          {cwd: 'doc/assets/', expand:true, filter: 'isFile', src: '{img}/**/*', dest: 'dist/docs/assets/'},
          {cwd: 'js/', expand:true, filter: 'isFile', src: ['{foundation,vendor}/**/*.js'], dest: 'dist/assets/js'},
          {cwd: 'js/vendor/', expand:true, filter: 'isFile', src: ['**/*.js'], dest: 'dist/docs/assets/js/'},
          {cwd: 'scss/', expand:true, filter: 'isFile', src: '**/*.scss', dest: 'dist/assets/scss/'}
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
        tasks: ['concat', 'uglify']
      },
      dist_docs: {
        files: ['doc/{includes,layouts,pages}/**/*.{html}'],
        tasks: ['assemble:dist_docs']
      },
      dist_download: {
        files: ['index.html'],
        tasks: ['assemble:dist_download']
      },
      assets: {
        files: ['doc/assets/{img}/**/*'],
        tasks: ['copy']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('compile', ['clean', 'sass', 'concat', 'uglify', 'copy', 'assemble'])
  grunt.registerTask('default', ['compile', 'watch']);
};