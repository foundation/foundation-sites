JS-YAML - YAML 1.2 parser and serializer for JavaScript
=======================================================

[![Build Status](https://secure.travis-ci.org/nodeca/js-yaml.png)](http://travis-ci.org/nodeca/js-yaml)

[Online Demo](http://nodeca.github.com/js-yaml/)


This is an implementation of [YAML](http://yaml.org/), a human friendly data
serialization language. Started as [PyYAML](http://pyyaml.org/) port, it was
completely rewritten from scratch. Now it's very fast, and supports 1.2 spec.


Installation
------------

### YAML module for node.js

```
npm install js-yaml
```


### CLI executable

If you want to inspect your YAML files from CLI, install js-yaml globally:

```
npm install js-yaml -g
```

#### Usage

```
usage: js-yaml [-h] [-v] [-c] [-j] [-t] file

Positional arguments:
  file           File with YAML document(s)

Optional arguments:
  -h, --help     Show this help message and exit.
  -v, --version  Show program's version number and exit.
  -c, --compact  Display errors in compact mode
  -j, --to-json  Output a non-funky boring JSON
  -t, --trace    Show stack trace on error
```


### Bundled YAML library for browsers

``` html
<script src="js-yaml.min.js"></script>
<script type="text/javascript">
var doc = jsyaml.load('greeting: hello\nname: world');
</script>
```

Browser support was done mostly for online demo. If you find any errors - feel
free to send pull requests with fixes. Also note, that IE and other old browsers
needs [es5-shims](https://github.com/kriskowal/es5-shim) to operate.


API
---

Here we cover the most 'useful' methods. If you need advanced details (creating
your own tags), see [wiki](https://github.com/nodeca/js-yaml/wiki) and
[examples](https://github.com/nodeca/js-yaml/tree/master/examples) for more
info.

In node.js JS-YAML automatically registers handlers for `.yml` and `.yaml`
files. You can load them just with `require`. That's mostly equivalent to
calling `safeLoad()` on fetched content of a file. Just with one string!

``` javascript
require('js-yaml');

// Get document, or throw exception on error
try {
  var doc = require('/home/ixti/example.yml');
  console.log(doc);
} catch (e) {
  console.log(e);
}
```


### safeLoad (string [ , options ])

**Recommended loading way.** Parses `string` as single YAML document. Returns a JavaScript
object or throws `YAMLException` on error. By default, does not support regexps,
functions and undefined. This method is safe for untrusted data.

options:

- `filename` _(default: null)_ - string to be used as a file path in
  error/warning messages.
- `strict` _(default - false)_ makes the loader to throw errors instead of
  warnings.
- `schema` _(default: `DEFAULT_SAFE_SCHEMA`)_ - specifies a schema to use.
  - `FAILSAFE_SCHEMA` - only strings, arrays and plain objects:
    http://www.yaml.org/spec/1.2/spec.html#id2802346
  - `JSON_SCHEMA` - all JSON-supported types:
    http://www.yaml.org/spec/1.2/spec.html#id2803231
  - `CORE_SCHEMA` - same as `JSON_SCHEMA`:
    http://www.yaml.org/spec/1.2/spec.html#id2804923
  - `DEFAULT_SAFE_SCHEMA` - all supported YAML types, without unsafe ones
    (`!!js/undefined`, `!!js/regexp` and `!!js/function`):
    http://yaml.org/type/
  - `DEFAULT_FULL_SCHEMA` - all supported YAML types.

NOTE: This function **does not** understand multi-document sources, it throws
exception on those.

NOTE: JS-YAML **does not** support schema-specific tag resolution restrictions.
So, JSON schema is not such strict as defined in the YAML specification.
It allows numbers in any notaion, use `Null` and `NULL` as `null`, etc.
Core schema also has no such restrictions. It allows binary notation for integers.


### load (string [ , options ])

**Use with care with untrusted sources**. The same as `safeLoad()` but uses
`DEFAULT_FULL_SCHEMA` by default - adds some JavaScript-specific types:
`!!js/function`, `!!js/regexp` and `!!js/undefined`. For untrusted sources you
must additionally validate object structure, to avoid injections:

``` javascript
var untrusted_code = '"toString": !<tag:yaml.org,2002:js/function> "function (){very_evil_thing();}"';

// I'm just converting that string, what could possibly go wrong?
require('js-yaml').load(untrusted_code) + ''
```


### safeLoadAll (string, iterator [ , options ])

Same as `safeLoad()`, but understands multi-document sources and apply
`iterator` to each document.

``` javascript
var yaml = require('js-yaml');

yaml.safeLoadAll(data, function (doc) {
  console.log(doc);
});
```


### loadAll (string, iterator [ , options ])

Same as `safeLoadAll()` but uses `DEFAULT_FULL_SCHEMA` by default.


### safeDump (object [ , options ])

Serializes `object` as YAML document. Uses `DEFAULT_SAFE_SCHEMA`, so it will
throw exception if you try to dump regexps or functions. However, you can
disable exceptions by `skipInvalid` option.

options:

- `indent` _(default: 2)_ - indentation width to use (in spaces).
- `skipInvalid` _(default: false)_ - do not throw on invalid types (like function
  in the safe schema) and skip pairs and single values with such types.
- `flowLevel` (default: -1) - specifies level of nesting, when to switch from
  block to flow style for collections. -1 means block style everwhere
- `styles` - "tag" => "style" map. Each tag may have own set of styles.
- `schema` _(default: `DEFAULT_SAFE_SCHEMA`)_ specifies a schema to use.

styles:

``` none
!!null
  "canonical"   => "~"

!!int
  "binary"      => "0b1", "0b101010", "0b1110001111010"
  "octal"       => "01", "052", "016172"
  "decimal"     => "1", "42", "7290"
  "hexadecimal" => "0x1", "0x2A", "0x1C7A"

!!null, !!bool, !!float
  "lowercase"   => "null", "true", "false", ".nan", '.inf'
  "uppercase"   => "NULL", "TRUE", "FALSE", ".NAN", '.INF'
  "camelcase"   => "Null", "True", "False", ".NaN", '.Inf'
```

By default, !!int uses `decimal`, and !!null, !!bool, !!float use `lowercase`.



### dump (object [ , options ])

Same as `safeDump()` but without limits (uses `DEFAULT_FULL_SCHEMA` by default).


Supported YAML types
--------------------

The list of standard YAML tags and corresponding JavaScipt types. See also
[YAML tag discussion](http://pyyaml.org/wiki/YAMLTagDiscussion) and
[YAML types repository](http://yaml.org/type/).

```
!!null ''                   # null
!!bool 'yes'                # bool
!!int '3...'                # number
!!float '3.14...'           # number
!!binary '...base64...'     # buffer
!!timestamp 'YYYY-...'      # date
!!omap [ ... ]              # array of key-value pairs
!!pairs [ ... ]             # array or array pairs
!!set { ... }               # array of objects with given keys and null values
!!str '...'                 # string
!!seq [ ... ]               # array
!!map { ... }               # object
```

**JavaScript-specific tags**

```
!!js/regexp /pattern/gim            # RegExp
!!js/undefined ''                   # Undefined
!!js/function 'function () {...}'   # Function
```

Caveats
-------

Note, that you use arrays or objects as key in JS-YAML. JS do not allows objects
or array as keys, and stringifies (by calling .toString method) them at the
moment of adding them.

``` yaml
---
? [ foo, bar ]
: - baz
? { foo: bar }
: - baz
  - baz
```

``` javascript
{ "foo,bar": ["baz"], "[object Object]": ["baz", "baz"] }
```

Also, reading of properties on implicit block mapping keys is not supported yet.
So, the following YAML document cannot be loaded.

``` yaml
&anchor foo:
  foo: bar
  *anchor: duplicate key
  baz: bat
  *anchor: duplicate key
```


Breaking changes in 1.x.x -> 2.0.x
----------------------------------

If your have not used __custom__ tags or loader classes - no changes needed. Just
upgrade library and enjoy high parse speed.

In other case, you should rewrite your tag constructors and custom loader
classes, to conform new schema-based API. See
[examples](https://github.com/nodeca/js-yaml/tree/master/examples) and
[wiki](https://github.com/nodeca/js-yaml/wiki) for details.
Note, that parser internals were completely rewritten.


License
-------

View the [LICENSE](https://github.com/nodeca/js-yaml/blob/master/LICENSE) file
(MIT).
