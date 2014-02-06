# Options

This task primarily delegates to [UglifyJS2][], so please consider the [UglifyJS documentation][] as required reading for advanced configuration.

[UglifyJS2]: https://github.com/mishoo/UglifyJS2
[UglifyJS documentation]: http://lisperator.net/uglifyjs/

## mangle
Type: `Boolean` `Object`
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior).

## compress
Type: `Boolean` `Object`
Default: `{}`

Turn on or off source compression with default options. If an `Object` is specified, it is passed as options to `UglifyJS.Compressor()`.

## beautify
Type: `Boolean` `Object`
Default: `false`

Turns on beautification of the generated source code. An `Object` will be merged and passed with the options sent to `UglifyJS.OutputStream()`

## report
Choices: `false` `'min'` `'gzip'`
Default: `false`

Either do not report anything, report only minification result, or report minification and gzip results. This is useful to see exactly how well Uglify is performing, but using `'gzip'` can add 5-10x runtime task execution.

Example ouput using `'gzip'`:

```
Original: 198444 bytes.
Minified: 101615 bytes.
Gzipped:  20084 bytes.
```

## sourceMap
Type: `String`  `Function`
Default: `undefined`

The location to output the sourcemap. If a function is provided, the uglify destination is passed as the argument
and the return value will be used as the sourceMap name.

## sourceMapRoot
Type: `String`
Default: `undefined`

The location where your source files can be found. This sets the sourceRoot field in the source map.

## sourceMapIn
Type: `String`
Default: `undefined`

The location of an input source map from an earlier compilation, e.g. from CoffeeScript.

## sourceMappingURL
Type: `String`  `Function`
Default: `undefined`

The location of your sourcemap. Defaults to the location you use for sourceMap, override if you need finer control. Provide
a function to dynamically generate the sourceMappingURL based off the destination.

## sourceMapPrefix
Type: `Number`
Default: `undefined`

The number of directories to drop from the path prefix when declaring files in the source map.

## wrap
Type: `String`
Default: `undefined`

Wrap all of the code in a closure, an easy way to make sure nothing is leaking.
For variables that need to be public `exports` and `global` variables are made available.
The value of wrap is the global variable exports will be available as.

## exportAll
Type: `Boolean`
Default: `false`

When using `wrap` this will make all global functions and variables available via the export variable.

## preserveComments
Type: `Boolean` `String` `Function`
Default: `undefined`
Options: `false` `'all'` `'some'`

Turn on preservation of comments.

- `false` will strip all comments
- `'all'` will preserve all comments in code blocks that have not been squashed or dropped
- `'some'` will preserve all comments that start with a bang (`!`) or include a closure compiler style directive (`@preserve` `@license` `@cc_on`)
- `Function` specify your own comment preservation function. You will be passed the current node and the current comment and are expected to return either `true` or `false`

## banner
Type: `String`
Default: empty string

This string will be prepended to the beginning of the minified output. It is processed using [grunt.template.process][], using the default options.

## footer
Type: `String`
Default: empty string

This string will be append to the end of the minified output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

[grunt.template.process]: https://github.com/gruntjs/grunt/wiki/grunt.template#wiki-grunt-template-process

