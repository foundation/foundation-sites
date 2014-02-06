# Node Asset Packager

(nap) Node Asset Packager helps compile, manage & package stylesheets, client-side javascript and javascript templates for node.js.

## Example

### 1. Declare asset packages

````javascript
global.nap = require('nap');

nap({
  assets: {
    js: {
      backbone: [
        '/app/coffeescripts/models/**/*',
        '/app/coffeescripts/views/**/*',
        '/app/coffeescripts/routers/**/*'
      ]
    },
    css: {
      all: [
        '/public/stylesheets/blueprint.css',
        '/app/stylesheets/**/*'
      ]
    },
    jst: {
      templates: [
        '/app/templates/index.jade',
        '/app/templates/footer.jade'
      ]
    }
  }
});
````

### 2. Include packages in your views by calling one of nap's helpers. (example in [jade](https://github.com/visionmedia/jade))

````jade
!!!
html
  head
    title= title
    != nap.css('all')
  body
    != body
    #scripts
      != nap.jst('templates')
      != nap.js('backbone')
````

### 3. Concatenate & minify once for production

````javascript
nap({
  mode: 'production',
  assets: {
    js: //...
    css: //...
    jst: //...
  }
});

nap.package();
````

Some express.js based examples can be found in the [examples folder](https://github.com/craigspaeth/nap/tree/master/examples).

## Installation

`npm install nap`

**NOTE: You must include individual pre-processors in your package.json to use them.**

## Usage

To make things easy nap assumes you have a */public* folder to serve static assets (like an Express.js public folder) so that nap can generate & reference assets inside */public/assets*.

Simply pass a set of options to the main `nap` function to configure your asset packages. Then use one of nap's helpers (`nap.js('package-name')`, `nap.css('package-name')`, `nap.jst('package-name')`) to output `<script>` and `<style> ` tags into your server-side templates.

## Options

#### assets
The assets object containing all of your package declarations
#### appDir
**defaults to process.cwd()**
The base directory to resolve files from.
#### publicDir
**defaults to public`**
Your public directory where you serve static content.
This is relative to process.cwd() unless you specify an absolute path.
#### mode
**defaults to 'production' on NODE_ENV=staging and NODE_ENV=production, otherwise 'development'**
The mode you want nap to be in 'production' or 'development'
#### cdnUrl
If you are using a CDN you can pass the url root of where your asset packages are stored. The nap helpers will point there instead of the local */public/assets* dir in 'production' mode.
#### gzip
**defaults to false**
Gzips .jgz and .cgz asset packages. The nap helpers will point to these gzipped packages in production mode unless you pass false as a second argument `nap.js('package-name', false)`
#### minify
**defaults to true**
Opt out of minifying your code when calling `package`.

````javascript
nap({
  appDir: process.cwd()
  publicDir: 'public',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  cdnUrl: 'http://s3.amazonaws.com/my-bucket/assets/',
  gzip: true,
  assets: {
    js: {
      backbone: [
        '/app/coffeescripts/models/**/*',
        '/app/coffeescripts/views/**/*',
        '/app/coffeescripts/routers/**/*'
      ]
    },
    css: {
      all: [
        '/public/stylesheets/blueprint.css',
        '/app/stylesheets/**/*'
      ]
    },
    jst: {
      templates: [
        '/app/templates/index.jade',
        '/app/templates/footer.jade'
      ]
    }
  }
});
````

## JS & CSS Pre-processors

Nap will automatically precompile any javascript and css pre-processors based on the file extension.

**NOTE: You must include individual pre-processors in your package.json to use them.**

Nap currently only supports the following pre-processors by default. But please feel free to contribute more.

  * [Coffeescript](http://jashkenas.github.com/coffee-script/) (.coffee)
  * [Stylus](https://github.com/LearnBoost/stylus) (.styl)
  * [Less](https://github.com/cloudhead/less.git) (.less)

### Adding your own preprocessors

You can add your own preprocessors to nap by extending `nap.preprocessors`, with a fileExtension: preprocessFunction pair.

e.g.

````javascript
var nap = require('nap')
  , coffee = require('coffee-script');
nap.preprocessors['.coffee'] = function(contents) { return coffee.compile(contents) };
````

## Embedding fonts & images in stylesheets

To embed fonts and images simply suffix your stylesheet with `_embed`, e.g. `fonts_embed.styl`. In "production" mode nap will read files inside `url()` declarations from your public directory and embed it in your stylesheet using [data-uri](http://css-tricks.com/data-uris/).

## Client-side Javascript Templating (JSTs)

*jst* packages will run the appropriate template parser based off the file extension. Nap will then namespace your client-side templates into a global `JST['file/path']` function, much like [Jammit](http://documentcloud.github.com/jammit/#jst). The namespace is the directory following *templates* without the file extension.

e.g. The template *app/templates/artwork/detail.jade* will be parsed using jade and can be rendered on the client-side by calling `JST['artwork/detail']({ title: 'Mona Lisa' })`

Nap currently only supports the following template parsers by default. But please feel free to contribute more.

 * [Jade](https://github.com/visionmedia/jade) (.jade)
 * [Mustache (using Hogan.js)](https://github.com/twitter/hogan.js.git) (.mustache)

### Adding your own template parsers

You can add your own template parsers to nap by extending `nap.templateParsers`, with a fileExtension: templateParserFunction pair.

e.g.

````javascript
var nap = require('nap')
  , jade = require('jade');
nap.templateParsers['.jade'] = function(contents) {
  return jade.compileClient(contents, { compileDebug: true });
};
````

## Nap Modes

Nap has two modes 'development' and 'production'.

### Development

In development, nap will run any pre-processors and output a bunch of individual `<script>` and `<link>` tags using one of it's helpers (`nap.js('package-name')`, `nap.css('package-name')`, `nap.jst('package-name')`). Each time these helpers are called they will re-compile these files, resulting in seamless asset compilation on page refresh.

### Production

In production mode calling `nap.package()` will concatenate all of the files, minify, and finally output the result to a single package file (e.g. *public/assets/package-name.js-<fingerprint>*). Nap will also append a fingerprint for cache busting. See the Rails asset pipeline [1.2 What is Fingerprinting and Why Should I Care?](http://guides.rubyonrails.org/asset_pipeline.html) for details on how this works.

`nap.package(function(){})` can also take a callback if you need to do something after assets have finished packaging.

Calling one of nap's helpers in production mode will simply return a `<script>` or `<link>` tag pointing to the concatenated package file.

You may also gzip, embed images & fonts, and point to a CDN. See **options** above for more info.

## Middleware

Use nap as middleware to quickly serve files in memory rather than writing to disk. (In 'development' mode only)

````javascript
var nap = require('nap')
  , express = require("express")
  , app = express.createServer();

app.use(nap.middleware);
````

## Tests

Nap uses [Mocha](https://github.com/visionmedia/mocha) for testing, simply run `mocha`.

````
mocha
````

## License

(The MIT License)

Copyright (c) Craig Spaeth <craigspaeth@gmail.com>, Art.sy, 2011-2013

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
