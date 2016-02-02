---
title: Forms
description: We set out to create an easy, powerful and versatile form layout system. A combination of form styles and the Foundation grid means you can do almost anything.
sass:
  - scss/forms/*.scss
  - '!scss/forms/_error.scss'
tags:
  - input
  - select
  - radio
  - checkbox
flex: true
---

## Form Basics

Creating a form in Foundation is designed to be easy but extremely flexible. Forms are built with a combination of standard form elements, as well as grid rows and columns.

---

### Text Inputs

These input types create a text field: `text`, `date`, `datetime`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `time`, `url`, and `week`.

```html_example
<form>
  <div class="row">
    <div class="medium-6 columns">
      <label>Input Label
        <input type="text" placeholder=".medium-6.columns">
      </label>
    </div>
    <div class="medium-6 columns">
      <label>Input Label
        <input type="text" placeholder=".medium-6.columns">
      </label>
    </div>
  </div>
</form>
```

---

#### Number Inputs

In most desktop browsers, `<input type="number">` elements will have up/down controls inside them, which increment and decrement the number inside the field. These are called *spin buttons*. You can disable them by setting the `$input-number-spinners` Sass variable to `false`.

```html_example
<label>
  How many puppies?
  <input type="number" value="100">
</label>
```

---

#### Text Areas

The `<textarea>` element creates a multi-line text input.

```html_example
<label>
  What books did you read over summer break?
  <textarea placeholder="None"></textarea>
</label>
```

---

### Select Menus

Use select menus to combine many choices into one menu.

```html_example
<label>Select Menu
  <select>
    <option value="husker">Husker</option>
    <option value="starbuck">Starbuck</option>
    <option value="hotdog">Hot Dog</option>
    <option value="apollo">Apollo</option>
  </select>
</label>
```

---

### Checkboxes and Radio Buttons

Use groups of checkboxes when the user may select multiple choices from a list, and use radio buttons when the user must select just one choice.

Wrap a group of checkboxes or radio buttons in a `<fieldset>` element, and give them a common label using the `<legend>` element. Each individual control should also have its own label, created using a typical `<label>`.

```html_example
<div class="row">
  <fieldset class="large-6 columns">
    <legend>Choose Your Favorite</legend>
    <input type="radio" name="pokemon" value="Red" id="pokemonRed" required><label for="pokemonRed">Red</label>
    <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">Blue</label>
    <input type="radio" name="pokemon" value="Yellow" id="pokemonYellow"><label for="pokemonYellow">Yellow</label>
  </fieldset>
  <fieldset class="large-6 columns">
    <legend>Check these out</legend>
    <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
    <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>
    <input id="checkbox3" type="checkbox"><label for="checkbox3">Checkbox 3</label>
  </fieldset>
</div>
```

---

### Fieldset Styles

To encourage their use as an accessibility tool, the `<fieldset>` element is no longer styled by default. Those styles are now contained in the `.fieldset` class.

```html_example
<fieldset class="fieldset">
  <legend>Check these out</legend>
  <input id="checkbox12" type="checkbox"><label for="checkbox12">Checkbox 1</label>
  <input id="checkbox22" type="checkbox"><label for="checkbox22">Checkbox 2</label>
  <input id="checkbox32" type="checkbox"><label for="checkbox32">Checkbox 3</label>
</fieldset>
```

---

## Help Text

Place help text below a field to clarify it's purpose. Whenever you use help text, give the text a unique ID, and add the attribute `aria-describedby` to the input.

```html_example
<label>Password
  <input type="password" aria-describedby="passwordHelpText">
</label>
<p class="help-text" id="passwordHelpText">Your password must have at least 10 characters, a number, and an Emoji.</p>
```

---

## Label Positioning

Sometimes you want a form with labels to the left of your inputs. Piece of cake! You can put the label inside a different column to the left of the input. Then use the class `.text-right` or `.float-right` (or add `text-align: right` yourself) to realign the label.

<div class="warning callout">
  <p>In a <a href="rtl.html">right-to-left</a> environment, use <code>.float-left</code> instead.</p>
</div>

```html
<form>
  <div class="row">
    <div class="small-3 columns">
      <label for="right-label" class="text-right">Label</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="right-label" placeholder="Right-aligned text input">
    </div>
  </div>
</form>
```

<div class="medium-8 column row">
  <div class="row">
    <div class="small-3 columns">
      <label for="right-label" class="text-right">Label</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="right-label" placeholder="Right-aligned text input">
    </div>
  </div>
</div>

---

Add the `.middle` class to vertically align the label with its input.

```html
<form>
  <div class="row">
    <div class="small-3 columns">
      <label for="middle-label" class="text-right middle">Label</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="middle-label" placeholder="Right- and middle-aligned text input">
    </div>
  </div>
</form>
```

<div class="medium-8 column row">
  <div class="row">
    <div class="small-3 columns">
      <label for="middle-label" class="text-right middle">Label</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="middle-label" placeholder="Right- and middle-aligned text input">
    </div>
  </div>
</div>

---

## Inline Labels and Buttons

To attach extra text or controls to the left or right of an input field, wrap the elements in an `.input-group` container, then add these classes to the elements inside:

- `.input-group-field` on the text field.
- `.input-group-label` on a text label.
- `.input-group-button` on a button. **Place the button inside this wrapper.**

<div class="primary callout">
  <p>This component supports flexbox mode. <a href="#">Learn how to enable flexbox mode</a>.</p>
</div>

```html_example
<div class="input-group">
  <span class="input-group-label">$</span>
  <input class="input-group-field" type="number">
  <div class="input-group-button">
    <input type="submit" class="button" value="Submit">
  </div>
</div>
```

---

## File Upload Button

Use `<input type="file">` to create a file upload button. For security reasons, most browsers don't let you style file inputs. To work around that, we can style a form label as a button, and point it to the `<input>`. To properly mask the input, the `.show-for-sr` class is added.

```html_example
<label for="exampleFileUpload" class="button">Upload File</label>
<input type="file" id="exampleFileUpload" class="show-for-sr">
```

---

## Custom Controls

Custom form controls, like date pickers, range sliders, or switches need some extra attention to be made accessible. Our custom inputs, such as the range slider and switch, do most of this work for you.

Custom inputs with labels or help text need the attributes `aria-labelledby` and `aria-describedby` added to them, so screen readers know how to describe the control.

```html
<label id="ageLabel">Age</label>
<div class="slider" aria-labelledby="ageLabel" aria-describedby="ageHelpText" data-slider data-initial-start='50' data-end='200'>
  <span class="slider-handle"  data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
<p id="ageHelpText">How old are you?</p>
```
