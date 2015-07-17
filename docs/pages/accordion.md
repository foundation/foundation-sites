---
title: Accordions
description: Accordions are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_accordion.scss
---

## Basic Example

//Make classes the same as apps


```html_example
<ul class="accordion" data-accordion role="tablist">
  <li class="accordion-item is-active">
    <a href="#panel1d" role="tab" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <div id="panel1d" class="content active" role="tabpanel" aria-labelledby="panel1d-heading">
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel2d"  role="tab" id="panel2d-heading" aria-controls="panel2d">Accordion 2</a>
    <div id="panel2d" class="content" role="tabpanel" aria-labelledby="panel2d-heading">
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <a href="#panel3d" role="tab" id="panel3d-heading" aria-controls="panel3d">Accordion 3</a>
    <div id="panel3d" class="content" role="tabpanel" aria-labelledby="panel3d-heading">
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>
```