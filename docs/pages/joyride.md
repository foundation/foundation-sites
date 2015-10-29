---
title: Joyride
description: Joyride.
sass: scss/components/_joyride.scss
js: js/foundation.joyride.js
---


<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>Inconsistent hover effects on Firefox.</li>
    <li>Broken on Android 4.4 browser and iOS devices w/ Safari.</li>
    <li>Inconsitent position correction on collision events.</li>
  </ul>
</div>


## Basic Joyride
By default, a tooltip appears below the the definition on hover.

```html_example
<p>
...
</p>
```

<style>
.joyride-item {
  background-color: #0a0a0a;
  box-shadow: 0 0 6px rgba(0,0,0,0.5);
  color: #eeeeee;
  display: none;
  padding: 10px 20px;
  position: absolute;
  z-index: 10;
}
[data-joyride] {
  display: none;
}

.joyride-demo-div {
  margin-top: 400px;
}

.joyride-item.top::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: inset 0.75rem;
    border-color: #0a0a0a transparent transparent;
    border-top-style: solid;
    top: 100%;
    bottom: auto;
}
.joyride-item::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: inset 0.75rem;
    border-color: transparent transparent #0a0a0a;
    border-bottom-style: solid;
    bottom: 100%;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}
</style>

<div class="joyride-demo-div"><a class="joyride-demo" id="joyride-1">First</a></div>
<div class="joyride-demo-div"><a class="joyride-demo" id="joyride-2">Second</a></div>
<div class="joyride-demo-div"><a class="joyride-demo" id="joyride-3">Third</a></div>

<ol data-joyride data-autostart="true">
  <li data-target="#joyride-1">
    <h3>First</h3>
    <p>This is the default one without settings</p>
  </li>
  <li data-target="#joyride-2" data-next-text="Weiter" data-prev-text="Zurück">
    <h3>Second</h3>
    <p>This is the default one with custom texts</p>
  </li>
  <li data-target="#joyride-3" data-closable="false">
    <h3>Third</h3>
    <p>This one has no close button</p>
  </li>

</ol>