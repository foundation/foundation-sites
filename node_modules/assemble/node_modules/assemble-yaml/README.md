# assemble-yaml [![NPM version](https://badge.fury.io/js/assemble-yaml.png)](http://badge.fury.io/js/assemble-yaml)  [![Build Status](https://travis-ci.org/assemble/assemble-yaml.png)](https://travis-ci.org/assemble/assemble-yaml)

> Utility library for working with YAML front matter. Works with or without Assemble.

Visit [Assemble's documentation](http://assemble.io) for many more examples and pointers on getting started.

## Getting Started
```shell
npm install assemble-yaml --save
```

and use it as follows:

```js
var yfm = require('assemble-yaml');
```


## Methods
#### extract
Extract YAML front matter and content from files.

```js
var raw = yfm.extract("./file.hbs", opts);
```
**Parameters**:

* `String`: The file to read.
* `Object`: The options object to pass to [js-yaml](https://github.com/nodeca/js-yaml)

**Returns**:

Object with three properties

```js
{
 "context": {}         // Object. YAML front matter returned as a JSON object.
 "content": ""         // String. File content, stripped of YAML front matter
 "originalContent": "" // String. Both content and YAML front matter.
}
```

#### context

Return YAML front matter as a JSON object.

```js
var data = yfm.extract("./file.hbs").context;
```

Alias:

```js
var data = yfm.extractJSON("./file.hbs");
```

#### content

Return the content of a file, with YAML front matter removed.

```js
var content = yfm.extract("./file.hbs").content;
```

Alias:

```js
var data = yfm.stripYFM("./file.hbs");
```



## Release History

 * 2013-09-27   v0.1.3   Adds extractJSON and stripYFM convenience methods. Add regex to strip extraneous newlines left over after YFM is removed from a file.
 * 2013-09-22   v0.1.2   Adds grunt-readme and grunt-pkg-sync
 * 2013-08-11   v0.1.0   Initial setup - Migrated from main Assemble repo
 

## Author

+ [github.com/doowb](https://github.com/doowb)
+ [twitter.com/doowb](http://twitter.com/doowb)

## License
Copyright (c) 2013 Brian Woodward, contributors.
Released under the MIT license

***

_This file was generated on Mon Sep 02 2013 09:44:51._
