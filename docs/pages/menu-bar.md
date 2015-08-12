---
title: Menu Bar
description: Our flexible menu bar component makes it easy to build many common navigation patterns, all with the same markup.
sass: scss/components/_menu-bar.scss
tags:
  - navigation
  - side nav
  - sub nav
  - icon bar
  - top bar
---

The menu bar is a flexible, all-purpose component for navigation. It replaces Foundation 5's inline list, side nav, sub nav, and icon bar, unifying them into one component.

---

## Basic Menu Bar

All versions of the menu bar are a `<ul>` filled with `<li>` elements containing links. By default, a menu bar is horizontally oriented.

```html_example
<ul class="menu-bar">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Item Alignment

By default, each item in the menu bar aligns to the left. They can also be aligned to the right with the `.align-right` class.

```html_example
<ul class="menu-bar align-right">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

Items can also be set to expand out and take up an even amount of space, with the `.expanded` class. Thanks to the magic of CSS, the items will automatically size themselves equally depending on how many are inside the menu.

```html_example
<ul class="menu-bar expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
</ul>
```

<ul class="menu-bar expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
</ul>

<ul class="menu-bar expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>

---

## Vertical Menu Bar

Add the `.vertical` class to a menu bar to switch its orientation.

```html_example
<ul class="menu-bar vertical">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Simple Style

Add the `.simple` class to a menu bar to remove the padding and color change. This style imitates the inline list from Foundation 5.

```html_example
<ul class="menu-bar simple">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Colored Style

Add the `.primary` class to a menu bar to give it color. The color used is the `$primary-color` variable in the settings file.

```html_example
<ul class="menu-bar primary">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Nested Style

Add a new menu bar inside the `<li>` of a menu bar and add the class `.nested` to create a nested menu bar. The nested menu bar has extra padding on the inside.

```html_example
<ul class="vertical menu-bar">
  <li>
    <a href="#">One</a>
    <ul class="nested vertical menu-bar">
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

Menu bar items can have icons. Wrap the text of the item in a `<span>`, and then add an `<img>` element before the `<span>`. If you're using the Foundation icon font, the `<img>` will be an `<i>` instead.

```html_example
<ul class="menu-bar">
  <li><a href="#"><i class="fi-list"></i> <span>One</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Two</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Three</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Four</span></a></li>
</ul>
```

---

Add the class `.icon-top` to the menu bar to orient icons above the text.

```html_example
<ul class="menu-bar icon-top">
  <li><a href="#"><i class="fi-list"></i> <span>One</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Two</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Three</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Four</span></a></li>
</ul>
```