# matchdep [![Build Status](https://secure.travis-ci.org/tkellen/node-matchdep.png?branch=master)](http://travis-ci.org/tkellen/node-matchdep)

> Use minimatch to filter npm module dependencies by name.

## Examples

```js
var matchdep = require('matchdep');

// Filter dependencies (with autoloading of package.json from cwd)
matchdep.filter('mini*');

// Filter devDependencies (with config string indicating file to be required)
matchdep.filterDev('grunt-contrib*', './package.json');

// Filter all dependencies (with explicit config provided)
matchdep.filterAll('*', require('./package.json'));
```

## Usage

```js
filter(pattern, config)
filterDev(pattern, config)
filterAll(pattern, config)
```

### pattern
Type: `String`
Default: none

[minimatch](/isaacs/minimatch) compatible pattern to filter dependencies.

### config
Type: `String` or `Object`
Default: `path.resolve(process.cwd(),'package.json')`

If config is a string, matchdep will attempt to require it.  If it is an object, it will be used directly.

---
Copyright (c) 2012 Tyler Kellen. See LICENSE for further details.
