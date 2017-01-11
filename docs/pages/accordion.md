---
title: Accordion
description: Accordions are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_accordion.scss
js: js/foundation.accordion.js
previous:
  url: breadcrumbs.html
  title: Breadcrumbs
next:
  url: callout.html
  title: Callout
---

## Basics

The container for an accordion needs the class `.accordion`, and the attribute `data-accordion`. Note that in these examples, we use a `<ul>`, but you can use any element you want.

```html
<ul class="accordion" data-accordion></ul>
```

Inside the accordion, place a series of panes with the class `.accordion-item` and the attribute `data-accordion-item`. To mark which pane should be open by default, add the class `.is-active` to that pane.

Each pane has a **title**, an `<a>` with the class `.accordion-title`, and a **content area**, an element with the class `.accordion-content` and the attribute `data-tab-content`.

```html
<ul class="accordion" data-accordion>
  <li class="accordion-item is-active" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content>
      I would start in the open state, due to using the `is-active` state class.
    </div>
  </li>
  <!-- ... -->
</ul>
```

Once you put it all together, here's what you get!

<ul class="accordion" data-accordion>
  <li class="accordion-item is-active" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content >
      <p>Panel 1. Lorem ipsum dolor</p>
      <a href="#">Nowhere to Go</a>
    </div>
  </li>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 2</a>
    <div class="accordion-content" data-tab-content>
      <textarea></textarea>
      <button class="button">I do nothing!</button>
    </div>
  </li>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 3</a>
    <div class="accordion-content" data-tab-content>
      Pick a date!
      <input type="date"></input>
    </div>
  </li>
</ul>

---

## Advanced Options

### Multi-expand

By default, only one pane of an accordion can be open at a time. This can be changed by setting the `multiExpand` option to `true`.

```html
<ul class="accordion" data-accordion data-multi-expand="true">
  <!-- ... -->
</ul>
```

<ul class="accordion" data-accordion data-multi-expand='true'>
  <li class="accordion-item is-active" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content >
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 2</a>
    <div class="accordion-content" data-tab-content>
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 3</a>
    <div class="accordion-content" data-tab-content>
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>

---

### All Closed

By default, at least one pane in an accordion must be open. This can be changed by setting `allowAllClosed` option to `true`.

```html
<ul class="accordion" data-accordion data-allow-all-closed="true">
  <!-- ... -->
</ul>
```

<ul class="accordion" data-accordion data-allow-all-closed='true'>
  <li class="accordion-item is-active" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content >
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 2</a>
    <div class="accordion-content" data-tab-content>
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Accordion 3</a>
    <div class="accordion-content" data-tab-content>
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>
