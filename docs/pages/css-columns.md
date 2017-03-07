---
title: CSS Columns
description: Mixins, helper classes and extends for easy CSS columns
sass: scss/components/_css-columns.scss
tbg: true
---

## Basics

CSS columns can easily be applied to a containing element using the `.css-columns-x` class, where `x` is the number of columns needed.

```html_example
<ul class="css-columns-3">
  <li>The first column</li>
  <li>The second column</li>
  <li>The third column</li>
</ul>
```

---

## Responsive CSS columns

To apply a different number of columns at different breakpoints, append the breakpoint name to the `.css-columns-x` class (i.e. `css-columns-2-large`):

```html_example
<ul class="css-columns-0-small css-columns-2-medium css-columns-4-large">
  <li>The first column</li>
  <li>The second column</li>
  <li>The third column</li>
  <li>The fourth column</li>
</ul>
```
