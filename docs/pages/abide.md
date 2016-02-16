---
title: Abide
description: Abide is an form validation library that extends the HTML5 validation API with custom validators.
sass: scss/forms/_error.scss
js: js/foundation.abide.js
tags:
  - forms
  - validation
---

### Abide Demo

These input types create a text field: `text`, `date`, `datetime`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `time`, `url`, and `week`.

```html_example
<form data-abide novalidate>
  <div data-abide-error class="alert callout" style="display: none;">
    <p><i class="fi-alert"></i> There are some errors in your form.</p>
  </div>
  <div class="row">
    <div class="small-12 columns">
      <label>Number Required
        <input type="text" placeholder="1234" aria-describedby="exampleHelpText" required pattern="number">
        <span class="form-error">
          Yo, you had better fill this out, it's required.
        </span>
      </label>
      <p class="help-text" id="exampleHelpText">Here's how you use this input field!</p>
    </div>
    <div class="small-12 columns">
      <label>Nothing Required!
        <input type="text" placeholder="Use me, or don't" aria-describedby="exampleHelpTex" data-abide-ignore>
      </label>
      <p class="help-text" id="exampleHelpTex">This input is ignored by Abide using `data-abide-ignore`</p>
    </div>
    <div class="small-12 columns">
      <label>Password Required
        <input type="password" id="password" placeholder="yeti4preZ" aria-describedby="exampleHelpText" required >
        <span class="form-error">
          I'm required!
        </span>
      </label>
      <p class="help-text" id="exampleHelpText">Enter a password please.</p>
    </div>
    <div class="small-12 columns">
      <label>Re-enter Password
        <input type="password" placeholder="yeti4preZ" aria-describedby="exampleHelpText2" required pattern="alpha_numeric" data-equalto="password">
        <span class="form-error">
          Hey, passwords are supposed to match!
        </span>
      </label>
      <p class="help-text" id="exampleHelpText2">This field is using the `data-equalto="password"` attribute, causing it to match the password field above.</p>
    </div>
  </div>
  <div class="row">
    <div class="medium-6 columns">
      <label>URL Pattern, not required, but throws error if it doesn't match the Regular Expression for a valid URL.
        <input type="text" placeholder="http://foundation.zurb.com" pattern="url">
      </label>
    </div>
    <div class="medium-6 columns">
      <label>European Cars, Choose One, it can't be the blank option.
        <select id="select" required>
          <option value=""></option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </label>
    </div>
  </div>
  <div class="row">
    <fieldset class="large-6 columns">
      <legend>Choose Your Favorite, and this is required, so you have to pick one.</legend>
      <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Red</label>
      <input type="radio" name="pokemon" value="Blue" id="pokemonBlue" required><label for="pokemonBlue">Blue</label>
      <input type="radio" name="pokemon" value="Yellow" id="pokemonYellow"><label for="pokemonYellow">Yellow</label>
    </fieldset>
    <fieldset class="large-6 columns">
      <legend>Choose Your Favorite - not required, you can leave this one blank.</legend>
      <input type="radio" name="pockets" value="Red" id="pocketsRed"><label for="pocketsRed">Red</label>
      <input type="radio" name="pockets" value="Blue" id="pocketsBlue"><label for="pocketsBlue">Blue</label>
      <input type="radio" name="pockets" value="Yellow" id="pocketsYellow"><label for="pocketsYellow">Yellow</label>
    </fieldset>
    <fieldset class="large-6 columns">
      <legend>Check these out</legend>
      <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
      <input id="checkbox2" type="checkbox" required><label for="checkbox2">Checkbox 2</label>
      <input id="checkbox3" type="checkbox"><label for="checkbox3">Checkbox 3</label>
    </fieldset>
  </div>
  <div class="row">
    <fieldset class="large-6 columns">
      <button class="button" type="submit" value="Submit">Submit</button>
    </fieldset>
    <fieldset class="large-6 columns">
      <button class="button" type="reset" value="Reset">Reset</button>
    </fieldset>
  </div>
</form>
```
---

