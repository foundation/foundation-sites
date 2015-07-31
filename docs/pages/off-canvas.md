---
title: Off-canvas
description: Off-canvas menus are positioned outside of the viewport and slide in when activated. Setting up an off-canvas layout in Foundation is super easy.
sass: ./scss/components/_off-canvas.scss
js: ./js/foundation.offcanvas.js
---

<a class="button" data-toggle="body">Toggle Off-canvas</a>
 
## Setup
 
Add the attribute `data-off-canvas` to the `<body>` element of your page to set up the container. Inside the body, add two elements: the off-canvas (`.off-canvas`), which houses your menu, and a content wrapper (`.main-content` with attribute `data-off-canvas-content`), which houses the rest of your page.

```html
<body data-off-canvas>
  <div class="off-canvas"></div>
  <div class="main-content" data-off-canvas-content></div>
</body>
```

---

## Overlay Style

Add the class `.off-canvas-overlay` to the `<body>` to make the off-canvas overlay your page's content, instead of pushing it over.

```html
<body data-off-canvas class="off-canvas-overlay">
  <div class="off-canvas"></div>
  <div class="main-content" data-off-canvas-content></div>
</body>
```