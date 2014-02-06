# grunt-newer

Configure [Grunt](http://gruntjs.com/) tasks to run with newer files only.

**Synopsis:**  The [`newer`](#newer) task will configure another task to run with `src` files that are *a)* newer than the `dest` files or *b)* newer than the last successful run (if there are no `dest` files).  See below for examples and more detail.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [`gruntfile.js`](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-newer --save-dev
```

Once the plugin has been installed, it may be enabled inside your `gruntfile.js` with this line:

```js
grunt.loadNpmTasks('grunt-newer');
```

<a name="newer"></a>
## The `newer` task

The `newer` task doesn't require any special configuration.  To use it, just add `newer` as the first argument when running other tasks.

For example, if you want to use [Uglify](https://npmjs.org/package/grunt-contrib-uglify) to minify your source files only when one or more of them is newer than the previously minified destination file, configure the `uglify` task as you would otherwise, and then register a task with `newer` at the front.

```js
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'dest/app.min.js': ['src/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('minify', ['newer:uglify:all']);
```

With the above configuration the `minify` task will only run `uglify` if one or more of the `src/**/*.js` files is newer than the `dest/app.min.js` file.

The above example shows how the `newer` task works with other tasks that specify both `src` and `dest` files.  In this case, the modification time of `src` files are compared to modification times of corresponding `dest` files to determine which `src` files to include.

The `newer` task can also be used with tasks that don't generate any `dest` files.  In this case, `newer` will only use files that are newer than the last successful run of the same task.

For example, if you want to run [JSHint](https://npmjs.org/package/grunt-contrib-jshint) on only those files that have been modified since the last successful run, configure the `jshint` task as you would otherwise, and then register a task with `newer` at the front.

```js
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: 'src/**/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('lint', ['newer:jshint:all']);
```

With the above configuration, running `grunt lint` will configure your `jshint:all` task to use only files in the `jshint.all.src` config that have been modified since the last successful run of the same task.  The first time the `jshint:newer:all` task runs, all source files will be used.  After that, only the files you modify will be run through the linter.

Another example is to use the `newer` task in conjunction with `watch`.  For example, you might want to set up a watch to run a linter on all your `.js` files whenever one changes.  With the `newer` task, instead of re-running the linter on all files, you only need to run it on the files that changed.

```js
  var srcFiles = 'src/**/*.js';

  grunt.initConfig({
    jshint: {
      all: {
        src: srcFiles
      }
    },
    watch: {
      all: {
        files: srcFiles,
        tasks: ['newer:jshint:all']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

```

With the above configuration, running `grunt jshint watch` will first lint all your files with `jshint` and then set up a watch.  Whenever one of your source files changes, the `jshint` task will be run on just the modified file.

*Note:* If your task is configured with `dest` files, `newer` will run your task with only those files that are newer than the corresponding `dest` files.

## Options for the `newer` task

In most cases, you shouldn't need to add any special configuration for the `newer` task.  Just `grunt.loadNpmTasks('grunt-newer')` and you can use `newer` as a prefix to your other tasks.  The single option below is available if you need a custom configuration.

#### <a id="optionscache">options.cache</a>
 * type: `string`
 * default: `node_modules/grunt-newer/.cache`

To keep track of timestamps for successful runs, the `newer` task writes to a cache directory.  The default is to use a `.cache` directory within the `grunt-newer` installation directory.  If you need timestamp info to be written to a different location, configure the task with a `cache` option.

Example use of the `cache` option:

```js
  grunt.initConfig({
    newer: {
      options: {
        cache: 'path/to/custom/cache/directory'
      }
    }
  });
```

## That's it

Please [submit an issue](https://github.com/tschaub/grunt-newer/issues) if you encounter any trouble.  Contributions or suggestions for improvements welcome!

[![Current Status](https://secure.travis-ci.org/tschaub/grunt-newer.png?branch=master)](https://travis-ci.org/tschaub/grunt-newer)
