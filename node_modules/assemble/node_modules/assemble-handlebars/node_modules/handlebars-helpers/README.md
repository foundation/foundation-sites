# handlebars-helpers [![NPM version](https://badge.fury.io/js/handlebars-helpers.png)](http://badge.fury.io/js/handlebars-helpers)  [![Build Status](https://travis-ci.org/assemble/handlebars-helpers.png)](https://travis-ci.org/assemble/handlebars-helpers)

> 121 Handlebars helpers in 19 categories. Helpers can be used with [Assemble](https://github.com/assemble/assemble), YUI, Ghost or any Handlebars project. 

### [Visit the live docs →](http://assemble.io/helpers/)

## Quickstart
```shell
npm i handlebars-helpers --save
```

Use within your application with the following line of JavaScript:

```js
var helpers = require('handlebars-helpers');
```

Now your Handlebars instance will have access to the helpers.


#### Features unique to this project

Some helpers offer useful functionality that is unique to this project, such as:

* File globbing using [minimatch][] patterns.
* Access to [assemble](https://github.com/assemble/assemble) options.
* Ability to render either markdown or HTML conditionally based on the file extension of the generated file.

Lots more...


## Overview
### [Visit the docs →]([assemble](http://assemble.io/docs/helpers/index.html)

[Handlebars.js](https://github.com/wycats/handlebars.js) is currently the default template library for [assemble][]. By default, [Handlebars.js](http://handlebarsjs.com/) ships with some built-in helpers, such as `{{#each}}`, `{{#if}}` and `{{#unless}}`. Here is how helpers work:

* A Handlebars helper call is a simple identifier, followed by zero or more parameters (separated by space).
* Each parameter is a Handlebars expression.
* Handlebars helpers can be accessed from any context in a template.


### Special "Assemble" features

Some helpers feature enhancements that are specifically intended for use with [Assemble][assemble], the static site generator built on Grunt.js. Here are some highlights:

* File globbing.
* Access to [assemble](http://assemble.io/docs/Options.html) options.
* Some helpers will render either markdown or HTML based on the file extension of the generated file.


## Contributing

### Undocumented Helpers
We can always use your help documenting helpers. As of Friday, January 17, 2014, **37 of 121 helpers** require documentation:

* `{{arrayify}}`
* `{{count}}`
* `{{css}}`
* `{{decodeURI}}`
* `{{eachIndexPlusOne}}`
* `{{ellipsis}}`
* `{{encodeURI}}`
* `{{expandMapping}}`
* `{{fileSize}}`
* `{{filter}}`
* `{{forEach}}`
* `{{formatDate}}`
* `{{globRaw}}`
* `{{globRawWithContext}}`
* `{{globWithContext}}`
* `{{highlight}}`
* `{{i18n}}`
* `{{ifAny}}`
* `{{if_eq}}`
* `{{if_lt}}`
* `{{if_lteq}}`
* `{{inspect}}`
* `{{iterate}}`
* `{{joinAny}}`
* `{{js}}`
* `{{napCss}}`
* `{{napJs}}`
* `{{prop}}`
* `{{random}}`
* `{{replace}}`
* `{{safeString}}`
* `{{startsWith}}`
* `{{stringify}}`
* `{{stripQuerystring}}`
* `{{urlparse}}`
* `{{urlresolve}}`
* `{{value}}`

### Helpers that need tests
We can always use your help writing tests for helpers. As of Friday, January 17, 2014, **48 of 121 helpers** require tests:

* `{{arrayify}}`
* `{{block}}`
* `{{content}}`
* `{{count}}`
* `{{css}}`
* `{{debug}}`
* `{{decodeURI}}`
* `{{eachProperty}}`
* `{{encodeURI}}`
* `{{expandJSON}}`
* `{{expandMapping}}`
* `{{expandYAML}}`
* `{{extend}}`
* `{{forEach}}`
* `{{globRaw}}`
* `{{globRawWithContext}}`
* `{{globWithContext}}`
* `{{highlight}}`
* `{{ifAny}}`
* `{{if_eq}}`
* `{{if_gt}}`
* `{{if_gteq}}`
* `{{if_lt}}`
* `{{if_lteq}}`
* `{{inspect}}`
* `{{iterate}}`
* `{{joinAny}}`
* `{{js}}`
* `{{log}}`
* `{{napCss}}`
* `{{napJs}}`
* `{{noop}}`
* `{{ol}}`
* `{{parseJSON}}`
* `{{prop}}`
* `{{random}}`
* `{{replace}}`
* `{{safeString}}`
* `{{stringify}}`
* `{{stripQuerystring}}`
* `{{ul}}`
* `{{unless_eq}}`
* `{{unless_gt}}`
* `{{unless_gteq}}`
* `{{unless_lt}}`
* `{{unless_lteq}}`
* `{{urlparse}}`
* `{{value}}`

### Developing Helpers

#### Custom Helpers
When it comes to adding custom helpers, [Handlebars](http://handlebarsjs.com/) really excels over other templating libraries. Simply register your function into Handlebars with the `Handlebars.registerHelper` method, and that helper will be available to any template you compile afterwards.

Additionally, Handlebars allows two different kinds of helpers:

* **Expression helpers** are basically regular functions that take the name of the helper and the helper function as arguments. Once an expression helper is registered, it can be called anywhere in your templates, then Handlebars takes the expression's return value and writes it into the template.
* **Block helpers** There are a few block helpers included by default with Handlebars, `{{#each}}`, `{{#if}}` and `{{#unless}}`. Custom block helpers are registered the same way as exptression helpers, but the difference is that Handlebars will pass the contents of the block compiled into a function to the helper.


### Contributing New Helpers
> Want to contribute a new helper? **Awesome!** Please follow these steps before submitting a pull request with your helper:

* **Search existing helpers** to see if there is one that already does what your helper does. If they are similar, but different, please explain how they differ.
* **Use camelCase** for the helper's name. You'll see a few helpers in the lib that use underscores, these are from another library (and are appropriately credited). All other helpers use camelcase.
* [**document the helper**]() so that developers don't need to jump through hoops to figure out how to use it.

Please remember to add some kind of attribution for yourself in this format: `@author: Your Name <github address>`, example:

```js
/**
 * {{newhelper}}
 * Description of what the helper does
 * @author: Mike Griffin <https://github.com/BrewDawg>
 */
```



## Release History

 * 2013-09-03   v0.3.3   Add fileSize helper. Add startsWith helper.
 * 2013-08-20   v0.3.2   Add glob helper.
 * 2013-07-30   v0.3.0   The project has been refactored, cleaned up, and full documentataion has bee put up at http://assemble.io
 * 2013-05-11   v0.2.4   Adding object globbing utility functions to be used in helpers later.
 * 2013-05-11   v0.2.3   File globbing added to some helpers. Including md and some file helpers.
 * 2013-05-07   v0.2.0   A bunch of new tests for markdown and special helpers. Refactored most of the rest of the helpers to separate functions from Handlebars registration.
 * 2013-05-02   v0.1.32   Updated utils and a number of helpers, including value, property, and stringify.
 * 2013-04-21   v0.1.31   Fixing relative helper
 * 2013-04-20   v0.1.30   Refactoring helpers-collection module to separate the functions from the Handlebars helper registration process.
 * 2013-04-16   v0.1.25   Adding defineSection and renderSection helpers to try to get sections populated in a layout from the page.
 * 2013-04-07   v0.1.21   Add markdown helpers back, add more tests.
 * 2013-04-06   v0.1.20   Generalized helpers structure, externalized utilities.
 * 2013-04-05   v0.1.11   New authors and gist helpers, general cleanup and new tests.
 * 2013-04-04   v0.1.10   Externalized utility javascript from helpers.js
 * 2013-03-28   v0.1.8   Gruntfile updated with mocha tests for 71 helpers, bug fixes.
 * 2013-03-18   v0.1.7   New path helper "relative", for resolving relative path from one absolute path to another.
 * 2013-03-16   v0.1.3   New helpers, "formatPhoneNumber" and "eachProperty"
 * 2013-03-15   v0.1.2   Update README.md with documentation, examples.
 * 2013-03-06   v0.1.0   First commit.
 

## Credit
> Many of these helpers come from the following repos:

Thank you Dan Harper and Elving Rodriguez. Your hard work on many of these helpers is appreciated!

* [Handlebars Helpers, by Dan Harper](http://github.com/danharper)
* [Swag v0.2.1, by Elving Rodriguez](http://elving.github.com/swag/)


## Authors

**Jon Schlinkert**

+ [github.com/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github.com/doowb](https://github.com/doowb)
+ [twitter.com/doowb](http://twitter.com/doowb)

## License
Copyright (c) 2014 Assemble, contributors.
Released under the MIT license

***

_This file was generated on Friday, January 17, 2014._

[assemble]: http://assemble.io/ "Assemble: the static site generator for Node.js, Grunt.js and Yeoman."
[minimatch]: https://github.com/isaacs/minimatch "minimatch"
