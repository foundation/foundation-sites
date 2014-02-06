##node-sass

[![Build Status](https://secure.travis-ci.org/andrew/node-sass.png?branch=master)](https://travis-ci.org/andrew/node-sass)

Node-sass is a library that provides binding for Node.js to [libsass](https://github.com/hcatlin/libsass), the C version of the popular stylesheet preprocessor, Sass.

It allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.

Find it on npm: <https://npmjs.org/package/node-sass>

## Install

    npm install node-sass

## Usage

```javascript
var sass = require('node-sass');
sass.render({
	file: scss_filename,
	success: callback
	[, options..]
	});
// OR
var css = sass.renderSync({
	data: scss_content
	[, options..]
});
```

### Options

The API for using node-sass has changed, so that now there is only one variable - an options hash. Some of these options are optional, and in some circumstances some are mandatory.

#### file
`file` is a `String` of the path to an `scss` file for libsass to render. One of this or `data` options are required, for both render and renderSync.

#### data
`data` is a `String` containing the scss to be rendered by libsass. One of this or `file` options are required, for both render and renderSync. It is recommended that you use the `includePaths` option in conjunction with this, as otherwise libsass may have trouble finding files imported via the `@import` directive.

#### success
`success` is a `Function` to be called upon successful rendering of the scss to css. This option is required but only for the render function. If provided to renderSync it will be ignored.

#### error
`error` is a `Function` to be called upon occurance of an error when rendering the scss to css. This option is optional, and only applies to the render function. If provided to renderSync it will be ignored.

#### includePaths
`includePaths` is an `Array` of path `String`s to look for any `@import`ed files. It is recommended that you use this option if you are using the `data` option and have **any** `@import` directives, as otherwise libsass may not find your depended-on files.

#### outputStyle
`outputStyle` is a `String` to determine how the final CSS should be rendered. Its value should be one of `'nested', 'expanded', 'compact', 'compressed'`.
[Important: currently the argument `outputStyle` has some problem which may cause the output css becomes nothing because of the libsass, so you should not use it now!]

#### sourceComments
`sourceComments` is a `String` to determine what debug information is included in the output file. Its value should be one of `'none', 'normal', 'map'`. The default is `'none'`.
[Important: `souceComments` is only supported when using the `file` option, and does nothing when using `data` flag.]

### Examples

```javascript
var sass = require('node-sass');
sass.render({
	data: 'body{background:blue; a{color:black;}}',
	success: function(css){
  		console.log(css)
	},
	error: function(error) {
		console.log(error);
	},
	includePaths: [ 'lib/', 'mod/' ],
	outputStyle: 'compressed'
});
// OR
console.log(sass.renderSync({
	data: 'body{background:blue; a{color:black;}}'),
	outputStyle: 'compressed'
});
```

### Edge-case behaviours

* In the case that both `file` and `data` options are set, node-sass will only attempt to honour the `file` directive.

## Connect/Express middleware

Recompile `.scss` files automatically for connect and express based http servers

```javascript
var server = connect.createServer(
  sass.middleware({
      src: __dirname
    , dest: __dirname + '/public'
    , debug: true
    , outputStyle: 'compressed'
  }),
  connect.static(__dirname + '/public')
);
```

Heavily inspired by <https://github.com/LearnBoost/stylus>

## DocPad Plugin

[@jking90](https://github.com/jking90) wrote a [DocPad](http://docpad.org/) plugin that compiles `.scss` files using node-sass: <https://github.com/jking90/docpad-plugin-nodesass>

## Grunt extension

[@sindresorhus](https://github.com/sindresorhus/) has created a set of grunt tasks based on node-sass: <https://github.com/sindresorhus/grunt-sass>

## Example App

There is also an example connect app here: <https://github.com/andrew/node-sass-example>

## Rebuilding binaries

Node-sass includes pre-compiled binaries for popular platforms, to add a binary for your platform follow these steps:

Check out the project:

    git clone https://github.com/andrew/node-sass.git
    cd node-sass
    npm install
    npm install -g node-gyp
    git submodule init
    git submodule update
    node-gyp rebuild

Replace the prebuild binary with your newly generated one

    cp build/Release/binding.node precompiled/*your-platform*/binding.node

## Command Line Interface

The interface for command-line usage is fairly simplistic at this stage, as seen in the following usage section.

Output will be saved with the same name as input SASS file into the current working directory if it's omitted.

### Usage
 `node-sass [options] <input.scss> [<output.css>]`

 **Options:**
 
      --output-style     CSS output style (nested|expanded|compact|compressed)  [default: "nested"]
      --source-comments  Include debug info in output (none|normal|map)         [default: "none"]
      --include-path     Path to look for @import-ed files                      [default: cwd]
      --help, -h         Print usage info

## Contributors
Special thanks to the following people for submitting patches:

Dean Mao
Brett Wilkins
litek
gonghao

### Note on Patches/Pull Requests

 * Fork the project.
 * Make your feature addition or bug fix.
 * Add documentation if necessary.
 * Add tests for it. This is important so I don't break it in a future version unintentionally.
 * Send a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2013 Andrew Nesbitt. See [LICENSE](https://github.com/andrew/node-sass/blob/master/LICENSE) for details.
