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
flex: true
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

<br>

To align items in the middle, add a wrapping element with the class `.menu-centered`.

<div class="primary callout">
  <p>If you're using <a href="flexbox.html">Flexbox mode</a>, you have the option of either using <code>.align-center</code> to the menu like this <a href="http://codepen.io/IamManchanda/pen/jyGjmV">codepen</a> or instead you can use the default wrapper class below.</p>
</div>

```html_example
<div class="menu-centered">
  <ul class="menu">
    <li><a href="#">One</a></li>
    <li><a href="#">Two</a></li>
    <li><a href="#">Three</a></li>
    <li><a href="#">Four</a></li>
  </ul>
</div>
```

<br>

Items can also be set to expand out and take up an even amount of space, with the `.expanded` class. Thanks to the magic of CSS, the items will automatically size themselves equally depending on how many are inside the menu.

```html_example
<ul class="menu expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
</ul>
```

<ul class="menu expanded">
  <li><a href="#0">One</a></li>
  <li><a href="#0">Two</a></li>
  <li><a href="#0">Three</a></li>
</ul>

<ul class="menu expanded">
  <li><a href="#0">One</a></li>
  <li><a href="#0">Two</a></li>
  <li><a href="#0">Three</a></li>
  <li><a href="#0">Four</a></li>
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
  <li>One</li>
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

## Active State

Add the class `.active` to any `<li>` to create an active state. You could apply this server-side to mark the active page, or dynamically with JavaScript.

```html_example
<ul class="menu">
  <li class="active"><a>Home</a></li>
  <li><a>About</a></li>
  <li><a>Nachos</a></li>
</ul>
```

---

## Text

Because the padding of the menu item is applied to the `<a>`, if you try to add an item that's text only, it will be misaligned. To get around this, add the class `.menu-text` to any `<li>` that doesn't have a link inside of it.

```html_example
<ul class="menu">
  <li class="menu-text">Site Title</li>
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
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
---

## Sticky Navigation

See the documentation for the [Sticky](sticky.html#sticky-navigation) plugin to see how to easily make a sticky nav bar.
