---
title: The Grid
description: Create powerful multi-device layouts quickly and easily with the default 12-column, nest-able Foundation grid. If you're familiar with grid systems, you'll feel right at home. If not, you'll learn quickly.
sass: scss/grid/*.scss
---

Start by adding an element with a class of `.row`. This will create a horizontal block to contain vertical columns. Then add elements with a `.column` class within that row. You can use `.column` or `.columns`&mdash;the only difference is grammar. Specify the widths of each column with the `.small-#`, `.medium-#`, and `.large-#` classes.

**Foundation is mobile-first.** Code for small screens first, and larger devices will inherit those styles. Customize for larger screens as necessary.

```html_example
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