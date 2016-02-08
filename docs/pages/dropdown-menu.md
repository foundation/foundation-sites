---
title: Dropdown Menu
description: Change a basic Menu into an expandable dropdown menu with the Dropdown Menu plugin.
sass: scss/components/_dropdown-menu.scss
js: js/foundation.dropdownMenu.js
---

## Horizontal

Dropdown menus build on the [Menu](menu.html) component's syntax. Add the class `.dropdown` and the attribute `data-dropdown-menu` to the menu container to set up the dropdown.

```html
<ul class="dropdown menu" data-dropdown-menu>
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
  <li><a href="#">Item 4</a></li>
</ul>
```

To create dropdown menus, nest a new `<ul>` inside an `<li>`. You can nest further to create more levels of dropdowns.

<div class="primary callout">
  <p>Note that the <code>&lt;ul&gt;</code> goes <em>after</em> the <code>&lt;a&gt;</code>, and not inside of it.</p>
</div>

```html
<ul class="dropdown menu" data-dropdown-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A</a></li>
      <!-- ... -->
    </ul>
  </li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
  <li><a href="#">Item 4</a></li>
</ul>
```

<ul class="dropdown menu" data-dropdown-menu>
  <li>
    <a>Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A</a></li>
      <li>
        <a href="#">Item 1B</a>
        <ul class="menu">
          <li><a href="#">Item 1B i</a></li>
          <li><a href="#">Item 1B ii</a></li>
          <li>
            <a href="#">Item 1B iii</a>
            <ul class="menu">
              <li><a href="#">Item 1B iii alpha</a></li>
              <li><a href="#">Item 1B iii omega</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Item 1B iv</a>
            <ul class="menu">
              <li><a href="#">Item 1B iv alpha</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#">Item 1C</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li><a href="#">Item 3</a></li>
  <li><a href="#">Item 4</a></li>
</ul>

---

## Vertical

Add the `.vertical` class to the top-level menu to make it vertical. Sub-menus are automatically vertical, regardless of the orientation of the top-level menu.

<div class="primary callout">
  <p>Menus are block-level elements, which means they stretch to fill the width of their container. To make the below example less goofy, we've hard-coded a <code>max-width</code> on the menu.</p>
</div>

```html
<ul class="vertical dropdown menu" data-dropdown-menu style="max-width: 300px;">
  <li><a href="#">Item 1</a></li>
  <!-- ... -->
</ul>
```

<ul class="vertical dropdown menu" data-dropdown-menu style="max-width: 300px;">
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 3</a>
    <ul class="menu">
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li>
        <a href="#"> Item 1 sub</a>
        <ul class="menu">
          <li><a href="#">Item 1 subA</a></li>
          <li><a href="#">Item 1 subB</a></li>
          <li>
            <a href="#"> Item 1 sub</a>
            <ul class="menu">
              <li><a href="#">Item 1 subA</a></li>
              <li><a href="#">Item 1 subB</a></li>
            </ul>
          </li>
          <li>
            <a href="#"> Item 1 sub</a>
            <ul class="menu">
              <li><a href="#">Item 1 subA</a></li>
              <li><a href="#">Item 1 subB</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
</ul>

---

## Sticky Navigation

See the documentation for the [Sticky](sticky.html#sticky-navigation) plugin to see how to easily make a sticky nav bar. 
