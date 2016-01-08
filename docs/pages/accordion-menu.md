---
title: Accordion Menu
sass: scss/components/_accordion-menu.scss
js: js/foundation.accordionMenu.js
description: Change a basic vertical Menu into a expandable accordion menu with the Accordion Menu plugin.
---

```html_example
<ul class="vertical menu" data-accordion-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu vertical nested is-active">
      <li>
        <a href="#">Item 1A</a>
        <ul class="menu vertical nested">
          <li><a href="#">Item 1Ai</a></li>
          <li><a href="#">Item 1Aii</a></li>
          <li><a href="#">Item 1Aiii</a></li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
      <li><a href="#">Item 1C</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu vertical nested">
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li><a href="#">Item 3</a></li>
</ul>
```
