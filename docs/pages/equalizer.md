---
title: Equalizer
description: Equalizer makes it dead simple to give multiple items equal height.
js: js/foundation.equalizer.js
---

## Basics

To set up an Equalizer group, you need a container, which gets the attribute `data-equalizer`, and then a series of child elements, which get the attribute `data-equalizer-watch`. The child elements will all be resized to have the same height.

```html_example
<div class="row" data-equalizer id="test-eq">
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <img src= "assets/img/square-1.jpg">
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <p>Pellentesque habitant morbi tristique senectus et netus et, ante.</p>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <img src= "assets/img/rectangle-1.jpg">
    </div>
  </div>
</div>
```

## Nesting

To use one Equalizer inside another, each container needs a unique ID, assigned with the `data-equalizer` attribute. Each `data-equalizer-watch` element should then have a value that matches its parent.

In the below example, the first set of Equalizer elements have the value `foo`, while the inside elements have the value `bar`.

```html
<div class="row" data-equalizer="foo">
  <div class="medium-4 columns" data-equalizer-watch="foo">
    <div class="callout" data-equalizer="bar">
      <h3>Parent panel</h3>
      <div class="callout" data-equalizer-watch="bar"></div>
      <div class="callout" data-equalizer-watch="bar"></div>
      <div class="callout" data-equalizer-watch="bar"></div>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout panel" data-equalizer-watch="foo"></div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch="foo"></div>
  </div>
</div>
```

<div class="row" data-equalizer="foo">
  <div class="medium-4 columns" data-equalizer-watch="foo">
    <div class="callout" data-equalizer="bar">
      <h3>Parent panel</h3>
      <div class="callout" data-equalizer-watch="bar">
        <p>Pellentem, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
      </div>
      <div class="callout" data-equalizer-watch="bar">
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
      </div>
      <div class="callout" data-equalizer-watch="bar">
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
      </div>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout panel" data-equalizer-watch="foo">
      <p>Pellentesque habitant morbi tristique senectus et netus et, ante.</p>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch="foo">
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
    </div>
  </div>
</div>
