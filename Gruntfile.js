module.exports = function(grunt) {
  var hljs = require('highlight.js');
  hljs.LANGUAGES['scss'] = require('./lib/scss.js')(hljs);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,

    foundation: {
      js: ['js/foundation/foundation.js', 'js/foundation/foundation.*.js'],
      scss: ['scss/foundation.scss']
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
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/assets/js/foundation.min.js': ['<%= foundation.js %>'],
          'dist/docs/assets/js/modernizr.js': ['<%= vendor %>/modernizr/modernizr.js'],
          'dist/docs/assets/js/all.js': ['vendor/lodash/dist/lodash.min.js','<%= vendor %>/fastclick/lib/fastclick.js', '<%= vendor %>/jquery-placeholder/jquery.placeholder.js', '<%= vendor %>/jquery.autocomplete/dist/jquery.autocomplete.js', '<%= foundation.js %>', 'doc/assets/js/docs.js']
        }
      },
      vendor: {
        files: {
          'dist/docs/assets/js/placeholder.js': '<%= vendor %>/jquery-placeholder/jquery.placeholder.js',
          'dist/docs/assets/js/fastclick.js': '<%= vendor %>/fastclick/lib/fastclick.js',
          'dist/docs/assets/js/jquery.cookie.js': '<%= vendor %>/jquery.cookie/jquery.cookie.js',
          'dist/docs/assets/js/jquery.js': '<%= vendor %>/jquery/dist/jquery.js',
          'dist/docs/assets/js/modernizr.js': '<%= vendor %>/modernizr/modernizr.js'
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
      grunt: { files: ['Gruntfile.js'] },
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
          host: "deployer@foundation5.zurb.com"
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jst');

  grunt.task.registerTask('watch_start', ['karma:dev_watch:start', 'watch']);
  grunt.registerTask('build:assets', ['clean', 'sass', 'concat', 'uglify', 'copy', 'jst']);
  grunt.registerTask('build', ['build:assets', 'assemble']);
  grunt.registerTask('travis', ['build', 'karma:continuous']);
  grunt.registerTask('develop', ['travis', 'watch_start']);
  grunt.registerTask('deploy', ['build', 'rsync:dist']);
  grunt.registerTask('default', ['build', 'watch']);
};
