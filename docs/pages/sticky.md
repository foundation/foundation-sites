---
title: Sticky
description: Stick nearly anything, anywhere you like!
js: js/foundation.sticky.js
---

## Basics

Add the `.sticky` class and `[data-sticky]` to an element to create something that sticks. Sticky elements must be wrapped in a container, which will determine your sizing and grid layout, with `[data-sticky-container]`.

```html
<div class="columns small-6 right" data-sticky-container>
  <div class="sticky" data-sticky data-margin-top="0">
    <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
    <!-- This sticky element would stick to the window, with a marginTop of 0 -->
  </div>
</div>


<div class="columns small-6 right" data-sticky-container>
  <div class="sticky" data-sticky data-anchor="#foo">
    <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
    <!-- This sticky element would stick to the window for the height of the element #foo, with a 1em marginTop -->
  </div>
</div>
```

<!-- ```html_example -->
<div class="row">
  <div class="columns small-12">
    <div class="columns small-6" id="example1" data-something>
      <p id="doodle">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div class="columns small-6 right" data-sticky-container>
      <div class="sticky" data-sticky data-anchor="example1">
        <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
      </div>
    </div>
  </div>
</div>

## Advanced

You can also use two anchors, if you please. Using `data-top-anchor="idOfSomething"`, `data-btm-anchor="idOfSomething:[top/bottom]"`, or a set pixel number `data-top-anchor="150"`. If you use an element id with no top/bottom specified, it defaults to the top.

```html
<div class="columns small-6 right" data-sticky-container>
  <div class="sticky" data-sticky data-top-anchor="example2" data-btm-anchor="foo:bottom">
    <img class="thumbnail" src="assets/img/generic/rectangle-5.jpg">
  </div>
</div>
```


<div class="row">
  <div class="columns small-12">
    <div class="columns small-6" id="example2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p id="foo">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div class="columns small-6 right" data-sticky-container>
      <div class="sticky" data-sticky data-top-anchor="example2:top" data-btm-anchor="foo" data-stick-to="bottom">
        <img class="thumbnail" src="assets/img/generic/rectangle-5.jpg">
      </div>
    </div>
  </div>
</div>

## Sticky Navigation

Sometimes you want a sticky nav bar or side nav, this is pretty simple, but does involve an extra step from Foundation 5's `sticky` class addition to Top Bar. The minimum to make a stick nav bar is below, and you can swap out `.title-bar` for another menu component. Please note the style `width:100%`, you can do it inline, or in your style sheets.

```html
<div data-sticky-container>
  <div class="title-bar" data-sticky data-options="marginTop:0;" style="width:100%">
    <div class="title-bar-left"><!-- Content --></div>
    <div class="title-bar-right"><!-- Content --></div>
  </div>
</div>
```
With the minimum markup above, your nav bar will be sticky for the entire page. You could change this up by using anchor points, so it sticks and breaks at important markers on the page. A top anchor point of '1' will make it stick at the top of the page, a bottom anchor of `content:bottom` will make it break at the bottom of your `#content` element. This is useful if you want a sticky nav element, but not for the full length of the page.
```html
<div data-sticky-container>
  <div class="title-bar" data-sticky data-options="marginTop:0;" style="width:100%" data-top-anchor="1" data-btm-anchor="content:bottom">
    <div class="title-bar-left"><!-- Content --></div>
    <div class="title-bar-right"><!-- Content --></div>
  </div>
</div>
```

<iframe src="./assets/partials/sticky-nav.html" width="100%" height="300px" frameborder="0"></iframe>
<!-- ``` -->
