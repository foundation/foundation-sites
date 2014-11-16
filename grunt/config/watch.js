// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
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
    options: {
      livereload: true
    }
  },
  assemble_all: {
    files: ['doc/{includes,layouts}/**/*.html'],
    tasks: ['assemble'],
    options: {
      livereload: true
    }
  },
  assemble_pages: {
    files: ['doc/pages/**/*.html'],
    tasks: ['newer:assemble'],
    options: {
      livereload: true
    }
  },
  assets: {
    options: {
      cwd: 'doc/assets/',
      livereload: true
    },
    files: ['**/*', '!{scss,js}/**/*'],
    tasks: ['copy']
  },
  jst: {
    files: ['doc/templates/*.html'],
    tasks: ['jst'],
    options: {
      livereload: false
    }
  }
};