<p>&nbsp;</p>

<div class="alert callout">
  <p><i class="fi-alert"></i> There are some errors in your form.</p>
</div>

<label class="is-invalid-label">
  Required Thing
  <input type="text" class="is-invalid-input">
  <span class="form-error is-visible">
    Yo, you had better fill this out.
  </span>
</label>

<label class="is-invalid-label">
  Required Thing
  <textarea type="text" class="is-invalid-input"></textarea>
</label>

## Initial State

```html
<form data-abide>
  <!-- Add "display: none" right away -->
  <div data-abide-error class="alert callout" style="display: none;">
    <p><i class="fi-alert"></i> There are some errors in your form.</p>
  </div>
  <label>
    Name
    <input type="text" required>
    <span class="form-error">This field is required.</span>
  </label>
</form>
```

## Error State

```html
<form data-abide>
  <!-- Add role="alert" -->
  <!-- Add "display: block" -->
  <div data-abide-error role="alert" class="alert callout" style="display: block;">
    <p><i class="fi-alert"></i> There are some errors in your form.</p>
  </div>
  <!-- Add "is-invalid-label" -->
  <label class="is-invalid-label">
    Name
    <!-- Add "is-invalid-input" -->
    <input type="text" class="is-invalid-input" required aria-invalid aria-describedby="uuid">
    <!-- Add "is-visible" -->
    <span class="form-error is-visible" id="uuid">This field is required.</span>
  </label>
</form>
```
## Event Listener
Setup event listener after foundation is initialized (especially for formvalid/forminvalid). Easier to chain via document selector.
* valid.zf.abide and invalid.zf.abide are field level events, triggered in validateInput function 
  *   ev.target is the DOM field element, 
  *   elem is jQuery selector for field element
* formvalid.zf.abide and forminvalid.zf.abide are form events, triggered in validateForm function
  *   ev.target is the DOM form element, 
  *   frm is jQuery selector for form element

```javascript
$(document)
  // field element is invalid
  .on("invalid.zf.abide", function(ev,elem) {
    console.log("Field id "+ev.target.id+" is invalid");
  })
  // field element is valid
  .on("valid.zf.abide", function(ev,elem) {
    console.log("Field name "+elem.attr('name')+" is valid");
  })
  // form validation failed
  .on("forminvalid.zf.abide", function(ev,frm) {
    console.log("Form id "+ev.target.id+" is invalid");
  })
  // form validation passed, form will submit if submit event not returned false
  .on("formvalid.zf.abide", function(ev,frm) {
    console.log("Form id "+frm.attr('id')+" is invalid");
    // ajax post form 
  })
  // to prevent form from submitting upon successful validation
  .on("submit", function(ev) {
    ev.preventDefault();
    console.log("Submit for form id "+ev.target.id+" intercepted");
  });
// You can bind field or form event selectively
$("#foo").on("invalid.zf.abide", function(ev,el) {
  alert("Input field foo is invalid");
});
$("#bar").on("formvalid.zf.abide", function(ev,frm) {
  alert("Form is valid, finally!");
  // do something perhaps
});
  ```
## Adding Custom Pattern and Validator
* Override builtin patterns and validators before foundation is initialized
* Add new patterns and validators before or after foundation is initialized

```javascript
$(document).foundation();
Foundation.Abide.defaults.patterns['dashes_only'] = /^[0-9-]*$/;
Foundation.Abide.defaults.validators['greater_than'] =
function($el,required,parent) {
  // parameter 1 is jQuery selector
  if (!required) return true;
  var from = $('#'+$el.attr('data-greater-than')).val(),
      to = $el.val();
  return (parseInt(to) > parseInt(from));
};
```
```html
<input id="phone" type="text" pattern="dashes_only" required >
<input id="min" type="number" required >
<input id="max" type="number" data-validator="greater_than" data-greater-than="min" required>
```
