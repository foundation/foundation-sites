---
title: Flex Grid
description: New in Foundation 6 is a Flexbox-powered grid, which you can use instead of the traditional float grid.
sass: scss/grid/_flex-grid.scss
---

The flex grid works very similarly to the standard float grid, but includes a number of useful features only possible with flexbox, like horizontal and vertical alignment, automatic sizing, and easier source ordering.

---

## Browser support

The flex grid is only supported in Chrome, Firefox, Safari 6+, IE10+, iOS 7+, and Android 4+. Flexbox is supported in Android 2, but not reliably enough for use with this grid. ([View flexbox browser support.](http://caniuse.com/#feat=flexbox)) We recommend only using the flex grid on projects that can live with purely cutting-edge browser support.

---

## Importing

The flex grid is not enabled by default. To use the default CSS, add the export mixin for the flex grid, and remove the default grid.

```scss
@import 'foundation';

// @include foundation-grid;
@include foundation-flex-grid;
```

<div class="callout primary">
  <p>The standard grid and flex grid use the same classes, namely <code>.row</code> and <code>.column</code>, and don't play nice together. If you want to use both in the same project, we recommend using the Sass mixins for each grid, instead of the default CSS.</p>
</div>

---

## Basics

The structure of the flex grid is identical to that of the float grid. Rows use the class `.row`, and columns use the class `.column`. Basic percentage-based sizing can also be done using the same grid classes you're used to: `.small-6`, `.medium-12`, and so on.

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

## Advanced Sizing

If no sizing class is added to the column, it will simply expand to fill the leftover space. We call this an *expand behavior*.

```html_example
<div class="row">
  <div class="small-4 columns">4 columns</div>
  <div class="columns">Whatever's left!</div>
</div>
```

---

Multiple expanding columns will share the leftover space equally.

```html_example
<div class="row">
  <div class="small-4 columns">4 columns</div>
  <div class="columns">Whatever's left!</div>
  <div class="columns">Whatever's left!</div>
</div>
```

---

A column can also be made to *shrink*, by adding the `.shrink` class. This means it will only take up the horizontal space its contents need.

```html_example
<div class="row">
  <div class="shrink columns">Shrink!</div>
  <div class="columns">Expand!</div>
</div>
```

---

## Responsive Adjustments

Columns in a flex grid will not wrap if not given an explicit size&mdash;this is what allows the magical auto-sizing to work. To make columns stack on smaller screens, add the class `.small-12` manually.

To switch back to the expand behavior from a percentage or shrink behavior, use the classes `.medium-expand` or `.large-expand`. In the below example, the columns stack on small screens, and become even-width on large screens.

```html_example
<div class="row">
  <div class="small-12 large-expand columns">One</div>
  <div class="small-12 large-expand columns">Two</div>
  <div class="small-12 large-expand columns">Three</div>
  <div class="small-12 large-expand columns">Four</div>
  <div class="small-12 large-expand columns">Five</div>
  <div class="small-12 large-expand columns">Six</div>
</div>
```

---

### Automatic Stacking

We have a few shorthand classes for the above behavior. Use the `.[size]-unstack` classes to stack all columns in the row by default, and then unstack them on a larger screen size, making each one equal-width.

```html_example
<div class="row medium-unstack">
  <div class="columns">One</div>
  <div class="columns">Two</div>
  <div class="columns">Three</div>
  <div class="columns">Four</div>
  <div class="columns">Five</div>
  <div class="columns">Six</div>
</div>
```

---

## Column Alignment

Columns in a flex grid can be aligned across the horizontal or vertical axis of their parent row.

### Horizontal Alignment

Columns can be aligned the same way you would align text in a paragraph. By default, all columns align to the left (or the right in RTL), but this can be overridden with by adding the `.align-[dir]` class to the flex row.

```html
<div class="row">
  <div class="column small-4">Aligned to</div>
  <div class="column small-4">the left</div>
</div>
<div class="row align-right">
  <div class="column small-4">Aligned to</div>
  <div class="column small-4">the right</div>
</div>
<div class="row align-center">
  <div class="column small-4">Aligned to</div>
  <div class="column small-4">the middle</div>
</div>
<div class="row align-justify">
  <div class="column small-4">Aligned to</div>
  <div class="column small-4">the edges</div>
</div>
<div class="row align-spaced">
  <div class="column small-4">Aligned to</div>
  <div class="column small-4">the space around</div>
</div>
```

<div class="docs-code-live">
  <div class="text-center">
    <div class="row">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the left</div>
    </div>
    <div class="row align-right">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the right</div>
    </div>
    <div class="row align-center">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the middle</div>
    </div>
    <div class="row align-justify">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the edges</div>
    </div>
    <div class="row align-spaced">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the space around</div>
    </div>
  </div>
</div>

You might be wondering what the difference between `.align-justify` and `.align-spaced` is. A justified grid (`justify-content: space-between`) evenly distributes the space *between* each column. The first and last columns pin to the edge of the grid.

A spaced grid (`justify-content: space-around`) evenly distributes the space *around* each column. This means there will always be space to the left of the first column, and to the right of the last column.

The horizontal alignment classes are shorthands for the `justify-content` CSS property. [Learn more about `justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).

---

### Vertical Alignment

By default, all columns in a flex grid align to the top of their parent. This behavior can be changed with another set of alignment classes. That's right, *middle alignment in CSS*!

Your options for vertical alignment are `top`, `middle`, `bottom`, and `stretch`. Note that we use the word *middle* for vertical alignment, and *center* for horizontal alignment.

Applying a vertical alignment class to the flex row will affect every column directly inside it.

```html_example
<div class="row align-middle">
  <div class="columns">I'm in the middle!</div>
  <div class="columns">I am as well, but I have so much text I take up more space! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis facere ducimus earum minus, inventore, ratione doloremque deserunt neque perspiciatis accusamus explicabo soluta, quod provident distinctio aliquam omnis? Labore, ullam possimus.</div>
</div>
```

```html_example
<div class="row align-stretch">
  <div class="columns">These colums have the same height.</div>
  <div class="columns">That's right, equal-height columns are possible with Flexbox too! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</div>
</div>
```

---

The same alignment classes can also be applied to individual columns.

```html_example
<div class="row">
  <div class="column align-bottom">Align bottom</div>
  <div class="column align-middle">Align middle</div>
  <div class="column align-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</div>
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

Columns within a row will be sorted by their `order` property. Lower numbers are placed first. If multiple columns have the same number, they're sorted in the order they appear in the HTML.

We have a set of classes that make it easy to setup source ordering in your HTML. They also come in responsive flavors, allowing you to reorder a grid on different screen sizes.

```html_example
<div class="row">
  <div class="column order-1 medium-order-2">
    This column will come first on small, and second on medium and larger.
  </div>
  <div class="column order-2 medium-order-1">
    This column will come second on small, and first on medium and larger.
  </div>
</div>
```
