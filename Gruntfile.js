module.exports = function(grunt) {
  var hljs = require('highlight.js');
  hljs.LANGUAGES['scss'] = require('./lib/scss.js')(hljs);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,

    foundation: {
      js: ['js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
      scss: ['scss/foundation.scss','scss/settings.scss']

    },

    jst: {
      compile: {
        files: {
          'dist/docs/assets/js/templates.js': ['doc/templates/*.html']
        }
      }
    },

    assemble: {
      options: {
        marked: {
          highlight: function(code, lang) {
            if (lang === undefined) lang = 'bash';
            if (lang === 'html') lang = 'xml';
            if (lang === 'js') lang = 'javascript';
            return '<div class="code-container">' + hljs.highlight(lang, code).value + '</div>';
          }
        }
      },
      dist: {
        options: {
          flatten: false,
          assets: 'dist/docs/assets',
          data: ['doc/data/*.json'],
          helpers: ['doc/helpers/*.js'],
          partials: ['doc/includes/**/*.{html,scss}'],
          layoutdir: 'doc/layouts',
          layout: 'default.html'
        },
        expand: true,
        cwd: 'doc/pages',
        src: '**/*.{html,md}',
        dest: 'dist/docs/'
      }
    },

    sass: {
      dist: {
        options: {
          loadPath: [__dirname + '/scss'],
          bundleExec: true
        },
        files: {
          'dist/assets/css/foundation.css': '<%= foundation.scss %>',
          'dist/assets/css/normalize.css': 'scss/normalize.scss',
          'dist/docs/assets/css/docs.css': 'doc/assets/scss/docs.scss'
        }
      }
    },

    'string-replace': {
      dist: {
        files: {
          'dist/assets/':'dist/assets/bower.json',
          'dist/assets/css/':'dist/assets/css/*.css',
          'dist/assets/js/':'dist/assets/js/*js',
          'dist/assets/js/foundation/':'dist/assets/js/foundation/*js',
          'dist/assets/scss/foundation/components/':'dist/assets/scss/foundation/components/*.scss',
          'dist/docs/assets/css/':'dist/docs/assets/css/*.css',
          'dist/docs/assets/js/':'dist/docs/assets/js/*.js'
        },
        options: {
          replacements: [
            {pattern: /{{\s*VERSION\s*}}/g, replacement: '<%= pkg.version %>'}
          ]
        }
      }
    },

    concat: {
      dist: {
        files: {
          'dist/assets/js/foundation.js':'<%= foundation.js %>'
        }
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/assets/js/foundation.min.js': ['<%= foundation.js %>'],
          'dist/docs/assets/js/modernizr.js': ['<%= vendor %>/modernizr/modernizr.js'],
          'dist/docs/assets/js/all.js': ['<%= vendor %>/jquery/dist/jquery.js', '<%= vendor %>/lodash/dist/lodash.min.js','<%= vendor %>/fastclick/lib/fastclick.js', '<%= vendor %>/jquery-placeholder/jquery.placeholder.js', '<%= vendor %>/jquery.autocomplete/dist/jquery.autocomplete.js', '<%= foundation.js %>', 'doc/assets/js/docs.js']
        }
      },
      vendor: {
        files: {
          'dist/assets/js/vendor/placeholder.js': '<%= vendor %>/jquery-placeholder/jquery.placeholder.js',
          'dist/assets/js/vendor/fastclick.js': '<%= vendor %>/fastclick/lib/fastclick.js',
          'dist/assets/js/vendor/jquery.cookie.js': '<%= vendor %>/jquery.cookie/jquery.cookie.js',
          'dist/assets/js/vendor/jquery.js': '<%= vendor %>/jquery/dist/jquery.js',
          'dist/assets/js/vendor/modernizr.js': '<%= vendor %>/modernizr/modernizr.js'
        }
      }
    },

    copy: {
      dist: {
        files: [
          {expand:true, cwd: 'doc/assets/', src: ['**/*','!{scss,js}/**/*'], dest: 'dist/docs/assets/', filter:'isFile'},
          {expand:true, cwd: 'js/', src: ['foundation/*.js'], dest: 'dist/assets/js', filter: 'isFile'},
          {src: '<%= vendor %>/jquery/jquery.min.js', dest: 'dist/docs/assets/js/jquery.js'},
          {expand:true, cwd: 'scss/', src: '**/*.scss', dest: 'dist/assets/scss/', filter: 'isFile'},
          {src: 'bower.json', dest: 'dist/assets/'}
        ]
      }
    },

    clean: ['dist/'],

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist/'
        }
      }
    },

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

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },
      karma: {
        files: [
          'dist/assets/js/*.js',
          'spec/**/*.js',
          'dist/assets/css/*.css'
        ],
        tasks: ['karma:dev_watch:run']
      },
      sass: {
        files: ['scss/**/*.scss', 'doc/assets/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload:true
        }
      },
      js: {
        files: ['js/**/*.js', 'doc/assets/js/**/*.js'],
        tasks: ['copy', 'concat', 'uglify'],
        options: {livereload:true}
      },
      assemble_all: {
        files: ['doc/{includes,layouts}/**/*.html'],
        tasks: ['assemble'],
        options: {livereload:true}
      },
      assemble_pages: {
        files: ['doc/pages/**/*.html'],
        tasks: ['newer:assemble'],
        options: {livereload:true}
      },
      assets: {
        options: {cwd: 'doc/assets/', livereload: true},
        files: ['**/*','!{scss,js}/**/*'],
        tasks: ['copy']
      },
      jst: {
        files: ['doc/templates/*.html'],
        tasks: ['jst'],
        options: {livereload:false}
      }
    },

    rsync: {
      dist: {
        options: {
          args: ["--verbose"],
          src: "./dist/docs/",
          recursive: true,
          dest: "/home/deployer/sites/foundation-docs/current",
          host: "deployer@72.32.134.77"
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.task.registerTask('watch_start', ['karma:dev_watch:start', 'watch']);
  grunt.registerTask('build:assets', ['clean', 'sass', 'concat', 'uglify', 'copy', 'jst', 'string-replace']);
  grunt.registerTask('build', ['build:assets', 'assemble']);
  grunt.registerTask('travis', ['build', 'karma:continuous']);
  grunt.registerTask('develop', ['travis', 'watch_start']);
  grunt.registerTask('deploy', ['build', 'rsync:dist']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('server', ['connect:server:keepalive']);
};
