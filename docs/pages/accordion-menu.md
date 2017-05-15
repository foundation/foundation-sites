---
title: Accordion Menu
sass: scss/components/_accordion-menu.scss
js: js/foundation.accordionMenu.js
description: Change a basic vertical Menu into a expandable accordion menu with the Accordion Menu plugin.
video: yPGdaMRx60w
---

## Basics

Accordion menus follow the basic [Menu](menu.html) syntax of `<ul>`, `<li>`, and `<a>`. To convert a basic menu into an accordion, add the attribute `data-accordion-menu`. You probably also want it to be vertical, so add the class `.vertical` as well.

Any `<a>` will behave like a standard link. However, any `<a>` paired with a nested `<ul>` menu will then slide that sub-menu up and down when clicked on.

<a class="" data-open-video="0:29"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>

<div class="primary callout">
  <p>You can use the built-in <code>.nested</code> class to add an indent to a nested menu.</p>
</div>

<div class="primary callout">
  <p>To have a sub-menu already open when the page loads, add the class <code>.is-active</code> to that sub-menu.</p>
</div>


<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/IamManchanda/pen/qmKEQr?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/codepen-button.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html
<ul class="vertical menu" data-accordion-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu vertical nested">
      <li><a href="#">Item 1A</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li><a href="#">Item 2</a></li>
</ul>
```

<ul class="vertical menu" data-accordion-menu style="max-width: 250px">
  <li>
    <a href="#">Item 1</a>
    <ul class="menu vertical nested">
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
