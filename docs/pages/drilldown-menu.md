---
title: Drilldown Menu
description: Drilldown is one of Foundation's three menu patterns, which converts a series of nested lists into a vertical drilldown menu.
scss: scss/components/_drilldown.scss
js: js/foundation.drilldown.js
---

## Basics

Drilldowns use the standard [Menu](menu.html#nested-style) syntax, using `<ul>`, `<li>`, and `<a>`. Add `data-drilldown` to the root menu to set up the drilldown.

To create sub-menus, place a `<ul>` *next to* an `<a>`. Clicking that `<a>` will then open the `<ul>` that it's next to.

Any `<a>` without a submenu will function like a normal link.

```html
<ul class="vertical menu" data-drilldown>
  <li>
    <a href="#Item-1">Item 1</a>
    <ul class="vertical menu">
      <li><a href="#Item-1A">Item 1A</a></li>
      <!-- ... -->
    </ul>
  </li>
  <li><a href="#Item-2">Item 2</a></li>
</ul>
```

<div class="primary callout">
  <p>The drilldown menu takes on the height of the tallest menu in the hierarchy, so the menu doesn't change height as the user navigates it.</p>
  <p>The width of the drilldown menu will set to the width of the parent element.</p>
  <p>The height and width is recalculated on a resize of the window size.</p>
</div>

<ul class="menu" data-drilldown id="m1">
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li>
        <a href="#">Item 1A</a>
        <ul class="menu">
          <li><a href="#Item-1Aa">Item 1Aa with long Name and may be with a line break</a></li>
          <li><a href="#Item-1Ba">Item 1Ba</a></li>
          <li><a href="#Item-1Ca">Item 1Ca</a></li>
          <li><a href="#Item-1Da">Item 1Da with long Name and may be with a line break</a></li>
          <li><a href="#Item-1Ea">Item 1Ea</a></li>
        </ul>
      </li>
      <li><a href="#Item-1B">Item 1B</a></li>
      <li><a href="#Item-1C">Item 1C</a></li>
      <li><a href="#Item-1D">Item 1D</a></li>
      <li><a href="#Item-1E">Item 1E</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href="#Item-2A">Item 2A</a></li>
      <li><a href="#Item-2B">Item 2B  with long Name and may be with a line break</a></li>
      <li><a href="#Item-2C">Item 2C</a></li>
      <li><a href="#Item-2D">Item 2D</a></li>
      <li><a href="#Item-2E">Item 2E</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 3</a>
    <ul class="menu">
      <li><a href="#Item-3A">Item 3A</a></li>
      <li><a href="#Item-3B">Item 3B</a></li>
      <li><a href="#Item-3C">Item 3C</a></li>
      <li><a href="#Item-3D">Item 3D</a></li>
      <li><a href="#Item-3E">Item 3E</a></li>
    </ul>
  </li>
  <li><a href="#Item-4"> Item 4</a></li>
</ul>

## Respect Individual Width

```html
<ul class="vertical menu" data-drilldown style="width: 200px">
  <li>
    <a href="#Item-1">Item 1</a>
    <ul class="vertical menu">
      <li><a href="#Item-1A">Item 1A</a></li>
      <!-- ... -->
    </ul>
  </li>
  <li><a href="#Item-2">Item 2</a></li>
</ul>
```

<div class="primary callout">
  <p>The drilldown menu respects a given width from the style definition or from a css class. All submenus becomes the same width.</p>
</div>


<ul class="menu" data-drilldown id="m2" style="width:200px">
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li>
        <a href="#">Item 1A</a>
        <ul class="menu">
          <li><a href="#Item-1Aa">Item 1Aa with long Name and may be with a line break</a></li>
          <li><a href="#Item-1Ba">Item 1Ba</a></li>
          <li><a href="#Item-1Ca">Item 1Ca</a></li>
          <li><a href="#Item-1Da">Item 1Da with long Name and may be with a line break</a></li>
          <li><a href="#Item-1Ea">Item 1Ea</a></li>
        </ul>
      </li>
      <li><a href="#Item-1B">Item 1B</a></li>
      <li><a href="#Item-1C">Item 1C</a></li>
      <li><a href="#Item-1D">Item 1D</a></li>
      <li><a href="#Item-1E">Item 1E</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href="#Item-2A">Item 2A</a></li>
      <li><a href="#Item-2B">Item 2B  with long Name and may be with a line break</a></li>
      <li><a href="#Item-2C">Item 2C</a></li>
      <li><a href="#Item-2D">Item 2D</a></li>
      <li><a href="#Item-2E">Item 2E</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 3</a>
    <ul class="menu">
      <li><a href="#Item-3A">Item 3A</a></li>
      <li><a href="#Item-3B">Item 3B</a></li>
      <li><a href="#Item-3C">Item 3C</a></li>
      <li><a href="#Item-3D">Item 3D</a></li>
      <li><a href="#Item-3E">Item 3E</a></li>
    </ul>
  </li>
  <li><a href="#Item-4"> Item 4</a></li>
</ul>

---

## Custom Styling

The drilldown plugin automatically adds a back button to the top of each nested menu. To style this control, target the `.js-drilldown-back` class:

```css
.js-drilldown-back {
  // ...
}
```
