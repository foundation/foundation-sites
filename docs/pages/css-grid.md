---
title: CSS-Grid Layout Grid
description: New in Foundation 6.4 is a CSS-grid layout powered grid, which you can use instead of the float and flex based grids.
sass: scss/grid/_css-grid.scss
---

The CSS Grid Layout based grid is intended to give an "easy onboarding" way to begin experimenting with CSS Grid Layout. CSS Grid Layout provides advanced grid tooling beyond the original capabilities of the Foundation grid, but they can be a lot to get your head around. To provide a gentler onboarding, we've recreated the Foundation Grid using CSS Grid Layout so you can use your existing skills and sites to begin experimentation.

---

## Browser support

CSS Grid Layout is only supported in Chrome, Firefox, Safari 10.1+, IE11+, and iOS 10.3+. As of release time it is not supported in any non-chrome android browsers. ([View css grid browser support.](http://caniuse.com/#feat=css-grid)) We recommend only using CSS Grid at this time for experimental or internal projects where browser support is not a concern.

---

## Importing

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with css grid mode enabled.

If you're using the Sass version of Foundation, you can enable a framework-wide css-grid mode, which will enable the css-grid based mode for the grid, as well as flexbox mode for other components. [Learn more about enabling flexbox mode.](flexbox.html#enabling-flexbox-mode)

```scss
@import 'foundation';

// @include foundation-grid;
@include foundation-flex-classes;
@include foundation-css-grid;
```

<div class="primary callout">
  <p>The flex grid uses the same settings variables as the float grid to adjust gutter size, column count, and so on. Refer to the <a href="grid.html#sass-variables">Sass variable reference</a> for the default grid to see how the flex grid can be customized.</p>
</div>

<div class="warning callout">
  <p>The standard grid and flex grid use some of the same classes, namely <code>.row</code> and <code>.column</code>, and don't play nice together. If you want to use both in the same project, we recommend using the Sass mixins for each grid, instead of the default CSS.</p>
</div>

---

## Basics

The structure of the flex grid is identical to that of the float grid. Rows use the class `.row`, and columns use the class `.column` (or `.columns`). Basic percentage-based sizing can also be done using the same grid classes you're used to: `.small-6`, `.medium-12`, and so on.

```html_example
<div class="row">
  <div class="small-6 columns">6 columns</div>
  <div class="small-6 columns">6 columns</div>
</div>
<div class="row">
  <div class="medium-6 large-4 columns">12/6/4 columns</div>
  <div class="medium-6 large-8 columns">12/6/8 columns</div>
</div>
```

---


## Collapse/Uncollapse Rows

The `.collapse` class lets you remove column gutters (padding).

There are times when you won't want each media query to be collapsed or uncollapsed. In this case, use the media query size you want and collapse or uncollapse and add that to your row element. Example shows no gutter at small media size and then adds the gutter to columns at medium.

The `.is-collapse-child` class removes negative margins from nested row under collapsed parent.

```html
<div class="row small-collapse medium-uncollapse">
  <div class="small-6 columns">
    Removes gutter at small media query and adds at medium.
  </div>
  <div class="small-6 columns">
    Removes gutter at small media query and adds at medium.
  </div>
</div>
```

<p class="lead">Scale the browser down to a medium size to see the difference.</p>

<div class="row medium-uncollapse large-collapse">
  <div class="small-6 columns">
    <div class="callout secondary">
      <p class="show-for-small-only">On a small screen, I have gutters!</p>
      <p class="show-for-medium-only">On a medium screen, I have gutters!</p>
      <p class="show-for-large">On a large screen, I have no gutters!</p>
    </div>
  </div>
  <div class="small-6 columns">
    <div class="callout secondary">
      <p class="show-for-small-only">On a small screen, I have gutters!</p>
      <p class="show-for-medium-only">On a medium screen, I have gutters!</p>
      <p class="show-for-large">On a large screen, I have no gutters!</p>
    </div>
  </div>
</div>

---

## Starts

CSS Grid doesn't use the concept of an "offset" in the same way that the float and flex grids do, it is more explicit. You can specify exactly the row that you want things to start on.

```html_example
<div class="row">
  <div class="small-4 large-start-3 columns">Start in column 3 on large</div>
  <div class="small-4 columns">4 columns</div>
</div>
```

---

## Block Grids

To define column widths at the row-level, instead of the individual column level, add the class `.[size]-up-[n]` to a row, where `[n]` is the number of columns to display per row, and `[size]` is the breakpoint at which to apply the effect.

<div class="primary callout">
  <p>A block grid row has the property <code>align-items: stretch</code> by default, meaning the columns in each row are equal height. To change this, change the <code>align-items</code> property of the row, or use one of the <a href="flexbox.html#vertical-alignment">vertical alignment flexbox classes</a>.</p>
</div>

```html_example
<div class="row small-up-1 medium-up-2 large-up-3">
  <div class="column">1 per row on small</div>
  <div class="column">2 per row on medium</div>
  <div class="column">3 per row on large</div>
</div>
```
