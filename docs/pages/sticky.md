---
title: Sticky
description: Stick nearly anything, anywhere you like!
sass: scss/components/_sticky.scss
js: js/foundation.sticky.js
---

<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>Sticky elements do not vertically position properly after a screen resize if at `position: fixed;` during resize.</li>
    <li>Needs method for elements to be sticky on the top of the viewport when scrolling down, and if the lower breakpoint is reached, stick to bottom on scroll up.</li>
    <li>Needs event listener for `Foundation.MediaQuery` events to pause/disable sticky elements at chosen breakpoints.</li>
    <li>Needs more general testing to ensure elements are only sticky when they should be. Reacts strangely to resize events.</li>
  </ul>
</div>

## Basics

Add the `.sticky` class and `[data-sticky]` to an element to create something that sticks. Sticky elements must be wrapped in a container, which will determine your sizing and grid layout, with `[data-sticky-container]`.

```html
<div class="columns small-6 right" data-sticky-container>
  <div class="sticky" data-sticky>
    <img src="/assets/img/interchange/small.jpg">
  </div>
</div>
```

<!-- ```html_example -->
<div class="row">
  <div class="columns small-12">
    <div class="columns small-6" id="example1">
      <p>
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
      <div class="sticky" data-sticky data-stick-at="#example1">
        <img src="/assets/img/interchange/small.jpg">
      </div>
    </div>
  </div>
</div>

## Advanced

You can add anchors to stick to with `data` attributes and `id`'s, such as: `[data-stick-at='#example2']`. If you want a stopping point other than the bottom of the `stick-at` anchor, use `[data-break-at='#some-other-id']` to set a separate break point.
You can also choose the sticking point, top, bottom, or both. Elements with `[data-stick-to='both']` will stick to the top of the window on scroll down, and if the lower break point is reached, stick to the bottom of the window on scroll up.

<div class='row'>
  <div class='columns small-12'>
    <div class='columns small-6' id='example2'>
      <p>
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
    <div class='columns small-6 right' data-sticky-container>
      <div class="sticky" data-sticky data-stick-at='#example2' data-stick-to="bottom">
        <img src='/assets/img/interchange/small.jpg'>
      </div>
    </div>
  </div>
</div>
<!-- ``` -->
