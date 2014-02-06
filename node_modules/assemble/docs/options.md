See the documentation for [Options](http://assemble.io/docs/Options.html) for more information.

## [assets](http://assemble.io/docs/options-assets.html)
Type: `String`
Default: `undefined`

Used with the `{{assets}}` variable to resolve the relative path from the _dest file_ to the _assets_ folder.

## [data](http://assemble.io/docs/options-data.html)
Type: `String|Array|Object`
Default: `src/data`

Specify the data to supply to your templates. Data may be formatted in `JSON`, `YAML`, [YAML front matter](http://assemble.io/docs/YAML-front-matter.html), or passed directly as an object. Wildcard patterns may also be used.

## [layoutdir](http://assemble.io/docs/options-layoutdir.html)
Type: `String`
Default: `undefined`

The directory to use as the "cwd" for [layouts](http://assemble.io/docs/options-layout.html). When this option is defined, layouts may be defined using only the name of the layout.

## [layout](http://assemble.io/docs/options-layout.html)
Type: `String`
Default: `undefined`

If set, this defines the layout file to use for the [task or target][tasks-and-targets]. However, when specifying a layout, unlike Jekyll, _Assemble requires a file extension_ since you are not limited to using a single file type.

## layoutext
Type: `String`
Default: `undefined`

Specify the extension to use for layouts, enabling layouts in YAML front matter to be defined without an extension:

```yaml
---
layout: default
---
```

[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets

## [partials](http://assemble.io/docs/options-partials.html)
Type:  `String|Array`
Default: `undefined`

Specifies the Handlebars partials files, or paths to the directories of files to be used.

## [plugins](http://assemble.io/plugins/)
Type: `String|Array`
Default: `undefined`

Name of the npm module to use and/or the path(s) to any custom plugins to use. Wildcard patterns may also be used.

See the [docs for plugins](http://assemble.io/plugins/).

## [helpers](http://assemble.io/docs/options-helpers.html)
Type: `String|Array`
Default: [handlebars-helpers](http://github.com/assemble/handlebars-helpers)

Name of the npm module to use and/or the path(s) to any custom helpers to use with the current template engine. Wildcard patterns may also be used.

By default, Assemble includes [handlebars-helpers](http://assemble.io/docs/helpers/index.html) as a dependency, so any helpers from that library are already available to be used in your templates.

See the [docs for helpers](http://assemble.io/helpers/).


## postprocess
Type: `Function`
Default: `undefined`

Function to use for post-processing generated HTML. 

### Examples

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

## [ext](http://assemble.io/docs/options-ext.html)
Type: `String`
Default: `.html`

Specify the file extension for destination files. Example:

## [marked](http://assemble.io/docs/options-marked.html)
Type: `Object`
Default: [Marked.js defaults](https://github.com/chjj/marked#options-1)

Specify the [Marked.js options](https://github.com/chjj/marked#options-1) for the `{{#markdown}}{{/markdown}}` and `{{md ""}}` helpers to use when converting content.

## [engine](http://assemble.io/docs/options-engine.html)
Type: `String`
Default: `Handlebars` 

Specify the engine to use for compiling templates **if you are not using Handlebars**.

**PLEASE NOTE** that _this option is only necessary if_:

a. You **are not using Handlebars**, or
b. You need to "force" Handlebars to recognize a non-default extension. See [extensions.yml](./lib/extensions.yml).

Also see [assemble-swig](https://github.com/assemble/assemble-swig) for compiling [Swig Templates](https://github.com/paularmstrong).

## flatten
Type: `Boolean`
Default: `false`

Remove anything after (and including) the first `.` in the destination path, then append this value. In other words, when files are generated from different source folders this "flattens" them into the same destination directory. See [building the files object dynamically][files-object] for more information on `files` formats.


Visit [Assemble's documentation](http://assemble.io) for more information about options.
