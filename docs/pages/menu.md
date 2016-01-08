---
title: Menu
description: Our flexible menu component makes it easy to build many common navigation patterns, all with the same markup.
sass: scss/components/_menu.scss
tags:
  - navigation
  - side nav
  - sub nav
  - icon bar
  - top bar
---

The menu is a flexible, all-purpose component for navigation. It replaces Foundation 5's inline list, side nav, sub nav, and icon bar, unifying them into one component.

---

## Basic Menu

All versions of the menu are a `<ul>` filled with `<li>` elements containing links. By default, a Menu is horizontally oriented.

```html_example
<ul class="menu">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Item Alignment

By default, each item in the menu aligns to the left. They can also be aligned to the right with the `.align-right` class.

<div class="warning callout">
  <p>In a <a href="rtl.html">right-to-left</a> environment, items align to the right by default, and the class <code>.align-left</code> can be used to reverse direction.</p>
</div>

```html_example
<ul class="menu align-right">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

Items can also be set to expand out and take up an even amount of space, with the `.expanded` class. Thanks to the magic of CSS, the items will automatically size themselves equally depending on how many are inside the menu.

```html_example
<ul class="menu expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
</ul>
```

<ul class="menu expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
</ul>

<ul class="menu expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>

---

## Vertical Menu

Add the `.vertical` class to a Menu to switch its orientation.

```html_example
<ul class="menu vertical">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Simple Style

Add the `.simple` class to a Menu to remove the padding and color change. This style imitates the inline list from Foundation 5.

```html_example
<ul class="menu simple">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Nested Style

Add a new menu inside the `<li>` of a Menu and add the class `.nested` to create a nested menu. The nested Menu has extra padding on the inside.

```html_example
<ul class="vertical menu">
  <li>
    <a href="#">One</a>
    <ul class="nested vertical menu">
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
      <li><a href="#">Four</a></li>
    </ul>
  </li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Icons

Menu items can have icons. Wrap the text of the item in a `<span>`, and then add an `<img>` element before the `<span>`. If you're using the Foundation icon font, the `<img>` will be an `<i>` instead.

```html_example
<ul class="menu">
  <li><a href="#"><i class="fi-list"></i> <span>One</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Two</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Three</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Four</span></a></li>
</ul>
```

---

Add the class `.icon-top` to the Menu to orient icons above the text.

```html_example
<ul class="menu icon-top">
  <li><a href="#"><i class="fi-list"></i> <span>One</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Two</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Three</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Four</span></a></li>
</ul>
```
