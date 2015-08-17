---
title: Dropdown Menus
description: Dropdowns. Or ups, rights, and lefts; horizontal or vertical. Your call! Dropdowns are a great way to add content to an element without taking up a bunch of space in your view.
sass: scss/components/_dropdown.scss
---

## Horizontal
By default, dropdowns are exactly that, horizontally oriented below the parent element, opened by a click or tap.

```html_example
<ul class="dropdown menu-bar" data-dropdown-menu>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
</ul>
```

---

## Vertical
Same functionality, different orientation.


```html_example
<ul class="dropdown vertical menu-bar" style="width: 100px;" data-dropdown-menu>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href='#'>Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
</ul>
```
