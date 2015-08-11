---
title: Tabs
description: Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_tabs.scss
---

## Horizontal

```html_example
<div id='tabstest' data-tabs>
  <ul class="tabs" data-tabs>
    <li class="tab-title is-active"><a href="#panel1">Tab 1</a></li>
    <li class="tab-title"><a href="#panel2">Tab 2</a></li>
    <li class="tab-title"><a href="#panel3">Tab 3</a></li>
    <li class="tab-title"><a href="#panel4">Tab 4</a></li>
    <li class="tab-title"><a href="#panel5">Tab 5</a></li>
    <li class="tab-title"><a href="#panel6">Tab 6</a></li>
  </ul>
  <div class="tabs-content" data-tabs-content>
    <div class="content is-active" id="panel1">
      <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
    </div>
    <div class="content" id="panel2">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="content" id="panel3">
      <p>e dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru</p></div>
    <div class="content" id="panel4">
      <p>Lorem ipsum dolor sit amet, consectetdolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
    <div class="content" id="panel5">
      <p>sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
    <div class="content" id="panel6">
      <p>khasdfkkKHKHKJHKJhksdfkjhsdkjfhsint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
  </div>
</div>
```

---

## Vertical

```html_example
<div class="row collapse" data-tabs>
  <div class="medium-3 columns" id='vertabs'>
    <ul class="tabs vertical" data-tabs>
      <li class="tab-title is-active"><a href="#panel11">Tab 1</a></li>
      <li class="tab-title"><a href="#panel12">Tab 2</a></li>
      <li class="tab-title"><a href="#panel13">Tab 3</a></li>
      <li class="tab-title"><a href="#panel14">Tab 4</a></li>
      <li class="tab-title"><a href="#panel13">Tab 5</a></li>
      <li class="tab-title"><a href="#panel14">Tab 6</a></li>
    </ul>
  </div>
  <div class="medium-9 columns">
    <div class="tabs-content vertical">
      <div class="content is-active" id="panel11">
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
      </div>
      <div class="content" id="panel12">
        <p>jadlfgjladflas;ldfj;saldjf;lasjdf;lkj</p>
    </div>
  </div>
</div>
```
