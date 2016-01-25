---
title: Magellan
description: Magellan allows you to create navigation that tracks the active section of a page your user is in. Pair it with our Sticky plugin to create a fixed navigation element.
js: js/foundation.magellan.js
tags:
  - navigation
---
<div data-sticky-container>
  <div class="sticky" id="sticky-magellan" style="width:100%;" data-sticky data-margin-top="0" data-margin-bottom="0" data-top-anchor="setup" data-btm-anchor="destroy:bottom">
    <nav data-magellan class="sticky-mag" data-bar-offset="25">
      <ul class="horizontal menu expanded">
        <li><a href="#setup">Setup</a></li>
        <li><a href="#sticky-navigation">Sticky Navigation</a></li>
        <li><a href="#javascript-reference">JavaScript Reference</a></li>
      </ul>
    </nav>
  </div>
</div>

## Setup

You can use Magellan with any navigation element, like our [Menu](menu.html) or your own custom component. Just add the attribute `data-magellan` to the container, and links to specific sections of your page. Each section needs a unique ID.

```html
<ul class="horizontal menu" data-magellan>
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

You can use Magellan with our Sticky plugin to create a persistent navigation header or sidebar. The first example is a simplified version of the table of contents on the right side of this page, the second is the menu bar floating at the top of the page.

```html
<div class="large-3 columns" data-sticky-container>
  <nav class="columns sticky" data-sticky data-anchor="exampleId" data-sticky-on="large">
    <ul class="vertical menu" data-magellan>
      <li><a href="#first">First Arrival</a></li>
      <li><a href="#second">Second Arrival</a></li>
      <li><a href="#third">Third Arrival</a></li>
    </ul>
  </nav>
</div>



<div data-sticky-container>
  <div class="sticky" id="example" data-sticky data-margin-top="0" style="width:100%;" data-margin-bottom="0" data-top-anchor="topAnchorExample" data-btm-anchor="bottomOfContentId:bottom">
    <nav data-magellan>
      <ul class="horizontal menu expanded">
      <li><a href="#first">First Arrival</a></li>
      <li><a href="#second">Second Arrival</a></li>
      <li><a href="#third">Third Arrival</a></li>
      </ul>
    </nav>
  </div>
</div>
```
