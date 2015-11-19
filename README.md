# [Foundation for Sites](http://foundation.zurb.com) (Public Beta)

This is the in-development version of Foundation for Sites 6.0. 

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/zurb/foundation-sites-6?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Requirements

Requires NodeJS to be installed on your machine. Works with 0.10, 0.12, and 4.1! **Note that parts of our build process will break with NPM 3, due to the changes in how packages are installed.**

The Sass is compiled using libsass, which requires the GCC to be installed on your machine. Windows users can install it through [MinGW](http://www.mingw.org/), and Mac users can install it through the [Xcode Command-line Tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/).

## Setup

To get going with Foundation you can:

  * [Download the latest release](http://foundation.zurb.com/develop/download.html)
  * [Install with Bower](http://bower.io): `bower install foundation`
  * [Install with npm](http://npmjs.com): `npm install foundation-sites`

## Documentation

Foundation uses [Assemble.io](http://assemble.io) and [Grunt](http://gruntjs.com/) to generate its [documentation pages](http://foundation.zurb.com/docs). Documentation can also be run from your local computer:

### View documentation locally

You'll want to clone the Foundation repo first and install all the dependencies. You can do this using the following commands:

```
git clone git@github.com:zurb/foundation.git
cd foundation
npm install -g grunt-cli bower
npm install
bower install
bundle install
```

Then just run `grunt build` and the documentation will be compiled:

```
foundation/
├── dist/
│   └── ...
├────── docs/
│       └── ...
```

Copyright (c) 2015 ZURB, inc.
