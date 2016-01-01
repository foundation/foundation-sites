---
title: Off-canvas
description: Off-canvas menus are positioned outside of the viewport and slide in when activated. Setting up an off-canvas layout in Foundation is super easy.
sass:
  - scss/components/_off-canvas.scss
  - scss/components/_title-bar.scss
js: js/foundation.offcanvas.js
tags:
  - navigation
---

<button class="button" type="button" data-toggle="offCanvasLeft">Toggle Off-canvas</button>

## Setup

To start, create two wrappers to house the page. These are necessary to prevent the off-canvas menus from being visible when they're not open. They also smooth out cross-browser bugs.
- The outer wrapper has the class `.off-canvas-wrapper`.
- The inner wrapper has the class `.off-canvas-wrapper-inner` and the attribute `data-off-canvas-wrapper`.

```html
<body>
  <div class="off-canvas-wrapper">
    <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper></div>
  </div>
</body>
```

Inside these wrapper, create an off-canvas menu with the class `.off-canvas` and the attribute `data-off-canvas`. The menu also needs a positioning class, which can be `.position-left` or `.position-right`. Lastly, make sure the off-canvas has a unique ID so it can be targeted.

Along with the menu, the main content of your page will be housed in its own container with the class `.off-canvas-content` and attribute `data-off-canvas-content`.

```html
<body>
  <div class="off-canvas-wrapper">
    <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
      <div class="off-canvas position-left" id="offCanvas" data-off-canvas></div>
      <div class="off-canvas-content" data-off-canvas-content></div>
    </div>
  </div>
</body>
```

### Click Triggers

To create a click trigger that opens the menu, add the attribute `data-open` or `data-toggle` to any element. That element will then open or toggle the menu when clicked on. The value of the data attribute should be the ID of the off-canvas.

```html
<button type="button" class="button" data-toggle="offCanvas">Open Menu</button>
```

---

## Multiple Menus

A design can have two menus: one on the left, and one on the right. Be sure that both menus come *before* the `.off-canvas-content` wrapper&mdash;this is required for the CSS to apply correctly.

<div class="primary callout">
  <p>When using Foundation in <a href="rtl.html">right-to-left</a> mode, "right" still means right, and "left" still means left.</p>
</div>

```html
<body>
  <div class="off-canvas-wrapper">
    <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
      <div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas></div>
      <div class="off-canvas position-right" id="offCanvasRight" data-off-canvas data-position="right"></div>
      <div class="off-canvas-content" data-off-canvas-content></div>
    </div>
  </div>
</body>
```

<button class="button" type="button" data-toggle="offCanvasLeft">Open Left Menu</button>
<button class="button" type="button" data-toggle="offCanvasRight">Open Right Menu</button>

---

## Title Bar

If you need a simple title bar to toggle the off-canvas, `.title-bar` is here to help. It supports left- and right-aligned sections.

```html_example
<div class="title-bar">
  <div class="title-bar-left">
    <button class="menu-icon" type="button" data-open="offCanvasLeft"></button>
    <span class="title-bar-title">Foundation</span>
  </div>
  <div class="title-bar-right">
    <button class="menu-icon" type="button" data-open="offCanvasRight"></button>
  </div>
</div>
```

---

## Reveal on Larger Screens

The left- and right-hand off-canvas panes can be set to be persistent on larger screens. Add the class `.reveal-for-medium` or `.reveal-for-large` to the off-canvas menu.

The main content area (`.off-canvas-content`) will be padded to the left or right equal to the width of the container.

<div class="callout">
  <p>The menu will be fixed-position by default, meaning it follows you as you scroll up and down. The menu also gets its own scroll bar if it's taller than the window. To disable these features, set the <code>$offcanvas-fixed-reveal</code> variable to <code>false</code>.</p>
</div>

<div class="warning callout">
  <p>The slide in/out of the plugin still works when these classes are active. If you use this feature on a larger screen, be sure to hide any click triggers on those larger breakpoints as well. Foundation's <a href="visibility.html">visibility classes</a> can help you with that.</p>
</div>

```html
<div class="off-canvas position-left reveal-for-large" data-off-canvas>
  <!-- ... -->
</div>
```

<button type="button" class="button" data-docs-example-ofc>Toggle Reveal Class</button>

## Responsive Off-Canvas (Putting it all together)
Page switch to "hamburger" title-bar with off-canvas menus on 'small' screen. Revert to top-bar on 'medium' and up.

```html 
<body>
  <div class="off-canvas-wrapper">
    <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>

      <!-- off-canvas title bar for 'small' screen -->
      <div class="title-bar" data-responsive-toggle="widemenu" data-hide-for="medium">
        <div class="title-bar-left">
          <button class="menu-icon" type="button" data-open="offCanvasLeft"></button>
          <span class="title-bar-title">Foundation</span>
        </div>
        <div class="title-bar-right">
          <span class="title-bar-title">Login</span>
          <button class="menu-icon" type="button" data-open="offCanvasRight"></button>
        </div>
      </div>

      <!-- off-canvas left menu -->
      <div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
        <ul class="vertical dropdown menu" data-dropdown-menu>
          <li><a href="left_item_1">Left item 1</a></li>
          <li><a href="left_item_2">Left item 2</a></li>
          <li><a href="left_item_3">Left item 3</a></li>
        </ul>
      </div>

      <!-- off-canvas right menu -->
      <div class="off-canvas position-right" id="offCanvasRight" data-off-canvas data-position="right">
        <ul class="vertical dropdown menu" data-dropdown-menu>
          <li><a href="right_item_1">Right item 1</a></li>
          <li><a href="right_item_2">Right item 2</a></li>
          <li><a href="right_item_3">Right item 3</a></li>
        </ul>
      </div>

      <!-- "wider" top-bar menu for 'medium' and up -->
      <div id="widemenu" class="top-bar">
        <div class="top-bar-left">
          <ul class="dropdown menu" data-dropdown-menu>
            <li class="menu-text">Foundation</li>
            <li class="has-submenu">
              <a href="#">Item 1</a>
              <ul class="menu submenu vertical" data-submenu>
                <li><a href="left_wide_11">Left wide 1</a></li>
                <li><a href="left_wide_12">Left wide 2</a></li>
                <li><a href="left_wide_13">Left wide 3</a></li>
              </ul>
            </li>
            <li class="has-submenu">
              <a href="#">Item 2</a>
              <ul class="menu submenu vertical" data-submenu>
                <li><a href="left_wide_21">Left wide 1</a></li>
                <li><a href="left_wide_22">Left wide 2</a></li>
                <li><a href="left_wide_23">Left wide 3</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="top-bar-right">
          <ul class="menu">
            <li><input type="search" placeholder="Search"></li>
            <li><button class="button">Search</button></li>
          </ul>
        </div>
      </div>

      <!-- original content goes in this container -->
      <div class="off-canvas-content" data-off-canvas-content>
        <!-- example for zurb advanced template with panini-->
        {{> body}}
      </div>

    <!-- close wrapper, no more content after this -->
    </div>
  </div>
  <!-- now load the necessary plugins and initialize foundation -->
  <script src="js/jquery.js"></script>
  <script src="js/foundation.js"></script>
  <script src="js/app.js"></script>
</body>
``` 
