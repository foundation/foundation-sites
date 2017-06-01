---
title: Smooth Scroll
description: Allows internal links smooth scrolling.
js: js/foundation.smoothScroll.js
tags:
  - navigation
---

<ul class="menu align-center" data-smooth-scroll>
  <li><a href="#setup">Setup</a></li>
  <li><a href="#javascript-reference">Javascript Reference</a></li>
</ul>

<hr>

## Setup

To enable SmoothScroll on internal links, just add the attribute `data-smooth-scroll` to the parent container like our [Menu](menu.html). Each section needs a unique ID

```html
<ul class="horizontal menu" data-smooth-scroll>
  <li><a href="#first">First Arrival</a></li>
  <li><a href="#second">Second Arrival</a></li>
  <li><a href="#third">Third Arrival</a></li>
</ul>
<div class="sections">
  <section id="first">First Section</section>
  <section id="second">Second Section</section>
  <section id="third">Third Section</section>
</div>
```

You can also setup SmoothScroll directly via individual link.

```html
<a href="#exclusive" data-smooth-scroll>Exclusive Section</a>
<section id="exclusive">The Exclusive Section</section>
```
