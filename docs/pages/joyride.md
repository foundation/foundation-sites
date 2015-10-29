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

<div class="joyride-demo-div"><a class="joyride-demo" id="joyride-1">First</a></div>
<div class="joyride-demo-div"><a class="joyride-demo" id="joyride-2">Second</a></div>
<div class="joyride-demo-div"><a class="joyride-demo" id="joyride-4">Fourth</a></div>
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
  <li data-target="#joyride-3" data-position="bottom center" data-closable="false">
    <h3>Third</h3>
    <p>This one has no close button</p>
  </li>
  <li data-target="#joyride-4">
    <h3>Fourth</h3>
    <p>Your ride ends here!<button class="button success" data-joyride-close>OK, thanks!</button></p>
  </li>

</ol>