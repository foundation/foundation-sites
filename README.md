# [Foundation for Sites](http://foundation.zurb.com)

This is the supremely in-development version of Foundation for Sites 6.0.

Requires NodeJS to be installed on your machine. Works with 0.10, 0.12, and 4.1! **Note that parts of our build process will break with NPM 3, due to the changes in how packages are installed.**

```bash
git clone https://github.com/zurb/foundation-sites-6.git
cd foundation-sites-6
npm install && bower install
npm start
```

## Folder structure

- `_build/`: compiled HTML, CSS, and JavaScript. *Don't edit these files directly, as they will be overridden!*
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
