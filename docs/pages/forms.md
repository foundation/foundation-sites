---
title: Forms
description: We set out to create an easy, powerful and versatile form layout system. A combination of form styles and the Foundation grid means you can do almost anything.
sass: scss/forms/*.scss
---

## Form Basics

Creating a form in Foundation is designed to be easy but extremely flexible. Forms are built with a combination of standard form elements, as well as the Grid (rows and columns).

Form elements in Foundation are styled based on their type attribute rather than a class, and can be sized in a couple of ways:

- You can size inputs using column sizes, like `.large-6`, `.small-6`.
- You can create row elements inside your form and use columns for the form, including inputs, labels and more. Rows inside a form inherit some special padding to even up input spacing.

---

### Abide Demo

These input types create a text field: `text`, `date`, `datetime`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `time`, `url`, and `week`.

```html_example
<form data-abide>
  <div class="row">
    <div class="small-12 columns">
      <label>Input Label
        <input type="text" placeholder=".small-12.columns" aria-describedby="exampleHelpText" required pattern="number">
      </label>
      <p class="help-text" id="exampleHelpText">Here's how you use this input field!</p>
    </div>
  </div>
  <div class="row">
    <div class="medium-6 columns">
      <label>Input Label
        <input type="text" placeholder=".medium-6.columns" pattern="url">
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

### Text Inputs

These input types create a text field: `text`, `date`, `datetime`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `time`, `url`, and `week`.

```html_example
<form>
  <div class="row">
    <div class="small-12 columns">
      <label>Input Label
        <input type="text" placeholder=".small-12.columns" aria-describedby="exampleHelpText">
      </label>
      <p class="help-text" id="exampleHelpText">Here's how you use this input field!</p>
    </div>
  </div>
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
    <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Red</label>
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

## Label Positioning

Sometimes you want a form with labels to the left of your inputs. Piece of cake! You can put the label inside a different column to the left of the input. Then add a class of .right to the label to have it align to the right.

```html_example
<form>
  <div class="row">
    <div class="small-8 columns">
      <div class="row">
        <div class="small-3 columns">
          <label for="right-label" class="right">Label</label>
        </div>
        <div class="small-9 columns">
          <input type="text" id="right-label" placeholder="Right-aligned text input">
        </div>
      </div>
    </div>
  </div>
</form>
```

---

Add the `.middle` class to vertically align the label with its input.

```html_example
<form>
  <div class="row">
    <div class="small-8 columns">
      <div class="row">
        <div class="small-3 columns">
          <label for="middle-label" class="right middle">Label</label>
        </div>
        <div class="small-9 columns">
          <input type="text" id="middle-label" placeholder="Right- and middle-aligned text input">
        </div>
      </div>
    </div>
  </div>
</form>
```

---

## Inline Labels and Buttons

To attach extra text or controls to the left or right of an input field, wrap the elements in an `.input-group` container, then add these classes to the elements inside:

- `.input-group-field` on the text field.
- `.input-group-label` on a text label.
- `.input-group-button` on a button.

```html_example
<div class="input-group">
  <span class="input-group-label">$</span>
  <input class="input-group-field" type="url">
  <a class="input-group-button button">Submit</a>
</div>
```

---

## Accessibility

For the most part, if you stick to standard HTML input types and label them properly, you won't need to worry too much about accessibility. Here are some things to keep in mind.

### Label Inputs

We recommend nesting your inputs inside of their labels, which removes the need to connect them using the `for` attribute.

```html
<label>
  Name
  <input type="text" name="name">
</label>
```

If you need your labels and inputs to be separated, make sure the two are connected so screen readers will know (and to keep the labels clickable!).

```html
<label for="name">Name</label>
<input type="text" name="name" id="name">
```

If an input field doesn't have a label, add the attribute `aria-label` to the input to clarify its purpose.

```html
<input type="text" name="name" aria-label="Name">
```

### Label Help Text

If an input has some sort of help text distinct from the label, it should be connected to the input it describes using the attribute `aria-describedby`.

```html
<label>
  Name
  <input type="text" name="name" aria-describedby="nameHelpText">
</label>
<p id="nameHelpText">Enter your name.</p>
```

### Label Custom Controls

Custom form controls, like date pickers, range sliders, or switches need some extra attention to be made accessible. Our custom inputs, such as the range slider and switch, do most of this work for you.

Custom inputs with labels or help text need the attributes `aria-labelledby` and `aria-describedby` added to them, so screen readers know how to describe the control.

```html
<label id="ageLabel">Age</label>
<div class="range-slider" data-slider>
  <span class="range-slider-handle" role="slider" aria-labelledby="ageLabel" aria-describedby="ageHelpText"></span>
  <span class="range-slider-active-segment"></span>
  <input type="hidden">
</div>
<p id="ageHelpText">How old are you?</p>
```
