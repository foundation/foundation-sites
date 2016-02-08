---
title: The Grid
description: Create powerful multi-device layouts quickly and easily with the default 12-column, nestable Foundation grid. If you're familiar with grid systems, you'll feel right at home. If not, you'll learn quickly.
sass: 
  - scss/grid/*.scss
  - '!scss/grid/_flex-grid.scss'
tags:
  - block grid
---

## Basics

Start by adding an element with a class of `.row`. This will create a horizontal block to contain vertical columns. Then add elements with a `.column` class within that row. You can use `.column` or `.columns`&mdash;the only difference is grammar. Specify the widths of each column with the `.small-#`, `.medium-#`, and `.large-#` classes.

**Foundation is mobile-first.** Code for small screens first, and larger devices will inherit those styles. Customize for larger screens as necessary.

```html
<div class="row">
  <div class="small-2 large-4 columns"><!-- ... --></div>
  <div class="small-4 large-4 columns"><!-- ... --></div>
  <div class="small-6 large-4 columns"><!-- ... --></div>
</div>
<div class="row">
  <div class="large-3 columns"><!-- ... --></div>
  <div class="large-6 columns"><!-- ... --></div>
  <div class="large-3 columns"><!-- ... --></div>
</div>
<div class="row">
  <div class="small-6 large-2 columns"><!-- ... --></div>
  <div class="small-6 large-8 columns"><!-- ... --></div>
  <div class="small-12 large-2 columns"><!-- ... --></div>
</div>
<div class="row">
  <div class="small-3 columns"><!-- ... --></div>
  <div class="small-9 columns"><!-- ... --></div>
</div>
<div class="row">
  <div class="large-4 columns"><!-- ... --></div>
  <div class="large-8 columns"><!-- ... --></div>
</div>
<div class="row">
  <div class="small-6 large-5 columns"><!-- ... --></div>
  <div class="small-6 large-7 columns"><!-- ... --></div>
</div>
<div class="row">
  <div class="large-6 columns"><!-- ... --></div>
  <div class="large-6 columns"><!-- ... --></div>
</div>
```

<div class="row display">
  <div class="small-2 large-4 columns"><span class="hide-for-large">2</span><span class="show-for-large">4</span></div>
  <div class="small-4 large-4 columns">4</div>
  <div class="small-6 large-4 columns"><span class="hide-for-large">6</span><span class="show-for-large">4</span></div>
</div>
<div class="row display">
  <div class="large-3 columns"><span class="hide-for-large">full</span><span class="show-for-large">3</span></div>
  <div class="large-6 columns"><span class="hide-for-large">full</span><span class="show-for-large">6</span></div>
  <div class="large-3 columns"><span class="hide-for-large">full</span><span class="show-for-large">3</span></div>
</div>
<div class="row display">
  <div class="small-6 large-2 columns"><span class="hide-for-large">6</span><span class="show-for-large">2</span></div>
  <div class="small-6 large-8 columns"><span class="hide-for-large">6</span><span class="show-for-large">8</span></div>
  <div class="small-12 large-2 columns"><span class="hide-for-large">full</span><span class="show-for-large">2</span></div>
</div>
<div class="row display">
  <div class="small-3 columns">3</div>
  <div class="small-9 columns">9</div>
</div>
<div class="row display">
  <div class="large-4 columns"><span class="hide-for-large">full</span><span class="show-for-large">4</span></div>
  <div class="large-8 columns"><span class="hide-for-large">full</span><span class="show-for-large">8</span></div>
</div>
<div class="row display">
  <div class="small-6 large-5 columns"><span class="hide-for-large">6</span><span class="show-for-large">5</span></div>
  <div class="small-6 large-7 columns"><span class="hide-for-large">6</span><span class="show-for-large">7</span></div>
</div>
<div class="row display">
  <div class="large-6 columns"><span class="hide-for-large">full</span><span class="show-for-large">6</span></div>
  <div class="large-6 columns"><span class="hide-for-large">full</span><span class="show-for-large">6</span></div>
</div>

---

### Small Grids

Small grids expand to large screens easier than large grids cram into small screens.

```html
<div class="row">
  <div class="small-2 columns">2 columns</div>
  <div class="small-10 columns">10 columns</div>
</div>
<div class="row">
  <div class="small-3 columns">3 columns</div>
  <div class="small-9 columns">9 columns</div>
</div>
```

<div class="row display">
  <div class="small-2 columns">2 columns</div>
  <div class="small-10 columns">10 columns</div>
</div>
<div class="row display">
  <div class="small-3 columns">3 columns</div>
  <div class="small-9 columns">9 columns</div>
</div>

---

### Medium Grid

Medium sized screens will inherit styles from small, unless you specify a different layout using the medium grid classes.

```html
<div class="row">
  <div class="medium-2 columns">2 columns</div>
  <div class="medium-10 columns">10 columns</div>
</div>
<div class="row">
  <div class="medium-3 columns">3 columns</div>
  <div class="medium-9 columns">9 columns</div>
</div>
```

<div class="row display">
  <div class="medium-2 columns">2 columns</div>
  <div class="medium-10 columns">10 columns</div>
</div>
<div class="row display">
  <div class="medium-3 columns">3 columns</div>
  <div class="medium-9 columns">9 columns</div>
</div>

---

## Advanced

### Combined Column/Row

If you need a full-width column to use as a container, put the `.column` and `.row` classes on the same element. You can still nest more grids inside this container like usual.

<div class="warning callout">
  <p>Column rows can use sizing classes like <code>.small-8</code>, but only when used as a top-level container&mdash;not when nested inside another row.</p>
</div>

```html
<div class="column row">
  Row column
</div>
```

<div class="column row display">
  Row column
</div>

---

### Fluid Row

Normally, a row is always 1200 pixels wide. Make a row completely fluid by adding the `.expanded` class.

```html
<div class="expanded row">
</div>
```

---

### Nesting

You can nest the grids indefinitely, though at a certain point it will get absurd.

```html
<div class="row">
  <div class="small-8 columns">8
    <div class="row">
      <div class="small-8 columns">8 Nested
        <div class="row">
          <div class="small-8 columns">8 Nested Again</div>
          <div class="small-4 columns">4</div>
        </div>
      </div>
      <div class="small-4 columns">4</div>
    </div>
  </div>
  <div class="small-4 columns">4</div>
</div>
```

<div class="row display">
  <div class="small-8 columns">8
    <div class="row">
      <div class="small-8 columns">8 Nested
        <div class="row">
          <div class="small-8 columns">8 Nested Again</div>
          <div class="small-4 columns">4</div>
        </div>
      </div>
      <div class="small-4 columns">4</div>
    </div>
  </div>
  <div class="small-4 columns">4</div>
</div>

---

### Offsets

Move blocks up to 11 columns to the right by using classes like `.large-offset-1` and `.small-offset-3`.

```html
<div class="row">
  <div class="large-1 columns">1</div>
  <div class="large-11 columns">11</div>
</div>
<div class="row">
  <div class="large-1 columns">1</div>
  <div class="large-10 large-offset-1 columns">10, offset 1</div>
</div>
<div class="row">
  <div class="large-1 columns">1</div>
  <div class="large-9 large-offset-2 columns">9, offset 2</div>
</div>
<div class="row">
  <div class="large-1 columns">1</div>
  <div class="large-8 large-offset-3 columns">8, offset 3</div>
</div>
```

<div class="row display">
  <div class="large-1 columns">1</div>
  <div class="large-11 columns">11</div>
</div>
<div class="row display">
  <div class="large-1 columns">1</div>
  <div class="large-10 large-offset-1 columns">10, offset 1</div>
</div>
<div class="row display">
  <div class="large-1 columns">1</div>
  <div class="large-9 large-offset-2 columns">9, offset 2</div>
</div>
<div class="row display">
  <div class="large-1 columns">1</div>
  <div class="large-8 large-offset-3 columns">8, offset 3</div>
</div>

---

### Incomplete Rows

In order to work around browsers' different rounding behaviors, Foundation will float the last column in a row to the right so the edge aligns. If your row doesn't have a count that adds up to 12 columns, you can tag the last column with a class of `.end` in order to override that behavior.

```html
<div class="row">
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns">3</div>
</div>
<div class="row">
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns end">3 end</div>
</div>
```

<div class="row display-end">
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns">3</div>
</div>
<div class="row display-end">
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns">3</div>
  <div class="medium-3 columns end">3 end</div>
</div>

---

### Responsive Gutters

<div class="warning callout">
  <p>Responsive gutters were added in <strong>Foundation 6.1.0</strong>. As of this version, it's still possible to use static gutters, or you can upgrade your project to responsive gutters. In Foundation 6.2.0, static gutters will be removed entirely in favor of responsive gutters. Refer to the <a href="https://github.com/zurb/foundation-sites/releases/tag/v6.1.0">Version 6.1.0 changelog</a> for more details on the upgrade process.</p>
</div>

The grid *gutter*&mdash;the space between two columns in a row, and the space between the edge of a grid and the edge of the page&mdash;is responsive, and becomes wider on larger screens.

Breakpoint | Gutter Size
-----------|------------
`small`    | 20px
`medium`   | 30px

If you're using the Sass version of Foundation, you can change these defaults by editing the `$grid-column-responsive-gutter` variable:

```scss
$grid-column-responsive-gutter: (
  small: 20px,
  medium: 30px,
);
```

To add more gutter definitions, add new lines to the map. The breakpoint names used here must match a breakpoint name in your project's `$breakpoints` map.

---

### Collapse/Uncollapse Rows

The `.collapse` class lets you remove column gutters (padding).

There are times when you won't want each media query to be collapsed or uncollapsed. In this case, use the media query size you want and collapse or uncollapse and add that to your row element. Example shows no gutter at small media size and then adds the gutter to columns at medium.

```html
<div class="row medium-uncollapse large-collapse">
  <div class="small-6 columns">
    Removes gutter at large media query
  </div>
  <div class="small-6 columns">
    Removes gutter at large media query
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

### Centered Columns

Center your columns by adding a class of `.small-centered` to your column. Large will inherit small centering by default, but you can also center solely on large by applying a `.large-centered` class. To uncenter on large screens, use `.large-uncentered`.

```html
<div class="row">
  <div class="small-3 small-centered columns">3 centered</div>
</div>
<div class="row">
  <div class="small-6 large-centered columns">6 centered</div>
</div>
<div class="row">
  <div class="small-9 small-centered large-uncentered columns">9 centered</div>
</div>
<div class="row">
  <div class="small-11 small-centered columns">11 centered</div>
</div>
```

<div class="row display">
  <div class="small-3 small-centered columns">3 centered</div>
</div>
<div class="row display">
  <div class="small-6 large-centered columns">6 centered, large</div>
</div>
<div class="row display">
  <div class="small-9 small-centered large-uncentered columns">9 centered small</div>
</div>
<div class="row display">
  <div class="small-11 small-centered columns">11 centered</div>
</div>

---

### Source Ordering

Using these source ordering classes, you can shift columns around between our breakpoints. This means if you place sub-navigation below main content on small displays, you have the option to position the sub-navigation on either the left or right of the page for large displays. Prefix push/pull with the size of the device you want to apply the styles to. `.medium-push-#`, `.large-push-#` is the syntax you'll use. Use large-reset-order to reset pushed or pulled columns to their original position on large screens.

```html
<div class="row">
  <div class="small-10 small-push-2 columns">10</div>
  <div class="small-2 small-pull-10 columns">2, last</div>
</div>
<div class="row">
  <div class="large-9 large-push-3 columns">9</div>
  <div class="large-3 large-pull-9 columns">3, last</div>
</div>
<div class="row">
  <div class="large-8 large-push-4 columns">8</div>
  <div class="large-4 large-pull-8 columns">4, last</div>
</div>
<div class="row">
  <div class="small-5 small-push-7 medium-7 medium-push-5 columns">7</div>
  <div class="small-7 small-pull-5 medium-5 medium-pull-7 columns">5, last</div>
</div>
<div class="row">
  <div class="medium-6 medium-push-6 columns">6</div>
  <div class="medium-6 medium-pull-6 columns">6, last</div>
</div>
```

<div class="row display">
  <div class="small-10 small-push-2 columns">10</div>
  <div class="small-2 small-pull-10 columns">2, last</div>
</div>
<div class="row display">
  <div class="large-9 large-push-3 columns">9</div>
  <div class="large-3 large-pull-9 columns">3, last</div>
</div>
<div class="row display">
  <div class="large-8 large-push-4 columns">8</div>
  <div class="large-4 large-pull-8 columns">4, last</div>
</div>
<div class="row display">
  <div class="small-5 small-push-7 medium-7 medium-push-5 columns">7</div>
  <div class="small-7 small-pull-5 medium-5 medium-pull-7 columns">5, last</div>
</div>
<div class="row display">
  <div class="medium-6 medium-push-6 columns">6</div>
  <div class="medium-6 medium-pull-6 columns">6, last</div>
</div>

---

### Block Grids

The block grid from Foundation 5 has been merged into the main grid. Add a class of the format `[size]-up-[n]` to change the size of all columns within the row. By default, the max number of columns you can use with block grid are 8.

```html_example
<div class="row small-up-1 medium-up-2 large-up-4">
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
</div>
```

---

## Building Semantically

Our grid CSS is generated with a powerful set of Sass mixins, which you can use in your own code to build a semantic grid.

### Rows

Use the `grid-row()` mixin to create a row.

```scss
.container {
  @include grid-row;
}
```

---

### Columns

Use the `grid-column()` mixin to create a column. There are a number of ways to define the width of the column.

```scss
.main-content {
  // Use the full column count (100%)
  @include grid-column;

  // Use a column count (33%);
  @include grid-column(4);

  // Use a percentage (15%)
  @include grid-column(15%);

  // Use a custom fraction (20%)
  @include grid-column(1 of 5);
}
```

The grid column calculator can also be accessed as a function. This gives you the percentage value, without any of the grid column CSS.

```scss
.main-content {
  width: grid-column(1 of 7);
}
```

To center a column semantically. Use ´grid-column-position(center);´.

```scss
.centered-column {
  @include grid-column-position(center);
}
```

---

### Multiple Grids

By default, all grids use the number of columns set by the `$grid-column-count` variable. However, this can be selectively overridden within an instance of a row.

In this example, the grid is 16 columns instead of the normal 12. Any references to column math inside the mixin will use the new column count. 

```scss
.container {
  @include grid-row(16) {
    .main-content {
      // 5/16 = 31.25%
      @include grid-column(5);
    }

    .sidebar {
      // 11/16 = 68.75%
      @include grid-column(11);
    }
  }
}
```

You can also temporarily change the grid context without outputting any row CSS, by using the `grid-context()` mixin.

```scss
@include grid-context(7) {
  .sidebar {
    @include grid-column(4);
  }
}
```

Every other grid feature, from sizing to offsets to source ordering, can also be accessed with a mixin. Pair them with the `breakpoint()` mixin to make your grid responsive.

Refer to the Sass documentation below to learn how each mixin works.

```scss
.main-content {
  // The mixins have shorthands, too!
  @include grid-col;

  @include breakpoint(medium) {
    // Changes size only
    @include grid-col-size(8);

    // Changes position only
    @include grid-col-pos(4);
  }
}
```
