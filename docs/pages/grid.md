---
title: The Grid
description: Create powerful multi-device layouts quickly and easily with the default 12-column, nest-able Foundation grid. If you're familiar with grid systems, you'll feel right at home. If not, you'll learn quickly.
sass: scss/grid/*.scss
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

Medium sized screens will inherit styles from small, unless you specify a different layout, using the medium grid classes.

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

In order to work around browsers' different rounding behaviors, Foundation will float the last column in a row to the right so the edge aligns. If your row doesn't have a count that adds up to 12 columns, you can tag the last column with a class of end in order to override that behavior.

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
    <div class="panel">
      <p class="show-for-medium-only">On a medium screen, I have gutters!</p>
      <p class="show-for-large-up">On a large screen, I have no gutters!</p>
    </div>
  </div>
  <div class="small-6 columns">
    <div class="panel">
      <p class="show-for-medium-only">On a medium screen, I have gutters!</p>
      <p class="show-for-large-up">On a large screen, I have no gutters!</p>
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