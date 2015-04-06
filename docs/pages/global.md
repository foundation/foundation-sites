---
title: Global Styles
description: Our global CSS includes helpful resets to ensure consistent styling across browsers.
sass: scss/_global.scss
---

## Font Sizing

The default font size is set to 100% of the browser style sheet, usually 16 pixels. This ensures compatibility with browser-based text zoom or user-set defaults.

Since the typical default browser font size is 16 pixels, that makes the calculation for grid size. If you want your base font size to be different and not have it affect the grid breakpoints, set `$rem-base` to `$global-font-size` and make sure `$global-font-size` is a pixel value.

---

## Colors

All interactive elements in Foundation, such as links and buttons, use the same color. The default shade of blue you see all over Foundation comes from the `$primary-color` Sass variable.

Many components can also be colored with four other colors: secondary, alert, success, and warning. Use these colors to give more context to UI elements and actions.

```html_example
<button class="button">Primary Action</button>
<button class="secondary button">Secondary Action</button>
```

```html_example
<div class="success callout">
  <p>Created a new folder.</p>
</div>
<div class="alert callout">
  <p>Error fetching stick.</p>
</div>
```

---

## Namespacing

The data attributes used to initialize Foundation plugins can be globally namespaced by setting the `$global-namespace` Sass variable.

```html
<!-- $global-namespace: false -->
<div data-reveal></div>

<!-- $global-namespace: 'zf' -->
<div data-zf-reveal></div>
```