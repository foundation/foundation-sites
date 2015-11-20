# [Foundation for Sites](http://foundation.zurb.com) (v6.0)

Foundation is the most advanced responsive front-end framework in the world. Quickly go from prototype to production, building sites or apps that work on any kind of device with Foundation. Includes layout constructs, like a fully customizable, responsive grid, commonly used JavaScript plugins, and full A11Y support.

## Usage in Meteor

### 1. Add the package

```
meteor add zurb:foundation-sites
```

### 2. In your main .scss file (in your app):

Import foundation:

```
@import '{zurb:foundation-sites}/scss/foundation';
```

Each component has an export mixin which prints out the CSS for that component. If you're cool with having everything, you just need one line of code:

```
@include foundation-everything;
```

Or you can comment out the components you don't need:

```
@include foundation-global-styles;
@include foundation-grid;
@include foundation-typography;
@include foundation-button;
@include foundation-forms;
@include foundation-visibility-classes;
@include foundation-float-classes;
@include foundation-accordion;
@include foundation-accordion-menu;
@include foundation-badge;
@include foundation-breadcrumbs;
@include foundation-button-group;
@include foundation-callout;
@include foundation-close-button;
@include foundation-drilldown-menu;
@include foundation-dropdown;
@include foundation-dropdown-menu;
@include foundation-flex-video;
@include foundation-label;
@include foundation-media-object;
@include foundation-menu;
@include foundation-off-canvas;
@include foundation-orbit;
@include foundation-pagination;
@include foundation-progress-bar;
@include foundation-slider;
@include foundation-sticky;
@include foundation-reveal;
@include foundation-switch;
@include foundation-table;
@include foundation-tabs;
@include foundation-thumbnail;
@include foundation-title-bar;
@include foundation-tooltip;
@include foundation-top-bar;
```

### 3. Overwrite Foundation settings

If you want you can copy `_settings.scss` file into your project. You can change settings and import it in your main .scss file (in your app):

```
@import 'settings'; // example when the _settings.scss file is in the same folder as your main .scss file
@import '{zurb:foundation-sites}/scss/foundation';

@include foundation-everything; // or individual ones

```

**Important:** In the _settings.scss (the copied one in your app) you need to replace `@import 'util/util'` with `@import '{zurb:foundation-sites}/scss/util/util'`
