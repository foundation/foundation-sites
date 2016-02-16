---
title: Equalizer
description: Equalizer makes it dead simple to give multiple items equal height.
js: js/foundation.equalizer.js
---

## Basics

To set up an Equalizer group, you need a container, which gets the attribute `data-equalizer`, and then a series of child elements, which get the attribute `data-equalizer-watch`. The child elements will all be resized to have the same height.

```html_example
<div class="row" data-equalizer data-equalize-on="medium" id="test-eq">
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <img src= "assets/img/generic/square-1.jpg">
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <p>Pellentesque habitant morbi tristique senectus et netus et, ante.</p>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <img src= "assets/img/generic/rectangle-1.jpg">
    </div>
  </div>
</div>
```

## Nesting

To use one Equalizer inside another, each container needs a unique ID, assigned with the `data-equalizer` attribute. Each `data-equalizer-watch` element should then have a value that matches its parent.

In the below example, the first set of Equalizer elements have the value `foo`, while the inside elements have the value `bar`. In the live example, we've also set the `equalizeOn` option to 'medium' for the parent elements, and the child Equalizer contained in the first div equalizes on stack, and maintains equal height.

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

<div class="row"  data-equalize-on="medium" data-equalizer="foo">
  <div class="medium-4 columns" >
    <div class="callout" data-equalizer-watch="foo" data-equalizer="bar">
      <h3>Parent panel</h3>
      <div class="callout" data-equalizer-watch="bar">
        <p>The three callouts in this panel will equalize, even when stacked.</p>
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
      <p>Where these panels will not equalize on stack, and instead equalize on medium up.</p>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch="foo">
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
    </div>
  </div>
</div>

## Responsive Equalizer
### Equalize row by row

Equalize elements on a per-row basis. Please note, that because this involves quite a bit of looping through elements, you may notice a performance decrease by using this feature and resizing your screen rapidly.

<div class="callout success">
  <strong>Works great with Block-Grid</strong>
</div>

<div class="callout primary">
  <strong>Under the Hood</strong><br>
  <p>Equalizer splits the `data-equalizer-watch` elements into groups by checking the top position and then sets the max height to each element in a row</p>
  <p>Be aware on what you set the `data-equalizer-watch`, if the top position is different, equalizer will interpret that as a new 'row' and equalize accordingly.</p>
</div>

```html_example
<div class="row" data-equalizer data-equalize-by-row="true">
  <div class="small-12 medium-6 large-4 columns">
    <div class="callout clearfix">
      <div data-equalizer-watch>
        <h5>Login</h5>
        <p>Login Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt magni quia unde laboriosam tempore et quibusdam. Quibusdam maxime sit atque!</p>
      </div>
      <a href="#" class="button success expanded">Login</a> </div>
  </div>
  <div class="small-12 medium-6 large-4 columns">
    <div class="callout clearfix">
      <div data-equalizer-watch>
        <h5>Create Account</h5>
        <p>You can create an account here Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, assumenda, molestiae. Laboriosam et exercitationem, veniam odit, dicta illum corporis, placeat voluptates fuga, expedita distinctio quae magnam temporibus porro quas eius.</p>
      </div>
      <a href="#" class="button expanded">Create account</a> </div>
  </div>
  <div class="small-12 medium-12 large-4 columns">
    <div class="callout clearfix">
      <div data-equalizer-watch>
        <h5>Social Login</h5>
        <p>Social Networks Login Text</p>
      </div>
      <a href="#" class="button hollow expanded">Login</a> </div>
  </div>
</div>
```
<br>
<hr>
<p class="lead">Equalized Block Grid</p>
<div class="row small-up-1 medium-up-2 large-up-4" data-equalizer data-equalize-by-row="true">
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <img src="//placehold.it/180x200" class="thumbnail" alt="">
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <img src="//placehold.it/180x180" class="thumbnail" alt="">
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <img src="//placehold.it/180x400" class="thumbnail" alt="">
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <img src="//placehold.it/180x200" class="thumbnail" alt="">
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <img src="//placehold.it/180x180" class="thumbnail" alt="">
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <p>Lorem ipsum dolor sit amet<p>
    </div>
  </div>
  <div class="column">
    <div class="callout" data-equalizer-watch>
      <img src="//placehold.it/180x400" class="thumbnail" alt="">
    </div>
  </div>
</div>
