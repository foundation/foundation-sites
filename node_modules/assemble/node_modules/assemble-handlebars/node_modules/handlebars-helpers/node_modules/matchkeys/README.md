# matchkeys [![NPM version](https://badge.fury.io/js/matchkeys.png)](http://badge.fury.io/js/matchkeys)

> A package.json utility for comparing keywords across multiple files.


## Getting started

Install the module with: `npm install matchkeys --save`


```js
var keys = require('matchkeys');
keys.match(arrayOne, arrayTwo));
```

## Usage Example

```js
var keys = require('matchkeys');

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
// => keywords: ['gruntplugin', 'handlebars-helper', 'assemble']
//
var pkgTwo = JSON.parse(fs.readFileSync('package.json', 'utf8'));
// => keywords: ['foo', 'bar', 'assemble']

console.log(keys.match(pkg, pkgTwo));
// => ['assemble']
```


## Methods

### matchPkgs

Match an array of keywords to multiple arrays of keywords returning the `package.json` object for each match.

```js
keys.matchPkgs(Array, ArrayofObjects));
```

Parameters:

* `Array`: The `package.json` containing the `keywords` property to match against.
* `Array`: An array of `package.json` files, each containing an array of keywords.

_Note that you do not need to specify the `keywords` property, just the object containing the keywords property_.


#### example

Given the following:

```js
var keys = require('matchkeys');

var one = ['apple', 'lime', 'watermelon']
var two = [
  {
    name: 'citrus',
    keywords: ['lemon', 'lime', 'orange']
  },
  {
    name: 'grains',
    keywords: ['wheat', 'oats', 'barley']
  },
  {
    name: 'fruit',
    keywords: ['apple', 'peach', 'strawberry']
  }
];

keys.matchPkgs(one, two));
```

Returns:

```js
[
  {
    name: 'citrus',
    keywords: ['lemon', 'lime', 'orange']
  },
  {
    name: 'fruit',
    keywords: ['apple', 'peach', 'strawberry']
  }
]
```


### isMatch

Same as `matchPkgs` but returns `true` or `false`.

```js
var keys = require('matchkeys');
keys.isMatch(Array, ArrayofObjects));
```

Parameters:

* `Array`: The keywords to match against.
* `Array`: Array of objects (`package.json` files), each containing an array of keywords.

Using the same example as `keys.matchPkgs`, this would return:

```js
[false, false, true]
```


### filter

Returns a list of keywords matching the given minimatch pattern.

```js
var keys = require('matchkeys');
keys.filter('*')
```


### resolve

```js
keys.resolve('*')
// specify a different config object besides package.json
keys.resolve('*', config))
```

Returns the resolved paths to any npm modules that:

1. Are listed in the `dependencies` of the project's `package.json`, and
1. A keyword is defined matching the name of the module


### resolveDev

```js
keys.resolveDev('*')
// specify a different config object besides package.json
keys.resolveDev('*', config))
```

Returns the resolved paths to any npm modules that:

1. Are listed in the `devDependencies` of the project's `package.json`, and
1. A keyword is defined matching the name of the module


### resolveDev

```js
keys.resolveAll('*')
// specify a different config object besides package.json
keys.resolveAll('*', config))
```

Returns the resolved paths to any npm modules that:

1. Are listed in the `dependencies` or `devDependencies` of the project's `package.json`, and
1. A keyword is defined matching the name of the module


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## Related projects

+ [helpers/resolve-dep](http://github.com/helpers/resolve-dep)
+ [assemble/assemble](https://assemble.io)
+ [assemble/handlebars-helpers](http://gruntjs.com/assemble/handlebars-helpers)
+ [assemble/assemble-less](http://gruntjs.com/assemble/assemble-less)


## Author

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](http://gruntjs.com/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Licensed under the MIT license.
