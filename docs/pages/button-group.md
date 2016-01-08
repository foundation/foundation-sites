---
title: Button Group
description: Button groups are containers for related action items. They're great when you need to display a group of actions in a bar. These build off the button styles and work perfectly with the grid.
sass: scss/components/_button-group.scss
tags:
  - split button
---

## Basics

Add the `.button-group` class to a container, and inside it place any number of buttons. The buttons are separated by a small border.

```html_example
<div class="button-group">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>
```

---

## Sizing

Button groups can be sized with the same classes as standard buttons: `.tiny`, `.small`, and `.large`.

```html_example
<div class="small button-group">
  <a class="button">Small</a>
  <a class="button">Button</a>
  <a class="button">Group</a>
</div>
```

---

## Coloring

Buttons within a button group can be colored individually with the `.secondary`, `.success`, `.warning`, and `.alert` classes.

```html_example
<div class="button-group">
  <a class="secondary button">View</a>
  <a class="success button">Edit</a>
  <a class="warning button">Share</a>
  <a class="alert button">Delete</a>
</div>
```

The entire group can also be colored using the same classes.

```html_example
<div class="secondary button-group">
  <a class="button">Harder</a>
  <a class="button">Better</a>
  <a class="button">Faster</a>
  <a class="button">Stronger</a>
</div>
```

---

## Even-width Group

Add the `.expanded` class to the container to make a full-width button group. Each item will automatically size itself based on how many buttons there are, up to a maximum of six.

```html_example
<div class="expanded button-group">
  <a class="button">Expanded</a>
  <a class="button">Button</a>
  <a class="button">Group</a>
</div>
```

---

## Stacking

A button group can be made vertical with the `.stacked` class. Or, you can use `.stacked-for-small` to only stack a button group on small screens.

```html_example
<div class="stacked-for-small button-group">
  <a class="button">How</a>
  <a class="button">Low</a>
  <a class="button">Can</a>
  <a class="button">You</a>
  <a class="button">Go</a>
</div>
```

---

## Split Buttons

To build a split button, just create a button group with two buttons.

To create a button with only an arrow, add the class `.arrow-only`. Note that the button still needs a label for screen readers, which can be embedded inside the button with a `.show-for-sr` element. In the example below, an assistive device will read the arrow button as "Show menu".

```html_example
<div class="button-group">
  <a class="button">Primary Action</a>
  <a class="dropdown button arrow-only">
    <span class="show-for-sr">Show menu</span>
  </a>
</div>
```
