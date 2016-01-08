---
title: Switch
description: Now you can tell your users to flip the switch or switch off.
sass: scss/components/_switch.scss
---

## Basics

Add the `.switch` class to an element to create a switch. Inside the switch, add an `<input type="checkbox">` with the class `.switch-input`. Next to that, create a `<label>` with the class `.switch-paddle`.

Give the `<input>` a unique ID and point the `<label>` to it with the `for` attribute. This makes the switch clickable.

<div class="primary callout">
  <p>Inside the switch label is screen reader-only text, which uses the <code>.show-for-sr</code> class to visually mask the text.</p>
</div>

<div class="callout warning">
  <p>Make sure the HTML of the switch goes in the order you see above&mdash;<code>&lt;input&gt;</code>, then <code>&lt;label&gt;</code></p>
</div>

```html_example
<div class="switch">
  <input class="switch-input" id="exampleSwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="exampleSwitch">
    <span class="show-for-sr">Download Kittens</span>
  </label>
</div> 
```

---

## Radio Switch

You can also use `<input type="radio">` instead of `checkbox` to create a series of options.

```html_example
<div class="switch">
  <input class="switch-input" id="exampleRadioSwitch1" type="radio" checked name="testGroup">
  <label class="switch-paddle" for="exampleRadioSwitch1">
    <span class="show-for-sr">Bulbasaur</span>
  </label>
</div>
```

<div class="switch">
  <input class="switch-input" id="exampleRadioSwitch2" type="radio" name="testGroup">
  <label class="switch-paddle" for="exampleRadioSwitch2">
    <span class="show-for-sr">Charmander</span>
  </label>
</div> 

<div class="switch">
  <input class="switch-input" id="exampleRadioSwitch3" type="radio" name="testGroup">
  <label class="switch-paddle" for="exampleRadioSwitch3">
    <span class="show-for-sr">Squirtle</span>
  </label>
</div>

---

## Sizing Classes

Use the classes `.tiny`, `.small`, or `.large` to change the switch size.

```html_example
<div class="switch tiny">
  <input class="switch-input" id="tinySwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="tinySwitch">
    <span class="show-for-sr">Tiny Sandwiches Enabled</span>
  </label>
</div>

<div class="switch small">
  <input class="switch-input" id="smallSwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="smallSwitch">
    <span class="show-for-sr">Small Portions Only</span>
  </label>
</div> 

<div class="switch large">
  <input class="switch-input" id="largeSwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="largeSwitch">
    <span class="show-for-sr">Show Large Elephants</span>
  </label>
</div> 
```

---

## Inner Labels

You can place active and inactive text inside of a switch. The active text (`.switch-active`) only displays when the switch is on, and the inactive text (`.switch-inactive`) only displays when the switch is off.

Active/inactive text goes inside of the switch's `<label>`.

<div class="primary callout">
  <p>Depending on the length of the words you place inside the switch, you may need to fine-tune the <code>left</code> or <code>right</code> CSS properties of the text to get it positioned right.</p>
</div>

<div class="primary callout">
  <p>Add <code>aria-hidden="true"</code> to these labels to prevent AT from reading them.</p>
</div>

```html_example
<p>Do you like me?</p>
<div class="switch large">
  <input class="switch-input" id="yes-no" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="yes-no">
    <span class="show-for-sr">Do you like me?</span>
    <span class="switch-active" aria-hidden="true">Yes</span>
    <span class="switch-inactive" aria-hidden="true">No</span>
  </label>
</div>
```
