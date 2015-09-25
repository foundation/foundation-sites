---
title: Accordion
description: Accordions are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_accordion.scss
js: js/foundation.accordion.js
---


<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>If `Foundation.reflow()` is called on a click event, it animates multiple times.</li>
    <li>Needs accessibility compliant keyboard access bindings.</li>
  </ul>
</div>



## Basics

The container for an accordion needs the class `.accordion`, and the attributes `data-accordion` and `role="tablist"`. Note that in these examples, we use a `<ul>`, but you can use any element you want.

```html
<ul class="accordion" data-accordion role="tablist"></ul>
```

Each accordion item has the class `.accordion-item`. Inside each item is a title (`.accordion-title`) and corresponding content pane (`.accordion-content`). Note the use of the `role` element, as well as several ARIA attributes, in the below example.

```html
<ul class="accordion" data-accordion role="tablist">
  <li class="accordion-item is-active">
    <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
</ul>
```

Once you put it all together, here's what you get!

<ul class="accordion" data-accordion role="tablist">
  <li class="accordion-item is-active">
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel2d"  role="tab" class="accordion-title" id="panel2d-heading" aria-controls="panel2d">Accordion 2</a>
    <div id="panel2d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel2d-heading">
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel3d" role="tab" class="accordion-title" id="panel3d-heading" aria-controls="panel3d">Accordion 3</a>
    <div id="panel3d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel3d-heading">
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>

---

## Advanced Options

### Multi-expand

By default, only one pane of an accordion can be open at a time. This can be changed with the `multiExpand` setting.

```html
<ul class="accordion" data-accordion data-multi-expand="true">
  <!-- ... -->
</ul>
```

<ul class="accordion" data-accordion data-multi-expand="true" role="tablist">
  <li class="accordion-item is-active">
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel2d"  role="tab" class="accordion-title" id="panel2d-heading" aria-controls="panel2d">Accordion 2</a>
    <div id="panel2d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel2d-heading">
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel3d" role="tab" class="accordion-title" id="panel3d-heading" aria-controls="panel3d">Accordion 3</a>
    <div id="panel3d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel3d-heading">
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>

---

### All Closed

By default, at least one pane in an accordion must be open. This can be changed with the `allowAllClosed` setting.

```html
<ul class="accordion" data-accordion data-allow-all-closed="true">
  <!-- ... -->
</ul>
```

<ul class="accordion" data-accordion data-allow-all-closed="true" role="tablist">
  <li class="accordion-item is-active">
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel2d"  role="tab" class="accordion-title" id="panel2d-heading" aria-controls="panel2d">Accordion 2</a>
    <div id="panel2d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel2d-heading">
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel3d" role="tab" class="accordion-title" id="panel3d-heading" aria-controls="panel3d">Accordion 3</a>
    <div id="panel3d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel3d-heading">
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>
