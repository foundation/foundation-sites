---
title: Accordion
description: Accordions are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_accordion.scss
js: js/foundation.accordion.js
---

## Basics

The container for an accordion needs the class `.accordion`, and the attribute `data-accordion`. Note that in these examples, we use a `<ul>`, but you can use any element you want.

```html
<ul class="accordion" data-accordion></ul>
```

The default class for an accordion section is `.accordion-item`. Inside each section is a title, default `.accordion-title`, and corresponding content pane `.accordion-content`. Please note, the only opinionated component here is the use of an anchor `<a></a>` for the title link, which controls the opening and closing of the pane. You can include your own attributes, or our JavaScript will assign it for you. JS assigned attributes include unique id's, aria attributes, and roles. You do still need to include the `data-tab-content` attribute for your content pane.

Loading a page with an open pane is achieved by adding the `is-active` class to one, (or more, if using the multiExpand option), `.accordion-item` element.

This is the minimum markup for creating an Accordion with Foundation, repeating the `accordion-item`, `accordion-title`, and `accordion-content` elements as many times as you require.
```html
<ul class="accordion" data-accordion="">
  <li class="accordion-item is-active">
    <a class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content="">
      I would start in the open state, due to using the `is-active` state class.
    </div>
  </li>
  <!-- ... -->
</ul>
```
###Role/ARIA elements and attributes

Note the use of the role element, as well as several ARIA attributes, in the below example.
```html
<ul class="accordion" data-accordion="" role="tablist">
  <li class="accordion-item is-active">
    <a href="#" class="accordion-title" id="panel1a-accordion-label" role="tab"   aria-controls="panel1a-accordion" aria-expanded="true" aria-selected="true">Accordion 1</a>
    <div class="accordion-content" id="panel1a-accordion" role="tabpanel" data-tab-content="" aria-labelledby="panel1a-accordion-label" aria-hidden="false" style="display: block;">
       I would start in the open state, due to using the `is-active` state class.
     </div>
  </li>
  <!-- ... -->
</ul>
```
Once you put it all together, here's what you get!

<ul class="accordion" data-accordion="" role="tablist">
  <li class="accordion-item is-active">
    <a href="#" class="accordion-title" id="panel1a-accordion-label" role="tab"   aria-controls="panel1a-accordion" aria-expanded="true" aria-selected="true">Accordion 1</a>
    <div class="accordion-content" id="panel1a-accordion" role="tabpanel" data-tab-content="" aria-labelledby="panel1a-accordion-label" aria-hidden="false" style="display: block;">
      <p>Panel 1. Lorem ipsum dolor</p>
      <a href="#">Nowhere to Go</a>
    </div>
  </li>
  <li class="accordion-item">
    <a href="#" class="accordion-title" id="panel2a-accordion-label" role="tab"  aria-controls="panel2a-accordion" aria-expanded="false" aria-selected="false">Accordion 2</a>
    <div class="accordion-content" id="panel2a-accordion" role="tabpanel" data-tab-content="" aria-labelledby="panel2a-accordion-label" aria-hidden="true">
      <textarea></textarea>
      <button class="button">I do nothing!</button>
    </div>
  </li>
  <li class="accordion-item">
    <a href="#" class="accordion-title" id="panel3a-accordion-label" role="tab"  aria-controls="panel3a-accordion" aria-expanded="false" aria-selected="false">Accordion 3</a>
    <div class="accordion-content" id="panel3a-accordion" role="tabpanel" data-tab-content="" aria-labelledby="panel3a-accordion-label" aria-hidden="true">
      Pick a date!
      <input type="date"></input>
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

<ul class="accordion" data-accordion data-multi-expand='true'>
  <li class="accordion-item is-active">
    <a href="#" class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content >
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#" class="accordion-title">Accordion 2</a>
    <div class="accordion-content" data-tab-content>
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#" class="accordion-title">Accordion 3</a>
    <div class="accordion-content" data-tab-content>
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

<ul class="accordion" data-accordion data-allow-all-closed='true'>
  <li class="accordion-item is-active">
    <a href="#" class="accordion-title">Accordion 1</a>
    <div class="accordion-content" data-tab-content >
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#" class="accordion-title">Accordion 2</a>
    <div class="accordion-content" data-tab-content>
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#" class="accordion-title">Accordion 3</a>
    <div class="accordion-content" data-tab-content>
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>
