---
title: ZF Grid
description: A fully reworked new grid system in v6.4 which has all the variety inbuilt in the form of multiple grid types which includes margin grid, padding grid, frame grid, block grid and vertical grid.
sass: scss/grid/_zf-grid.scss
---

The flex grid works very similarly to the standard float grid, but includes a number of useful features only possible with flexbox, like horizontal and vertical alignment, automatic sizing, and easier source ordering.

---

## Browser support

The flex grid is only supported in Chrome, Firefox, Safari 6+, IE10+, iOS 7+, and Android 4.4+. Flexbox is supported in Android 2, but not reliably enough for use with this grid. ([View flexbox browser support.](http://caniuse.com/#feat=flexbox)) We recommend only using the flex grid on projects that can live with purely cutting-edge browser support.

---

## Importing

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with flexbox mode enabled.

```scss
@import 'foundation';

@include zf-grid;
@include zf-grid-classes;
```
---

## Basics

The structure of the new grid uses `.grid` (formerly `.row`) and `.cell` (formerly `.column`). This structure makes it a lot clearer when working with vertical grids.

```html_example
<div class="grid padding-gutters">
  <div class="cell">full width cell</div>
  <div class="cell">full width cell</div>
</div>
<div class="grid padding-gutters">
  <div class="small-6 cell">6 cells</div>
  <div class="small-6 cell">6 cells</div>
</div>
<div class="grid padding-gutters">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
```

---

## Auto Sizing

If the class `.[size]-auto` is added to the cell, it will take up the remaining space.

```html_example
<div class="grid padding-gutters">
  <div class="small-4 cell">4 cells</div>
  <div class="auto cell">Whatever's left!</div>
</div>
```

---

Multiple expanding cells will share the leftover space equally.

```html_example
<div class="grid">
  <div class="small-4 cell">4 cells</div>
  <div class="auto cell">Whatever's left!</div>
  <div class="auto cell">Whatever's left!</div>
</div>
```

---

A cell can also be made to *shrink*, by adding the `.[size]-shrink` class. This means it will only take up the space its contents need.

```html_example
<div class="grid">
  <div class="shrink cell">Shrink!</div>
  <div class="auto cell">Expand!</div>
</div>
```

---

## Responsive Adjustments

To switch back to the expand behavior from a percentage or shrink behavior, use the classes `.[size]-auto` or `.[size]-shrink`. In the below example, the cells stack on small screens, and become even-width on large screens.

```html_example
<div class="grid">
  <div class="large-auto cell">One</div>
  <div class="large-auto cell">Two</div>
  <div class="large-auto cell">Three</div>
  <div class="large-auto cell">Four</div>
  <div class="large-auto cell">Five</div>
  <div class="large-auto cell">Six</div>
</div>
```

---

### Automatic Stacking

We have a few shorthand classes for the above behavior. Use the `.[size]-auto` or `.[size]-shrink` classes to stack all cells in the grid by default, and then unstack them on a larger screen size, making each one equal-width.

```html_example
<div class="grid medium-grid-auto">
  <div class="cell">One</div>
  <div class="cell">Two</div>
  <div class="cell">Three</div>
  <div class="cell">Four</div>
  <div class="cell">Five</div>
  <div class="cell">Six</div>
</div>
<div class="grid medium-grid-shrink">
  <div class="cell">One</div>
  <div class="cell">Two</div>
  <div class="cell">Three</div>
  <div class="cell">Four</div>
  <div class="cell">Five</div>
  <div class="cell">Six</div>
</div>
```

---

## Collapse/Uncollapse Cells

The `.grid-collapse` class lets you remove cell gutters.

There are times when you won't want each media query to be collapsed or uncollapsed. In this case, use the media query size you want and collapse or uncollapse and add that to your row element. Example shows no gutter at small media size and then adds the gutter to cells at medium.

```html
<div class="grid small-grid-collapse medium-grid-uncollapse">
  <div class="small-6 cell">
    Removes gutter at small media query and adds at medium.
  </div>
  <div class="small-6 cell">
    Removes gutter at small media query and adds at medium.
  </div>
</div>
```

<p class="lead">Scale the browser down to a medium size to see the difference.</p>

<div class="grid medium-grid-uncollapse large-grid-collapse">
  <div class="small-6 cell">
    <div class="callout secondary">
      <p class="show-for-small-only">On a small screen, I have gutters!</p>
      <p class="show-for-medium-only">On a medium screen, I have gutters!</p>
      <p class="show-for-large">On a large screen, I have no gutters!</p>
    </div>
  </div>
  <div class="small-6 cell">
    <div class="callout secondary">
      <p class="show-for-small-only">On a small screen, I have gutters!</p>
      <p class="show-for-medium-only">On a medium screen, I have gutters!</p>
      <p class="show-for-large">On a large screen, I have no gutters!</p>
    </div>
  </div>
</div>

---

## Offsets

Offsets work by applying `margin-left` (or `margin-top` to a vertical grid) to a grid.

```html_example
<div class="grid">
  <div class="small-4 large-offset-2 cell">Offset 2 on large</div>
  <div class="small-4 cell">4 cells</div>
</div>
```

---

## Source Ordering

Flexbox supports source ordering, making it easy to rearrange columns on different screen sizes without weird relative positioning tricks.

The CSS property is easy enough to remember.

```scss
.element {
  order: 1;
}
```

Cells within a grid will be sorted by their `order` property. Lower numbers are placed first. If multiple cells have the same number, they're sorted in the order they appear in the HTML.

We have a set of classes that make it easy to setup source ordering in your HTML. They also come in responsive flavors, allowing you to reorder a grid on different screen sizes.

```html_example
<div class="grid">
  <div class="cell small-order-2 medium-order-1">
    This cell will come second on small, and first on medium and larger.
  </div>
  <div class="cell small-order-1 medium-order-2">
    This cell will come first on small, and second on medium and larger.
  </div>
</div>
```

---
