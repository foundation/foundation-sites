# grunt-contrib-compress [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-compress.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-compress)

> Compress files and folders.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-compress --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-compress');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-compress/tree/grunt-0.3-stable).*


## Compress task
_Run this task with the `grunt compress` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Node Libraries Used:
[archiver](https://github.com/ctalkington/node-archiver) (for zip/tar)
[zlib](http://nodejs.org/api/zlib.html#zlib_options) (for gzip).
### Options

#### archive
Type: `String`

This is used to define where to output the archive. Each target can only have one output file.

#### mode
Type: `String`

This is used to define which mode to use, currently supports `gzip`, `deflate`, `deflateRaw`, `tar`, `tgz` (tar gzip) and `zip`.

Automatically detected per dest:src pair, but can be overridden per target if desired.

#### level (zip only)
Type: `Integer`
Default: 1

Sets the level of archive compression.

*Currently, gzip compression related options are not supported due to deficiencies in node's zlib library.*

#### pretty
Type: `Boolean`
Default: `false`

Pretty print file sizes when logging.

### Usage Examples

```js
// make a zipfile
compress: {
  main: {
    options: {
      archive: 'archive.zip'
    },
    files: [
      {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
      {src: ['path/**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs
      {expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // makes all src relative to cwd
      {flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level
    ]
  }
}
```

```js
// gzip assets 1-to-1 for production
compress: {
  main: {
    options: {
      mode: 'gzip'
    },
    expand: true,
    cwd: 'assets/',
    src: ['**/*'],
    dest: 'public/'
  }
}
```

```js
// use custom extension for the output file
compress: {
  main: {
    options: {
      mode: 'gzip'
    },
    files: [
      // Each of the files in the src/ folder will be output to
      // the dist/ folder each with the extension .gz.js
      {expand: true, src: ['src/*.js'], dest: 'dist/', ext: '.gz.js'}
    ]
  }
}
```

## Release History

 * 2013-06-03   v0.5.2   Allow custom extensions using the ext property.
 * 2013-05-28   v0.5.1   Avoid gzip on folders.
 * 2013-04-23   v0.5.0   Add support for deflate and deflateRaw.
 * 2013-04-15   v0.4.10   Fix issue where task finished before all data was compressed.
 * 2013-04-09   v0.4.9   Bump Archiver version.
 * 2013-04-07   v0.4.8   Open streams lazily to avoid too many open files.
 * 2013-04-01   v0.4.7   Pipe gzip to fix gzip issues. Add tests that undo compressed files to test.
 * 2013-03-25   v0.4.6   Fix node v0.8 compatibility issue with gzip.
 * 2013-03-20   v0.4.5   Update to archiver 0.4.1 Fix issue with gzip failing intermittently.
 * 2013-03-19   v0.4.4   Fixes for Node.js v0.10. Explicitly call grunt.file methods with map and filter.
 * 2013-03-14   v0.4.3   Fix for gzip; continue iteration on returning early.
 * 2013-03-13   v0.4.2   Refactor task like other contrib tasks. Fix gzip of multiple files. Remove unused dependencies.
 * 2013-02-22   v0.4.1   Pretty print compressed sizes. Logging each addition to a compressed file now only happens in verbose mode.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-14   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Conversion to grunt v0.4 conventions. Replace basePath with cwd.
 * 2012-10-12   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-09   v0.3.1   Replace zipstream package with archiver.
 * 2012-09-24   v0.3.0   General cleanup. Options no longer accepted from global config key.
 * 2012-09-18   v0.2.2   Test refactoring. No valid source check. Automatic mode detection.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Chris Talkington](http://christalkington.com/)

*This file was generated on Mon Jun 03 2013 12:11:25.*
