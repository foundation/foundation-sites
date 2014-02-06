# Examples

> Some basic usage examples to help you get started.

Based on the dependencies of this project, the following:

```js
console.log(require('resolve-dep').load('*'));
```
returns:

```json
[
  "node_modules/lodash/dist/lodash.js",
  "node_modules/matchdep/lib/matchdep.js",
  "node_modules/minimatch/minimatch.js",
  "node_modules/chalk/chalk.js"
]
```


## Custom config

```js
// Load devDependencies (with config string indicating file to be required)
require('resolve-dep').load('*', './package.json');

// Load all dependencies (with explicit config provided)
require('resolve-dep').load('*', require('./package.json'));
```



## Templates
### Basic template expansion

```js
// Unfortunately this config doesn't work. Grunt stringifies the returned array.
// grunt.initConfig({
//   foo: {
//     // Used  resolved paths to dependencies
//     src: ['<%= _.load("*") %>'],
//     // Results in (based on this repo):
//     //   node_modules/lodash/dist/lodash.js,
//     //   node_modules/matchdep/lib/matchdep.js

//     dest: 'dist/'
//   }
// });
```


### Reusable templates
Filepaths defined using templates can easily be referenced elsewhere in the config:

```js
helpers: {
  one: '<%= _.loadDev("one") %>',
  two: '<%= _.loadDev("two") %>'
},

foo: {
  src: ['<%= meta.one %>', '<%= meta.two %>', '!**/three']
  dest: 'dist/'
},
```


### Customize mixin names

```js
module.exports = function (grunt) {
  grunt.util._.mixin({
    foo: function(pattern, config) {
      return require('resolve-dep').load(pattern, config);
    },
    bar: function(config) {
      return require('resolve-dep').loadDev('pattern', config);
    },
    baz: function(pattern, config) {
      return require('resolve-dep').loadAll(pattern, config);
    }
  });

  grunt.initConfig({
    foo: {
      src: ['<%= _.baz("my-module") %>'],
      dest: 'dist/'
    }
  });
  grunt.registerTask(...);
};
```


## Assemble

Example of (enthusiastic ;-) usage with [Assemble](http://assemble.io):

```js
assemble: {
  options: {
    // Load prettify helper from node_modules.
    helpers: ['<%= _.load("my-helper") %>'],
    partials: ['<%= _.load("my-partial") %>'],
    data: ['<%= _.load("my-data") %>']
  },
  site: {
    src: ['src/*.hbs'],
    dest: 'dist/'
  }
}
```

Have suggestions for improving the examples? Please submit a pull request or [create an issue](http://gruntjs.com/jonschlinkert/resolve-dep/issues) to let me know! Thanks!