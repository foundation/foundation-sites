# [Foundation for Sites](http://foundation.zurb.com) (Public Beta)

This is the in-development version of Foundation for Sites 6.0. 

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/zurb/foundation-sites-6?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Requirements

Requires NodeJS to be installed on your machine. Works with 0.10, 0.12, and 4.1! **Note that parts of our build process will break with NPM 3, due to the changes in how packages are installed.**

The Sass is compiled using libsass, which requires the GCC to be installed on your machine. Windows users can install it through [MinGW](http://www.mingw.org/), and Mac users can install it through the [Xcode Command-line Tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/).

## Setup

```bash
git clone https://github.com/zurb/foundation-sites-6.git
cd foundation-sites-6
npm install
npm start
```

## Local Testing

`npm start` will compile the documentation. For this testing period, we've created a small testbed to experiment with components. You can find the assets under the `testing/` folder. To use the testbed, run `npm run testbed` after installing the needed dependencies.

## Folder structure

- `_build/`: compiled HTML, CSS, and JavaScript. *Don't edit these files directly, as they will be overwritten!*
- `config/`: configuration files for our linters.
- `dist/`: compiled CSS and JavaScript files for the current release.
- `docs/`: documentation source.
  - `layouts/default.html`: base HTML template for every docs page.
  - `layouts/component.html`: Handlebars template for component documentation.
  - `pages/*.html`: basic documentation pages.
  - `pages/*.md`: fancy documentation pages for components, which are parsed through [Supercollider](https://github.com/gakimball/supercollider).
  - `partials/`: Handlebars partials go here.
  - `assets/`: docs-specific images, styles, and scripts go here.
- `js/`: the Foundation 5 JavaScript.
  - New components are inside this folder.
  - Old components are in `js/foundation/`.
- `scss/`: the Sass.
  - `scss/components`: new UI components go here.
  - `scss/components_old`: Foundation 5 components stay here.
  - `scss/forms`: form styles.
  - `scss/grid`: the new grid.
  - `scss/typography`: typography.
  - `scss/util`: helper functions and mixins.
  - `scss/vendor`: third-party libraries.
  - `_global.scss`: global variables and styles.
- `docs_old/`: Foundation 5 documentation.
- `spec/`: Foundation 5 unit tests.
