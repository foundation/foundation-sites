---
title: Accordion Menu
js: js/foundation.accordionMenu.js
description: Change a basic vertical menu bar into a expandable accordion menu with the Accordion Menu plugin.
---
```html_example
<div class="vertical menu-bar" data-accordion-menu>
  <li class="has-submenu">
    <a href="#">Item 1</a>
    <ul class="menu-bar vertical nested" data-submenu>
      <li class="has-submenu">
        <a href="#">Item 1A</a>
        <ul class="menu-bar vertical nested" data-submenu>
          <li><a href="#">Item 1Ai</a></li>
          <li><a href="#">Item 1Aii</a></li>
          <li><a href="#">Item 1Aiii</a></li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
      <li><a href="#">Item 1C</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2</a>
    <ul class="menu-bar vertical nested" data-submenu>
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li><a href="#">Item 3</a></li>
</div>
```
