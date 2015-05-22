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
      <span class="switch-on">Yes</span>
      <span class="switch-off">No</span>
  </label>
</div>
```