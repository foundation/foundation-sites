---
title: Button Group
description: Button groups are containers for related action items. They're great when you need to display a group of actions in a bar. These build off the button styles and work perfectly with the grid.
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

## Even-width Group

Add the `.expand` class to the container to make a full-width button group. Each item will automatically size itself based on how many buttons there are, up to a maximum of six.

```html_example
<div class="expand button-group">
  <a class="button">Expanded</a>
  <a class="button">Button</a>
  <a class="button">Group</a>
</div>
```

---

## Split Buttons

To build a split button, just create a button group with two buttons.

```html_example
<div class="button-group">
  <a class="button">Primary Action</a>
  <a class="dropdown button"></a>
</div>
```
