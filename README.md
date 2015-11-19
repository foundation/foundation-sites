# [Foundation for Sites](http://foundation.zurb.com) (v6.0)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/zurb/foundation-sites?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Foundation is the most advanced responsive front-end framework in the world. Quickly go from prototype to production, building sites or apps that work on any kind of device with Foundation. Includes layout constructs, like a fully customizable, responsive grid, commonly used JavaScript plugins, and full A11Y support.

## Requirements

Requires NodeJS to be installed on your machine. Works with 0.10, 0.12, and 4.1! **Note that parts of our build process will break with NPM 3, due to the changes in how packages are installed.**

The Sass is compiled using libsass, which requires the GCC to be installed on your machine. Windows users can install it through [MinGW](http://www.mingw.org/), and Mac users can install it through the [Xcode Command-line Tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/).

## Setup

To get going with Foundation you can:


  * [Install Yeti Launch](http://foundation.zurb.com/develop/yeti-launch.html): Seriously though, check it out!
  * [Install the CLI](https://www.npmjs.com/package/foundation-cli): `npm install -g foundation-cli`
  * [Download the latest release](http://foundation.zurb.com/sites/download.html)
  * [Install with Bower](http://bower.io): `bower install foundation-sites`
  * [Install with npm](http://npmjs.com): `npm install foundation-sites`
  * [Install with Atmosphere for Meteor](https://atmospherejs.com): `meteor add zurb:foundation-sites`
  * [Install with Composer](https://getcomposer.org/): `php composer.phar require zurb/foundation-sites`

## Documentation

Foundation uses [Gulp](http://gulpjs.com/) and [SuperCollider](https://www.npmjs.com/package/supercollider) to generate its [documentation pages](http://foundation.zurb.com/sites/docs). Documentation can also be run from your local computer:

### View documentation locally

You'll want to clone the Foundation repo first and install all the dependencies. You can do this using the following commands:

```
git clone git@github.com:zurb/foundation-sites.git
cd foundation-sites
npm install
```

Then just run `npm start` and the documentation will be compiled. It will also launch an instance of [BrowserSync](http://www.browsersync.io/) and open a tab in your default browser.
The file structure:

```
foundation/
├── dist/
│   └── ...
├── docs/
│   └── ...
```

Copyright (c) 2015 ZURB, inc.
