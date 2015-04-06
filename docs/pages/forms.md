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
