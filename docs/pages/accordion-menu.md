---
title: Accordion Menu
sass: scss/components/_accordion-menu.scss
js: js/foundation.accordionMenu.js
description: Change a basic vertical Menu into a expandable accordion menu with the Accordion Menu plugin.
---

## Basics

Accordion menus follow the basic [Menu](menu.html) syntax of `<ul>`, `<li>`, and `<a>`. To convert a basic menu into an accordion, add the attribute `data-accordion-menu`. You probably also want it to be vertical, so add the class `.vertical` as well.

Any `<a>` will behave like a standard link. However, any `<a>` paired with a nested `<ul>` menu will then slide that sub-menu up and down when clicked on.

<div class="primary callout">
  <p>You can use the built-in <code>.nested</code> class to add an indent to a nested menu.</p>
</div>

<div class="primary callout">
  <p>To have a sub-menu already open when the page loads, add the class <code>.is-active</code> to that sub-menu.</p>
</div>

```html
<ul class="vertical tree" data-accordion-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="tree vertical nested">
      <li><a href="#">Item 1A</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li><a href="#">Item 2</a></li>
</ul>
```

<ul class="vertical tree" data-accordion-menu>
  <li>
    <span>Item 1</span>
    <ul class="tree vertical nested">
      <li>
        <span>Item 1A</span>
        <ul class="tree vertical nested">
          <li><span>Item 1Ai</span></li>
          <li><a href="http://www.sony.com">Item 1Aii</a></li>
          <li><span>Item 1Aiii</span></li>
        </ul>
      </li>
      <li><span>Item 1B</span></li>
      <li><span>Item 1C</span></li>
    </ul>
  </li>
  <li>
    <span>Item 2</span>
    <ul class="tree vertical nested">
      <li><span>Item 2A</a></li>
      <li><span>Item 2B</a></li>
    </ul>
  </li>
  <li><a href="http://www.nike.com">Item 3</a></li>
</ul>
