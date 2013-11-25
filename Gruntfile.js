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
          'dist/assets/css/normalize.css': 'scss/normalize.scss',
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
          'dist/assets/js/foundation.js': '<%= foundation.js %>'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/foundation.min.js': ['<%= foundation.js %>'],
          'dist/docs/assets/js/all.js': ['js/vendor/fastclick.js', 'js/vendor/jquery.autocomplete.js', '<%= foundation.js %>', 'doc/assets/js/docs.js']
        }
      }
    },

    copy: {
      dist: {
        files: [
          {cwd: 'doc/assets/', expand:true, filter: 'isFile', src: 'img/**/*', dest: 'dist/docs/assets/'},
          {cwd: 'js/', expand:true, filter: 'isFile', src: ['{foundation,vendor}/**/*.js'], dest: 'dist/assets/js'},
          {cwd: 'js/vendor/', expand:true, filter: 'isFile', src: ['**/*.js'], dest: 'dist/docs/assets/js/'},
          {cwd: 'scss/', expand:true, filter: 'isFile', src: '**/*.scss', dest: 'dist/assets/scss/'},
          {src: 'bower.json', dest: 'dist/assets/'}
        ]
      }
    },

    clean: ['dist/'],

    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
      },
      continuous: {
        singleRun: true,
        browsers: ['TinyPhantomJS', 'SmallPhantomJS']
      },
      dev: {
        singleRun: true,
        browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'TinyChrome', 'Firefox'],
        reporters: 'dots'
      },
      dev_watch: {
        background: true,
        browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'TinyChrome', 'Firefox']
      },
      mac: {
        singleRun: true,
        browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'TinyChrome', 'Firefox', 'Safari'],
        reporters: 'dots'
      },
      win: {
        singleRun: true,
        browsers: ['TinyPhantomJS', 'SmallPhantomJS', 'TinyChrome', 'Firefox', 'IE'],
        reporters: 'dots'
      }
    },

    watch_start: {
      grunt: { files: ['Gruntfile.js'] },
      karma: {
        files: [
          'dist/assets/js/*.js',
          'spec/**/*.js',
          'dist/assets/css/*.css'
        ],
        tasks: ['karma:dev_watch:run']
      },

      styles: {
        files: ['scss/**/*.scss', 'doc/assets/**/*.scss'],
        tasks: ['sass'],
        options: {livereload:true}
      },
      js: {
        files: ['js/**/*.js', 'doc/assets/js/**/*.js'],
        tasks: ['copy', 'concat', 'uglify'],
        options: {livereload:true}
      },
      dist_docs: {
        files: ['doc/{includes,layouts}/**/*.html'],
        tasks: ['assemble'],
        options: {livereload:true}
      },
      dist_docs_pages: {
        files: ['doc/pages/**/*.html'],
        tasks: ['newer:assemble'],
        options: {livereload:true}
      },
      dist_download: {
        files: ['index.html'],
        tasks: ['assemble:dist_download']
      },
      assets: {
        files: ['doc/assets/{img}/**/*'],
        tasks: ['copy'],
        options: {livereload:true}
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/foundation.tar.gz'
        },
        files: [
          {expand: true, cwd: 'dist/assets/', src: ['**'], dest: 'foundation/'}
        ]
      }
    },

    rsync: {
      dist: {
        options: {
          args: ["--verbose"],
          src: "./dist/docs/",
          recursive: true,
          dest: "/home/deployer/sites/foundation-docs/current",
          host: "deployer@foundation5.zurb.com"
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');

  grunt.task.renameTask('watch', 'watch_start');
  grunt.task.registerTask('watch', ['karma:dev_watch:start', 'watch_start']);

  grunt.registerTask('compile:assets', ['clean', 'sass', 'concat', 'uglify', 'copy']);
  grunt.registerTask('compile', ['compile:assets', 'assemble']);
  grunt.registerTask('build', ['compile', 'compress']);
  grunt.registerTask('default', ['compile', 'watch']);
  grunt.registerTask('travis', ['compile', 'karma:continuous']);
  grunt.registerTask('deploy', ['compile', 'rsync:dist']);
};
