PrettySize
==========

Helper utility to provide pretty printed file sizes (best used for logging or CLI output)

Build Status
------------

[![Build Status](https://secure.travis-ci.org/davglass/prettysize.png?branch=master)](http://travis-ci.org/davglass/prettysize)


Usage
-----

```
npm install prettysize
```

```javascript

var pretty = require('prettysize');

var str = pretty(1024);
//str = "1 kB"

var str = pretty(1024 * 1024);
//str = "1 MB"

var str = pretty(123456789);
//str = "117.7 MB"
```

It supports the following sizes:

* bytes
* kB
* MB
* GB
* TB
* PB
* EB

Arguments
---------

```javascript
pretty(123456, true, true);

/*

First arg is size
Second argument is to remove the space from the output
Third argument is to use a single character for the size.

*/


var str = pretty(1024 * 1024, true);
//str = "1MB"

var str = pretty(123456789, true, true);
//str = "117.7M"

var str = pretty(123456789, false, true);
//str = "117.7 M"

```
