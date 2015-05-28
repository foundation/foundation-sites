---
title: Switch
description: Now you can tell your users to "flip the switch" or "switch off".
---

## Basics

Add the `.switch` class to an element to create a switch.

```html_example
<div class="switch">
  <input id="exampleCheckboxSwitch" type="checkbox">
  <label for="exampleCheckboxSwitch"></label>
</div> 
```

***

### Radio Switch

Radio switches let a user select ONE of a limited number of choices:

```html_example
<div class="switch small">
  <input id="exampleRadioSwitch1" type="radio" checked name="testGroup">
  <label for="exampleRadioSwitch1"></label>
</div> 

<div class="switch radius">
  <input id="exampleRadioSwitch2" type="radio" name="testGroup">
  <label for="exampleRadioSwitch2"></label>
</div> 

<div class="switch round large">
  <input id="exampleRadioSwitch3" type="radio" name="testGroup">
  <label for="exampleRadioSwitch3"></label>
</div>
```

***

### Switch Sizing

Add `.tiny`, `.small`, `.large`, to change the switch size. The default size needs no sizing class.

```html_example
Tiny Switch
<div class="switch tiny">
  <input id="tinySwitch" type="checkbox">
  <label for="tinySwitch"></label>
</div>
Small Switch
<div class="switch small">
  <input id="smallSwitch" type="checkbox">
  <label for="smallSwitch"></label>
</div> 
Default (Medium) Switch
<div class="switch">
  <input id="defaultSwitch" type="checkbox">
  <label for="defaultSwitch"></label>
</div> 
Large Switch
<div class="switch large">
  <input id="largeSwitch" type="checkbox">
  <label for="largeSwitch"></label>
</div> 
```

***

### Radius and Round

Add `.radius` or `.round` to change the border radius.

```html_example
<div class="switch round">
  <input id="roundSwitch" type="checkbox">
  <label for="roundSwitch"></label>
</div>
<div class="switch radius">
  <input id="radiusSwitch" type="checkbox">
  <label for="radiusSwitch"></label>
</div> 
```

***

### With text inside

```html_example
<div class="switch round">
  <p>Do you like me?</p>
  <input id="yes-no" type="checkbox">
  <label for="yes-no">
    <span class="switch-text-on">Yes</span>
    <span class="switch-text-off">No</span>
  </label>
</div>

<div class="switch large radius">
  <p>Do you like me?</p>
  <input id="ex-2" type="checkbox">
  <label for="ex-2">
    <span class="switch-text-on">Yes</span>
    <span class="switch-text-off">No</span>
  </label>
</div>

<div class="switch small round">
  <p>Do you like me?</p>
  <input id="ex-3" type="checkbox">
  <label for="ex-3">
    <span class="switch-text-on">On</span>
    <span class="switch-text-off">Off</span>
    </label>
</div>

<div class="switch tiny round">
  <p>Do you like me?</p>
  <input id="ex-4" type="checkbox">
  <label for="ex-4"></label>
  <span class="switch-text-on" aria-hidden="true">Yes</span>
  <span class="switch-text-off" aria-hidden="true">No</span>
</div>
```