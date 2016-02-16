---
title: Global Styles
description: Our global CSS includes helpful resets to ensure consistent styling across browsers.
sass: scss/_global.scss
---

## Font Sizing

The default font size is set to 100% of the browser style sheet, usually 16 pixels. This ensures compatibility with browser-based text zoom or user-set defaults. If you're using the Sass version of Foundation, edit the `$global-font-size` variable to change the base font size. This can be a percentage value, or a pixel value.

<div class="alert callout">
  <p><code>$rem-base</code> was deprecated in version 6.1, in favor of using <code>$global-font-size</code> to define rem calculation.</p>
</div>

---

## Colors

All interactive elements in Foundation, such as links and buttons, use the same color. The default shade of blue you see all over Foundation comes from the `$primary-color` Sass variable.

Many components can also be colored with four other colors: secondary, alert, success, and warning. Use these colors to give more context to UI elements and actions.

<div class="row small-up-1 medium-up-3 large-up-5">
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-primary"></div>
      <p>Primary</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-secondary"></div>
      <p>Secondary</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-success"></div>
      <p>Success</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-warning"></div>
      <p>Warning</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-alert"></div>
      <p>Alert</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-white"></div>
      <p>White</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-light-gray"></div>
      <p>Light Gray</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-medium-gray"></div>
      <p>Medium Gray</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-dark-gray"></div>
      <p>Dark Gray</p>
    </div>
  </div>
  <div class="column">
    <div class="docs-color-block">
      <div class="docs-color-block-black"></div>
      <p>Black</p>
    </div>
  </div>
</div>

If you're using the Sass version of Foundation, it's possible to edit the default color palette, by changing the `$foundation-palette` variable in your settings file. The only required color is one named "primary". The names used in the palette will be output as CSS classes.

```scss
$foundation-palette: (
  primary: #E44347,
  mars: #D7525C,
  saturn: #E4B884,
  neptune: #5147D7,
)
```

Using the above palette, we can add the `.mars`, `.saturn`, or `.neptune` classes to buttons, labels, badges, and more.

---

To color a component, add the name of the color as a class.

```html_example
<button class="button">Primary Action</button>
<button class="secondary button">Secondary Action</button>
```

---

```html_example
<div class="success callout">
  <p>Created a new folder.</p>
</div>
<div class="alert callout">
  <p>Error fetching stick.</p>
</div>
```
