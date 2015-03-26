---
title: Flex Grid
description: New in Foundation 6 is a Flexbox-powered grid, which you can use alongside the traditional float grid.
sass: scss/grid/_flex-grid.scss
---

The flex grid works very similarly to the standard float grid, but includes a number of useful features only possible with flexbox.

## Browser support

The flex grid is [only supported](http://caniuse.com/#feat=flexbox) in Chrome, Firefox, Safari 6+, IE10+, and iOS 7+. There is a [flexbox polyfill](https://github.com/doctyper/flexie) that adds support for older browsers, but we haven't tested it with this grid, so it isn't guaranteed to work. We recommend only using the flex grid on projects that only need cutting-edge browser support.

---

## Basics

The structure of the flex grid is identical to that of the float grid. Rows use the class `.flex-row`, and columns use the class `.flex-column`. Basic percentage-based sizing can be done using the same grid classes you're used to: `.small-6`, `.medium-12`, and so on.

```html_example
<div class="flex-row">
  <div class="small-6 flex-column">6 columns</div>
  <div class="small-6 flex-column">6 columns</div>
</div>
<div class="flex-row">
  <div class="medium-6 large-4 flex-column">12/6/4 columns</div>
  <div class="medium-6 large-8 flex-column">12/6/6 columns</div>
</div>
```

---

## Advanced Sizing

If no sizing class is added to the column, it will simply expand to fill the leftover space. We call this an *expand behavior*.

```html_example
<div class="flex-row">
  <div class="small-4 flex-column">4 columns</div>
  <div class="flex-column">Whatever's left!</div>
</div>
```

---

Multiple expanding columns will share the leftover space equally.

```html_example
<div class="flex-row">
  <div class="small-4 flex-column">4 columns</div>
  <div class="flex-column">Whatever's left!</div>
  <div class="flex-column">Whatever's left!</div>
</div>
```

---

A column can also be made to *shrink*, by adding the `.shrink` class. This means it will only take up the horizontal space its contents need.

```html_example
<div class="flex-row">
  <div class="shrink flex-column">Shrink!</div>
  <div class="flex-column">Expand!</div>
</div>
```

---

## Responsive Adjustments

Columns in a flex grid will not wrap if not given an explicit size&mdash;this is what allows the magical auto-sizing to work. To make columns stack on smaller screens, add the class `.small-12` manually.

To switch back to the expand behavior from a percentage or shrink behavior, use the classes `.medium-expand` or `.large-expand`. In the below example, the columns stack on small screens, and become even-width on large screens.

```html_example
<div class="flex-row">
  <div class="small-12 large-expand flex-column">One</div>
  <div class="small-12 large-expand flex-column">Two</div>
  <div class="small-12 large-expand flex-column">Three</div>
  <div class="small-12 large-expand flex-column">Four</div>
  <div class="small-12 large-expand flex-column">Five</div>
  <div class="small-12 large-expand flex-column">Six</div>
</div>
```

---

### Automatic Stacking

We have a few shorthand classes for the above behavior. Use the `.[size]-unstack` classes to stack all columns in the row by default, and then unstack them on a larger screen size, making each one equal-width.

```html_example
<div class="flex-row medium-unstack">
  <div class="flex-column">One</div>
  <div class="flex-column">Two</div>
  <div class="flex-column">Three</div>
  <div class="flex-column">Four</div>
  <div class="flex-column">Five</div>
  <div class="flex-column">Six</div>
</div>
```

---

## Source Ordering

Flexbox supports source ordering, making it easy to rearrange columns on different screen sizes without wierd relative positioning tricks.

The CSS property is easy enough to remember.

```scss
.element {
  order: 1;
}
```

Columns within a row will be sorted by their `order` property. Lower numbers are placed first. If multiple columns have the same number, they're sorted in the order they appear in the HTML.

We have a set of classes that make it easy to setup source ordering in your HTML. They also come in responsive flavors, allowing you to reorder a grid on different screen sizes.

```html_example
<div class="flex-grid">
  <div class="flex-column order-2 medium-order-1">
    This column will come second on small, and first on medium and larger.
  </div>
  <div class="flex-column order-2 medium-order-1">
    This column will come first on small, and second on medium and larger.
  </div>
</div>
```

---

## Column Alignment

Columns in the flex grid can be aligned across the horizontal or vertical axis.

### Horizontal Alignment

Columns can be aligned the same way you would align text in a paragraph. By default, all columns align to the left (or the right in RTL), but this can be overridden with by adding the `.align-[dir]` class to the flex row.

```html
<div class="flex-row">
  <div class="flex-column small-4">Aligned to</div>
  <div class="flex-column small-4">the left</div>
</div>
<div class="flex-row align-right">
  <div class="flex-column small-4">Aligned to</div>
  <div class="flex-column small-4">the right</div>
</div>
<div class="flex-row align-center">
  <div class="flex-column small-4">Aligned to</div>
  <div class="flex-column small-4">the middle</div>
</div>
<div class="flex-row align-justify">
  <div class="flex-column small-4">Aligned to</div>
  <div class="flex-column small-4">the edges</div>
</div>
<div class="flex-row align-spaced">
  <div class="flex-column small-4">Aligned to</div>
  <div class="flex-column small-4">...?</div>
</div>
```

<div class="text-center">
  <div class="flex-row">
    <div class="flex-column small-4">Aligned to</div>
    <div class="flex-column small-4">the left</div>
  </div>
  <div class="flex-row align-right">
    <div class="flex-column small-4">Aligned to</div>
    <div class="flex-column small-4">the right</div>
  </div>
  <div class="flex-row align-center">
    <div class="flex-column small-4">Aligned to</div>
    <div class="flex-column small-4">the middle</div>
  </div>
  <div class="flex-row align-justify">
    <div class="flex-column small-4">Aligned to</div>
    <div class="flex-column small-4">the edges</div>
  </div>
  <div class="flex-row align-spaced">
    <div class="flex-column small-4">Aligned to</div>
    <div class="flex-column small-4">the space around</div>
  </div>
</div>

You might be wondering what the difference between `.align-justify` and `.aligned-spaced` is. A justified grid (`justify-content: space-between`) evenly distributes the space *between* each column. The first and last columns pin to the edge of the grid.

A spaced grid (`justify-content: space-around`) evenly distributes the space *around* each column. This means there will always be space to the left of the first column, and to the right of the last column.

The horizontal alignment classes are shorthands for the `justify-content` CSS property. [Learn more about `justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).

---

### Vertical Alignment

By default, all columns in a flex grid align to the top of their parent. This behavior can be changed with another set of alignment classes. That's right, *middle alignment in CSS*!

Your options for vertical alignment are `top`, `middle`, `bottom`, and `stretch`. Note that we use the word *middle* for vertical alignment, and *center* for horizontal alignment.

Applying a vertical alignment class to the flex row will affect every column directly inside it.

```html_example
<div class="flex-row align-middle">
  <div class="flex-column">I'm in the middle!</div>
  <div class="flex-column">I am as well, but I have so much text I take up more space! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis facere ducimus earum minus, inventore, ratione doloremque deserunt neque perspiciatis accusamus explicabo soluta, quod provident distinctio aliquam omnis? Labore, ullam possimus.</div>
</div>
```

```html_example
<div class="flex-row align-stretch">
  <div class="flex-column">This colums have the same height.</div>
  <div class="flex-column">That's right, equal-height columns are possible with Flexbox too! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</div>
</div>
```

---

The same alignment classes can also be applied to individual columns.

```html_example
<div class="flex-row">
  <div class="flex-column align-bottom">Align bottom</div>
  <div class="flex-column align-middle">Align middle</div>
  <div class="flex-column align-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</div>
</div>
```