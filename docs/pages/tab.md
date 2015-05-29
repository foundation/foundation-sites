---
title: Tabs
description: Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.
sass: scss/components/_tabs.scss
---

## Horizontal

```html_example
<ul class="tabs" data-tab>
  <li class="tab-title is-active"><a href="#panel1">Tab 1</a></li>
  <li class="tab-title"><a href="#panel2">Tab 2</a></li>
  <li class="tab-title"><a href="#panel3">Tab 3</a></li>
  <li class="tab-title"><a href="#panel4">Tab 4</a></li>
  <li class="tab-title"><a href="#panel3">Tab 5</a></li>
  <li class="tab-title"><a href="#panel4">Tab 6</a></li>
</ul>
<div class="tabs-content">
  <div class="content is-active" id="panel1">
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
  </div>
  <div class="content" id="panel2">
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
  </div>
</div>
```

---

## Vertical

```html_example
<div class="row collapse">
  <div class="medium-3 columns">
    <ul class="tabs vertical" data-tab>
      <li class="tab-title is-active"><a href="#panel1">Tab 1</a></li>
      <li class="tab-title"><a href="#panel2">Tab 2</a></li>
      <li class="tab-title"><a href="#panel3">Tab 3</a></li>
      <li class="tab-title"><a href="#panel4">Tab 4</a></li>
      <li class="tab-title"><a href="#panel3">Tab 5</a></li>
      <li class="tab-title"><a href="#panel4">Tab 6</a></li>
    </ul>
    </div>
    <div class="medium-9 columns">
    <div class="tabs-content vertical">
      <div class="content is-active" id="panel1">
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
      </div>
      <div class="content" id="panel2">
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
      </div>
    </div>
  </div>
</div>
```