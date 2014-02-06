# assemble [![NPM version](https://badge.fury.io/js/assemble.png)](http://badge.fury.io/js/assemble)  [![Build Status](https://travis-ci.org/assemble/assemble.png)](https://travis-ci.org/assemble/assemble)

> Static site generator for Grunt.js and Yeoman. Assemble makes it dead simple to build modular sites, blogs, gh-pages, components and documentation from reusable templates and data.

### [Visit the website →](http://assemble.io)

## Why use Assemble?

1. Most popular site generator for Grunt.js and Yeoman. Assemble is used to build hundreds of web projects, ranging in size from a single page to 14,000 pages (that we're aware of!). [Let us know if you use Assemble](https://github.com/assemble/assemble/issues/300).
1. Allows you to carve your HTML up into reusable fragments: partials, includes, sections, snippets... Whatever you prefer to call them, Assemble does that.
1. Optionally use `layouts` to wrap your pages with commonly used elements and content.
1. "Pages" can either be defined as HTML/templates, JSON or YAML, or directly inside the Gruntfile.
1. It's awesome. Lol just kidding. But seriously, Assemble... is... awesome! and it's fun to use.

...and of course, we use Assemble to build the project's own documentation [http://assemble.io](http://assemble.io):

![image](https://f.cloud.github.com/assets/383994/1463257/f031bcfe-4525-11e3-9a03-89a17eee7518.png)

## The "assemble" task

### Getting Started
Assemble requires Grunt `~0.4.1`

_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install Assemble with the following command:

```bash
npm install assemble --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('assemble');
```

### The "assemble" task
_Run the "assemble" task with the `grunt assemble` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

In your project's Gruntfile, add a section named `assemble` to the data object passed into `grunt.initConfig()`.

```js
assemble: {
  options: {
    assets: 'assets',
    plugins: ['permalinks'],
    partials: ['includes/**/*.hbs'],
    layout: ['layouts/default.hbs'],
    data: ['data/*.{json,yml}']
  },
  pages: {
    src: ['docs/*.hbs'],
    dest: './'
  }
},
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html



### Options
See the documentation for [Options](http://assemble.io/docs/Options.html) for more information.

### [assets](http://assemble.io/docs/options-assets.html)
Type: `String`
Default: `undefined`

Used with the `{{assets}}` variable to resolve the relative path from the _dest file_ to the _assets_ folder.

### [data](http://assemble.io/docs/options-data.html)
Type: `String|Array|Object`
Default: `src/data`

Specify the data to supply to your templates. Data may be formatted in `JSON`, `YAML`, [YAML front matter](http://assemble.io/docs/YAML-front-matter.html), or passed directly as an object. Wildcard patterns may also be used.

### [layoutdir](http://assemble.io/docs/options-layoutdir.html)
Type: `String`
Default: `undefined`

The directory to use as the "cwd" for [layouts](http://assemble.io/docs/options-layout.html). When this option is defined, layouts may be defined using only the name of the layout.

### [layout](http://assemble.io/docs/options-layout.html)
Type: `String`
Default: `undefined`

If set, this defines the layout file to use for the [task or target][tasks-and-targets]. However, when specifying a layout, unlike Jekyll, _Assemble requires a file extension_ since you are not limited to using a single file type.

### layoutext
Type: `String`
Default: `undefined`

Specify the extension to use for layouts, enabling layouts in YAML front matter to be defined without an extension:

```yaml
---
layout: default
---
```

[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets

### [partials](http://assemble.io/docs/options-partials.html)
Type:  `String|Array`
Default: `undefined`

Specifies the Handlebars partials files, or paths to the directories of files to be used.

### [plugins](http://assemble.io/plugins/)
Type: `String|Array`
Default: `undefined`

Name of the npm module to use and/or the path(s) to any custom plugins to use. Wildcard patterns may also be used.

See the [docs for plugins](http://assemble.io/plugins/).

### [helpers](http://assemble.io/docs/options-helpers.html)
Type: `String|Array`
Default: [handlebars-helpers](http://github.com/assemble/handlebars-helpers)

Name of the npm module to use and/or the path(s) to any custom helpers to use with the current template engine. Wildcard patterns may also be used.

By default, Assemble includes [handlebars-helpers](http://assemble.io/docs/helpers/index.html) as a dependency, so any helpers from that library are already available to be used in your templates.

See the [docs for helpers](http://assemble.io/helpers/).


### postprocess
Type: `Function`
Default: `undefined`

Function to use for post-processing generated HTML. 

#### Examples

**"Prettify" HTML**

`npm install pretty`, then add the following config to apply formatting to any generated HTML:

```js
options: {
  postprocess: require('pretty')
}
```

**String transformations**

`npm install frep` and add the following config to find and replace content:

```js
options: {
  postprocess: function(src) {
    return require('frep').replaceStr(src, [
      {
        // Remove leading whitespace
        pattern: /^\s*/,
        replacement: ""
      },
      {
        // replace "Jekyll" with "Assemble" (jk ;-)
        pattern: "Jekyll",
        replacement: "Assemble"
      }
    ]);
  }
}
```

### [ext](http://assemble.io/docs/options-ext.html)
Type: `String`
Default: `.html`

Specify the file extension for destination files. Example:

### [marked](http://assemble.io/docs/options-marked.html)
Type: `Object`
Default: [Marked.js defaults](https://github.com/chjj/marked#options-1)

Specify the [Marked.js options](https://github.com/chjj/marked#options-1) for the `{{#markdown}}{{/markdown}}` and `{{md ""}}` helpers to use when converting content.

### [engine](http://assemble.io/docs/options-engine.html)
Type: `String`
Default: `Handlebars` 

Specify the engine to use for compiling templates **if you are not using Handlebars**.

**PLEASE NOTE** that _this option is only necessary if_:

a. You **are not using Handlebars**, or
b. You need to "force" Handlebars to recognize a non-default extension. See [extensions.yml](./lib/extensions.yml).

Also see [assemble-swig](https://github.com/assemble/assemble-swig) for compiling [Swig Templates](https://github.com/paularmstrong).

### flatten
Type: `Boolean`
Default: `false`

Remove anything after (and including) the first `.` in the destination path, then append this value. In other words, when files are generated from different source folders this "flattens" them into the same destination directory. See [building the files object dynamically][files-object] for more information on `files` formats.


Visit [Assemble's documentation](http://assemble.io) for more information about options.



### Usage Examples
Simple example of using data files in both `.json` and `.yml` format to build Handlebars templates.

```javascript
assemble: {
  options: {
    data: 'src/data/**/*.{json,yml}'
  },
  docs: {
    files: {
      'dist/': ['src/templates/**/*.hbs']
    }
  }
}
```

#### Using multiple targets

```js
assemble: {
  options: {
    assets: 'assets',
    layoutdir: 'docs/layouts'
    partials: ['docs/includes/**/*.hbs'],
    data: ['docs/data/**/*.{json,yml}']
  },
  site: {
    options: {
      layout: 'default.hbs'
    },
    src: ['templates/site/*.hbs'],
    dest: './'
  },
  blog: {
    options: {
      layout: 'blog-layout.hbs'
    },
    src: ['templates/blog/*.hbs'],
    dest: 'articles/'
  },
  docs: {
    options: {
      layout: 'docs-layout.hbs'
    },
    src: ['templates/docs/*.hbs'],
    dest: 'docs/'
  }
},
```

Visit [Assemble's documentation](http://assemble.io) for many more examples and pointers on getting started.


## Contributing
Find a bug? Have a feature request? Please [create an Issue](git://github.com/assemble/assemble/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with [grunt-readme](https://github.com/assemble/grunt-readme).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!


## Assemble plugins
Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team.

+ [assemble-contrib-anchors](https://github.com/assemble/assemble-contrib-anchors): Assemble plugin for creating anchor tags from generated html. 
+ [assemble-contrib-contextual](https://github.com/assemble/assemble-contrib-contextual): Generates a JSON file containing the context of each page. Basic plugin to help see what's happening in the build. 
+ [assemble-contrib-decompress](https://github.com/assemble/assemble-contrib-decompress): Assemble plugin for extracting zip, tar and tar.gz archives.  
+ [assemble-contrib-download](https://github.com/assemble/assemble-contrib-download): Assemble plugin for downloading files from GitHub. 
+ [assemble-contrib-lunr](https://github.com/assemble/assemble-contrib-lunr): Assemble plugin for creating a search engine within your static site using lunr.js. 
+ [assemble-contrib-markdown](https://github.com/assemble/assemble-contrib-markdown): Convert markdown files to HTML using marked.js. This plugin is an alternative to Assemble's markdown Handlebars helpers. Both are useful in different scenarios. 
+ [assemble-contrib-permalinks](https://github.com/assemble/assemble-contrib-permalinks): Permalinks plugin for Assemble, the static site generator for Grunt.js and Yeoman. This plugin enables powerful and configurable URI replacement patterns, presets, uses Moment.js for parsing dates, and much more. 
+ [assemble-contrib-sitemap](https://github.com/assemble/assemble-contrib-sitemap): Sitemap generator plugin for Assemble 
+ [assemble-contrib-toc](https://github.com/assemble/assemble-contrib-toc): Create a table of contents in the generated HTML, using Cheerio.js 
+ [assemble-contrib-wordcount](https://github.com/assemble/assemble-contrib-wordcount): Assemble plugin for displaying a word-count on blog posts or pages. 

Visit [assemble.io/plugins](http:/assemble.io/plugins/) for more information about [Assemble](http:/assemble.io/) plugins.



## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)


## Release History

 * 2013-10-25   v0.4.17   Adds a params object to the call to `helper.register` allowing grunt and assemble to be passed in and used from inside helpers.
 * 2013-10-24   v0.4.16   Adds support for using wildcards with plugins stages.
 * 2013-10-24   v0.4.15   Implements multiple plugin stages.
 * 2013-10-21   v0.4.14   Adds support for plugins running once, before and after (thanks @adjohnson916). Adds pagination! Thanks to @xzyfer, `options.data` can now also directly accept an object of data.
 * 2013-10-12   v0.4.13   Adds `originalAssets` property to root context to store the pre-calculated assets path
 * 2013-10-05   v0.4.12   Fixes plugins resolving for devDependencies.
 * 2013-10-03   v0.4.11   Adds filePair to page object. thanks @adjohnson916!
 * 2013-10-02   v0.4.10   Adds plugin support to Assemble using the `plugins` option. thanks @adjohnson916!
 * 2013-10-02   v0.4.9   Adds `layoutext` and `postprocess` options.
 * 2013-09-30   v0.4.8   Assemble now builds 30-50% faster due to some refactoring to async and how context is calculated.
 * 2013-09-20   v0.4.7   Adds grunt-readme to make it easier to keep the readme updated using templates. Keep options.partials intact so they can be used in helpers.
 * 2013-09-15   v0.4.6   Updating how the assets path is calculated. Adding resolve-dep and ability to load helpers from node modules using minimatch patterns
 * 2013-09-03   v0.4.5   Bug fix: allow page content containing $. Add alias metadata for data on pages configuration object.
 * 2013-08-01   v0.4.4   Adds "nested layouts" Adds option for pages in JSON/YAML collections to be defined as either objects or keys in an array.
 * 2013-08-01   v0.4.3   Adds "options.pages" for passing in an array of pages in JSON or YAML format.
 * 2013-06-20   v0.4.0   Adds "layoutdir" option for defining the directory to be used for layouts. If layoutdir is defined, then layouts may be defined using only the name of the layout.
 * 2013-06-10   v0.3.81   Adds additional ways to load custom helpers. Now it's possible to use a glob pattern that points to a list of scripts with helpers to load. Adds examples and tests on how to use the new custom helper loading methods.
 * 2013-06-01   v0.3.80   Fixing bug with null value in engine
 * 2013-05-07   v0.3.77   Updated README with info about assemble methods
 * 2013-04-28   v0.3.74   Updating the assemble library to use the assemble-utils repo and unnecessary code.
 * 2013-04-21   v0.3.73   Fixing how the relative path helper worked and showing an example in the footer of the layout. This example is hidden, but can be seen by doing view source.
 * 2013-04-20   v0.3.72   Fixing the layout override issue happening in the page yaml headers. Something was missed during refactoring.
 * 2013-04-19   v0.3.9   Adds tags and categories to the root context and ensure that the current page context values don't override the root context values.
 * 2013-04-18   v0.3.8   Updating to use actual assets property from current page.
 * 2013-04-17   v0.3.7   Cleaning up some unused folders and tests
 * 2013-04-16   v0.3.6   Fixed missing assets property.
 * 2013-04-16   v0.3.5   Adds a sections array to the template engine so it can be used in helpers.
 * 2013-04-11   v0.3.4   More tests for helpers and global variables, organized tests. A number of bug fixes.
 * 2013-04-06   v0.3.3   helper-lib properly externalized and wired up. Global variables for filename, ext and pages
 * 2013-03-22   v0.3.22   Merged global and target level options so data and partial files can be joined
 * 2013-03-22   v0.3.21   Valid YAML now allowed in options.data object (along with JSON)
 * 2013-03-18   v0.3.14   new relative helper for resolving relative paths


## License
Copyright (c) 2013 Assemble, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Thursday, December 5, 2013._

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

