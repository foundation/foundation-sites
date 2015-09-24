---
title: Off-canvas
description: Off-canvas menus are positioned outside of the viewport and slide in when activated. Setting up an off-canvas layout in Foundation is super easy.
sass: scss/components/_off-canvas.scss
js: js/foundation.offcanvas.js
tags:
  - navigation
---

<button class="button" type="button" data-toggle="offCanvasLeft">Toggle Off-canvas</button>
 
## Setup

Create an off-canvas menu with the class `.off-canvas` and the attribute `data-off-canvas`. The menu also needs a positioning class, which can be `.position-left`, `.position-right`, `.position-top`, or `.position-bottom`. Make sure the off-cavnas also has a unique ID so it can be targeted.

Along with the menu, the main content of your page will be housed in its own container with the class `.main-content` and attribute `data-off-canvas`.

```html
<body>
  <div class="off-canvas position-left" id="offCanvas" data-off-canvas></div>
  <div class="main-content" data-off-canvas-content></div>
</body>
```

### Click Triggers

To create a click trigger that opens the menu, add the attribute `data-open` or `data-toggle` to any element. That element will then open or toggle the menu when clicked on. The value of the data attribute should be the ID of the off-canvas.

```html
<button type="button" class="button" data-toggle="offCanvas">Open Menu</button>
```

---

## Multiple Menus

Because there are four positioning options for off-canvas menus, your design can have up to four total menus. Place each menu next to each other in your HTML. Be sure that every menu comes *before* the `.main-content` wrapper&mdash;this is required for the CSS to apply correctly.

```html
<body>
  <div class="off-canvas position-left" id="offCanvas" data-off-canvas></div>
  <div class="off-canvas position-right" id="offCanvas" data-off-canvas></div>
  <div class="off-canvas position-top" id="offCanvas" data-off-canvas></div>
  <div class="off-canvas position-bottom" id="offCanvas" data-off-canvas></div>
  <div class="main-content" data-off-canvas-content></div>
</body>
```

<button class="button" type="button" data-toggle="offCanvasRight">Open Right Menu</button>
<button class="button" type="button" data-toggle="offCanvasTop">Open Top Menu</button>
<button class="button" type="button" data-toggle="offCanvasBottom">Open Bottom Menu</button>

---

## Overlay Style

Add the class `.off-canvas-overlay` to the `<body>` to make the off-canvas overlay your page's content, instead of pushing it over.

```html
<body data-off-canvas class="off-canvas-overlay">
  <div class="off-canvas"></div>
  <div class="main-content" data-off-canvas-content></div>
</body>
```