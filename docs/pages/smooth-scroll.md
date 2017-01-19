---
title: Smooth Scroll
description: Allows internal links smooth scrolling.
js: js/foundation.smoothScroll.js
tags:
  - navigation
---

## Usage

To enable smooth scrolling on internal links add the attribute `data-smooth-scroll` to the parent container like our [Menu](menu.html). Each section needs a unique ID

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

You can also apply `data-smooth-scroll` attribute directly to the link.

```html
<a href="#exclusive" data-smooth-scroll>Exclusive Section</a>
<section id="exclusive">The Exclusive Section</section>
```

---
