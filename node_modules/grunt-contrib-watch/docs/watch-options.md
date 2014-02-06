# Settings

There are a number of options available. Please review the [minimatch options here](https://github.com/isaacs/minimatch#options). As well as some additional options as follows:

## files
Type: `String|Array`

This defines what file patterns this task will watch. Can be a string or an array of files and/or minimatch patterns.

## tasks
Type: `String|Array`

This defines which tasks to run when a watched file event occurs.

## options.spawn
Type: `Boolean`
Default: true

Whether to spawn task runs in a child process. Setting this option to `false` speeds up the reaction time of the watch (usually 500ms faster for most) and allows subsequent task runs to share the same context. Not spawning task runs can make the watch more prone to failing so please use as needed.

Example:
```js
watch: {
  scripts: {
    files: ['**/*.js'],
    tasks: ['jshint'],
    options: {
      spawn: false,
    },
  },
},
```

*For backwards compatibility the option `nospawn` is still available and will do the opposite of `spawn`.*

## options.interrupt
Type: `Boolean`
Default: false

As files are modified this watch task will spawn tasks in child processes. The default behavior will only spawn a new child process per target when the previous process has finished. Set the `interrupt` option to true to terminate the previous process and spawn a new one upon later changes.

Example:
```js
watch: {
  scripts: {
    files: '**/*.js',
    tasks: ['jshint'],
    options: {
      interrupt: true,
    },
  },
},
```

## options.debounceDelay
Type: `Integer`
Default: 500

How long to wait before emitting events in succession for the same filepath and status. For example if your `Gruntfile.js` file was `changed`, a `changed` event will only fire again after the given milliseconds.

Example:
```js
watch: {
  scripts: {
    files: '**/*.js',
    tasks: ['jshint'],
    options: {
      debounceDelay: 250,
    },
  },
},
```

## options.interval
Type: `Integer`
Default: 100

The `interval` is passed to `fs.watchFile`. Since `interval` is only used by `fs.watchFile` and this watcher also uses `fs.watch`; it is recommended to ignore this option. *Default is 100ms*.

## options.event
Type: `String|Array`
Default: `'all'`

Specify the type watch event that trigger the specified task. This option can be one or many of: `'all'`, `'changed'`, `'added'` and `'deleted'`.

Example:
```js
watch: {
  scripts: {
    files: '**/*.js',
    tasks: ['generateFileManifest'],
    options: {
      event: ['added', 'deleted'],
    },
  },
},
```

## options.forever
Type: `Boolean`
Default: true

This is *only a task level option* and cannot be configured per target. By default the watch task will duck punch `grunt.fatal` and `grunt.warn` to try and prevent them from exiting the watch process. If you don't want `grunt.fatal` and `grunt.warn` to be overridden set the `forever` option to `false`.

## options.dateFormat
Type: `Function`

This is *only a task level option* and cannot be configured per target. By default when the watch has finished running tasks it will display the message `Completed in 1.301s at Thu Jul 18 2013 14:58:21 GMT-0700 (PDT) - Waiting...`. You can override this message by supplying your own function:

```js
watch: {
  options: {
    dateFormat: function(time) {
      grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
      grunt.log.writeln('Waiting for more changes...');
    },
  },
  scripts: {
    files: '**/*.js',
    tasks: 'jshint',
  },
},
```

## options.atBegin
Type: `Boolean`
Default: false

This option will trigger the run of each specified task at startup of the watcher.

## options.livereload
Type: `Boolean|Number|Object`
Default: false

Set to `true` or set `livereload: 1337` to a port number to enable live reloading. Default and recommended port is `35729`.

If enabled a live reload server will be started with the watch task per target. Then after the indicated tasks have ran, the live reload server will be triggered with the modified files.

Example:
```js
watch: {
  css: {
    files: '**/*.sass',
    tasks: ['sass'],
    options: {
      livereload: true,
    },
  },
},
```
