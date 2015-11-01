---
title: Joyride
description: Joyride gives users a tour of your site or app when they visit.
sass: scss/components/_joyride.scss
js: js/foundation.joyride.js
---


<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>Many since this is still a draft.</li>
    <li>Tooltips seem to have quirks when trigger is not within the viewport</li>
  </ul>
</div>

<div class="secondary callout">
  <h5>Features that may be added</h5>
  <ul>
    <li>Change URL with anchor so you can directly open a specific Joyride item</li>
    <li>Support for modals</li>
  </ul>
</div>


## Basic Joyride
Joyride makes use of the Tooltip component, so it is required to also have it included in your project.
You can define your Joyride stops by creating a HTML list and adding the `data-joyride` attribute. Make sure that the `data-target` attribute within the `li`-tags matches the id of the element you want to address.

```html_example
<ol data-joyride data-autostart="true" id="docs-joyride">
  <li data-target="#basic-joyride">
    <h3>First</h3>
    <p>This is the default one without settings</p>
  </li>
  <li data-target="#sass-reference" data-next-text="Weiter" data-prev-text="Zurück">
    <h3>Second</h3>
    <p>This is the default one with custom texts</p>
  </li>
  <li data-target="#js-class" data-position="bottom" data-closable="false">
    <h3>Third</h3>
    <p>This one isn't closable</p>
  </li>
  <li>
    <h3>Fourth</h3>
    <p>If no target is specified, you create a modal.</p>
  </li>
  <li data-target="#trigger-start">
    <h3>Fifth</h3>
    <p>Your ride ends here!</p>
    <button class="button success" data-joyride-close>OK, thanks!</button>
  </li>
</ol>
```
## Trigger start
You can either have the Joyride start on page load, or by defining a button, etc. To enable auto start, set the `data-autostart` attribute of the list to true. A custom trigger can be defined by adding the `data-joyride-start` attribute pointing at the Joyride instance you want to start.

```html_example
<button class="button" data-joyride-start="#docs-joyride">Start Joyride!</button>
```