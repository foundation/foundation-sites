---
title: Tabs
description: Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_tabs.scss
js: js/foundation.tabs.js
---

## Basics

There are two pieces to a tabbed interface: the tabs themselves, and the content for each tab. The tabs are an element with the class `.tabs`, and each item has the class `.tabs-title`. Each tab contains a link to a tab. The `href` of each link should match the ID of a tab.

```html
<ul class="tabs" data-tabs id="example-tabs">
  <li class="tabs-title is-active"><a href="#panel1" aria-selected="true">Tab 1</a></li>
  <li class="tabs-title"><a href="#panel2">Tab 2</a></li>
</ul>
```

The tab content container has the class `.tabs-content`, while each section has the class `.tabs-panel`. Each content pane also has a unique ID, which is targeted by a link in the tabstrip.

```html
<div class="tabs-content" data-tabs-content="example-tabs">
  <div class="tabs-panel is-active" id="panel1">
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
  </div>
  <div class="tabs-panel" id="panel2">
    <p>Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
  </div>
</div>
```

Put it all together, and we get this:

<ul class="tabs" data-tabs id="example-tabs">
  <li class="tabs-title is-active"><a href="#panel1" aria-selected="true">Tab 1</a></li>
  <li class="tabs-title"><a href="#panel2">Tab 2</a></li>
  <li class="tabs-title"><a href="#panel3">Tab 3</a></li>
  <li class="tabs-title"><a href="#panel4">Tab 4</a></li>
  <li class="tabs-title"><a href="#panel5">Tab 5</a></li>
  <li class="tabs-title"><a href="#panel6">Tab 6</a></li>
</ul>

<div class="tabs-content" data-tabs-content="example-tabs">
  <div class="tabs-panel is-active" id="panel1">
    <p>one</p>
    <p>Check me out! I'm a super cool Tab panel with text content!</p>
  </div>
  <div class="tabs-panel" id="panel2">
    <p>two</p>
    <img class="thumbnail" src="assets/img/generic/rectangle-7.jpg">
  </div>
  <div class="tabs-panel" id="panel3">
    <p>three</p>
    <p>Check me out! I'm a super cool Tab panel with text content!</p>
  </div>
  <div class="tabs-panel" id="panel4">
    <p>four</p>
    <img class="thumbnail" src="assets/img/generic/rectangle-2.jpg">
  </div>
  <div class="tabs-panel" id="panel5">
    <p>five</p>
    <p>Check me out! I'm a super cool Tab panel with text content!</p>
  </div>
  <div class="tabs-panel" id="panel6">
    <p>six</p>
    <img class="thumbnail" src="assets/img/generic/rectangle-8.jpg">
  </div>
</div>

---

## Vertical Tabs

Add the `.vertical` class to a tabstrip to stack tabs vertically. You can also place the tabstrip and the tab contents in a grid to make them sit side-by-side.

```html_example
<div class="row collapse">
  <div class="medium-3 columns">
    <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
      <li class="tabs-title is-active"><a href="#panel1v" aria-selected="true">Tab 1</a></li>
      <li class="tabs-title"><a href="#panel2v">Tab 2</a></li>
      <li class="tabs-title"><a href="#panel3v">Tab 3</a></li>
      <li class="tabs-title"><a href="#panel4v">Tab 4</a></li>
      <li class="tabs-title"><a href="#panel5v">Tab 5</a></li>
      <li class="tabs-title"><a href="#panel6v">Tab 6</a></li>
    </ul>
    </div>
    <div class="medium-9 columns">
    <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
      <div class="tabs-panel is-active" id="panel1v">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="tabs-panel" id="panel2v">
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
      </div>
      <div class="tabs-panel" id="panel3v">
        <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
      </div>
      <div class="tabs-panel" id="panel4v">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="tabs-panel" id="panel5v">
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="tabs-panel" id="panel6v">
        <img class="thumbnail" src="assets/img/generic/rectangle-5.jpg">
      </div>
    </div>
  </div>
</div>
```

---

## Collapsing Tabs

Add the attribute `data-active-collapse="true"` to a tabstrip to collapse active tabs.

```html_example
<ul class="tabs" data-active-collapse="true" data-tabs id="collapsing-tabs">
  <li class="tabs-title is-active"><a href="#panel1c" aria-selected="true">Tab 1</a></li>
  <li class="tabs-title"><a href="#panel2c">Tab 2</a></li>
  <li class="tabs-title"><a href="#panel3c">Tab 3</a></li>
  <li class="tabs-title"><a href="#panel4c">Tab 4</a></li>
</ul>

<div class="tabs-content" data-tabs-content="collapsing-tabs">
  <div class="tabs-panel is-active" id="panel1c">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  <div class="tabs-panel" id="panel2c">
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
  </div>
  <div class="tabs-panel" id="panel3c">
    <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
  </div>
  <div class="tabs-panel" id="panel4c">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</div>
```

---

## Tabs and URLs

### Browser history

When the `data-deep-link` option is set to `true`, the current state of the tabset is recorded by adding a hash with the tab panel ID to the browser URL when a tab opens. By default, tabs *replace* the browser history (using `history.replaceState()`). Modify this behavior by using attribute `data-update-history="true"` to *append* to the browser history (using `history.pushState()`). In the latter case the browser back button will track each click that opens a tab panel.

By using deep linking (see below), the open state of a page's tabset may be shared by copy-pasting the browser URL.

### Deep linking

Add the attribute `data-deep-link="true"` to a tabstrip to:
- modify the browser history when a tab is clicked
- allow users to open a particular tab at page load with a hash-appended URL

```html_example
<ul class="tabs" data-deep-link="true" data-update-history="true" data-deep-link-smudge="true" data-deep-link-smudge="500" data-tabs id="deeplinked-tabs">
  <li class="tabs-title is-active"><a href="#panel1d" aria-selected="true">Tab 1</a></li>
  <li class="tabs-title"><a href="#panel2d">Tab 2</a></li>
  <li class="tabs-title"><a href="#panel3d">Tab 3</a></li>
  <li class="tabs-title"><a href="#panel4d">Tab 4</a></li>
</ul>

<div class="tabs-content" data-tabs-content="deeplinked-tabs">
  <div class="tabs-panel is-active" id="panel1d">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  <div class="tabs-panel" id="panel2d">
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
  </div>
  <div class="tabs-panel" id="panel3d">
    <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
  </div>
  <div class="tabs-panel" id="panel4d">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</div>
```

For example, <a target="_blank" href="#panel3d">http://example.com/#panel3d</a> will open the third tab panel at page load. This example will open a new browser tab and scroll you to the open tab.

When linking directly to a tab panel, it might not be obvious that the content appears within a tab panel. An additional attribute `data-deep-link-smudge` rolls the page up slightly after deep linking (to a horizontal tabset) so that the tabstrip is at the top of the viewport.

```html_example
<ul class="tabs" data-deep-link="true" data-deep-link-smudge="true" data-deep-link-smudge-delay="600" data-tabs id="deeplinked-tabs-with-smudge">
```
