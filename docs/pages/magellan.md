---
title: Magellan
description: Magellan allows you to create navigation that tracks the active section of a page your user is in. Pair it with our Sticky plugin to create a fixed navigation element.
js: js/foundation.magellan.js
tags:
  - navigation
---

<nav data-magellan>
  <ul class="horizontal menu-bar">
    <li><a href="#setup">Setup</a></li>
    <li><a href="#sticky-navigation">Sticky Navigation</a></li>
    <li><a href="#sass-reference">Sass Reference</a></li>
    <li><a href="#javascript-reference">JavaScript Reference</a></li>
  </ul>
</nav>

## Setup

You can use Magellan with any navigation element, like our [menu bar](menu-bar.html) or your own custom component. Just add the attribute `data-magellan` to the container, and links to specific sections of your page. Each section needs a unique ID.

```html
<ul class="horizontal menu-bar" data-magellan>
  <li><a href="#first">First Arrival</a></li>
  <li><a href="#second">Second Arrival</a></li>
  <li><a href="#third">Third Arrival</a></li>
</ul>
<div class="sections">
  <section id="first" data-magellan-target="first">First Section</section>
  <section id="second" data-magellan-target="second">Second Section</section>
  <section id="third" data-magellan-target="third">Third Section</section>
</div>
```

## Sticky Navigation

You can use Magellan with our Sticky plugin to create a persistent navigation header or sidebar.

```html
<div data-sticky="header">
  <ul class="horizontal menu-bar" data-magellan>
    <li><a href="#first">First Arrival</a></li>
    <li><a href="#second">Second Arrival</a></li>
    <li><a href="#third">Third Arrival</a></li>
  </ul>
</div>
```
