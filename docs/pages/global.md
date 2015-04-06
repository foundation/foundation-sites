---
title: Global Styles
description: Our global CSS includes helpful resets to ensure consistent styling across browsers.
sass: scss/_global.scss
---

## Global Font Size

The default font size is set to 100% of the browser style sheet, usually 16 pixels. This ensures compatibility with browser-based text zoom or user-set defaults.

Since the typical default browser font size is 16 pixels, that makes the calculation for grid size. If you want your base font size to be different and not have it affect the grid breakpoints, set `$rem-base` to `$global-font-size` and make sure `$global-font-size` is a pixel value.

## Namespacing

The data attributes used to initialize Foundation plugins can be globally namespaced by setting the `$global-namespace` Sass variable.

```html
<!-- $global-namespace: false -->
<div data-reveal></div>

<!-- $global-namespace: 'zf' -->
<div data-zf-reveal></div>
```