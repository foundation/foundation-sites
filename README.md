# [Foundation](http://foundation.zurb.com)

This is the supremely in-development version of Foundation for Sites 6.0.

```bash
git clone https://github.com/zurb/foundation-sites-6.git
cd foundation-sites-6
npm install
gulp
```

## Folder structure

- `dist`: compiled HTML, CSS, and JavaScript.
- `docs`: some very empty test pages.
- `docs_old`: the Foundation 5 documentation.
- `js`: the Foundation 5 JavaScript.
  - New components are inside this folder.
  - Old components are in `js/foundation`.
- `scss`: the Sass.
  - `scss/components`: new UI components go here.
  - `scss/components_old`: Foundation 5 components stay here.
  - `scss/forms`: form styles.
  - `scss/grid`: the new grid.
  - `scss/typography`: typography.
  - `scss/util`: helper functions and mixins.
  - `scss/vendor`: third-party libraries.
  - `_global.scss`: global variables and styles.
- `spec`: the Foundaion 5 unit tests.