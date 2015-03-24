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

This is an example form we've created that is laid out using the grid:

```html
<form>
  <div class="row">
    <div class="large-12 columns">
      <label>Input Label
        <input type="text" placeholder="large-12.columns" aria-describedby="exampleHelpText">
      </label>
      <p class="help-text" id="exampleHelpText">Here's how you use this input field!</p>
    </div>
  </div>
  <div class="row">
    <div class="large-4 columns">
      <label>Input Label
        <input type="text" placeholder="large-4.columns">
      </label>
    </div>
    <div class="large-4 columns">
      <label>Input Label
        <input type="text" placeholder="large-4.columns">
      </label>
    </div>
    <div class="large-4 columns">
      <div class="row collapse">
        <label>Input Label</label>
        <div class="small-9 columns">
          <input type="text" placeholder="small-9.columns">
        </div>
        <div class="small-3 columns">
          <span class="postfix">.com</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <label>Select Box
        <select>
          <option value="husker">Husker</option>
          <option value="starbuck">Starbuck</option>
          <option value="hotdog">Hot Dog</option>
          <option value="apollo">Apollo</option>
        </select>
      </label>
    </div>
  </div>
  <div class="row">
    <div class="large-6 columns">
      <label>Choose Your Favorite</label>
      <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Red</label>
      <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">Blue</label>
    </div>
    <div class="large-6 columns">
      <label>Check these out</label>
      <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
      <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <label>Textarea Label
        <textarea placeholder="small-12.columns"></textarea>
      </label>
    </div>
  </div>
</form>
```

---

## Label Positioning

Sometimes you want a form with labels to the left of your inputs. Piece of cake. You can put the label inside a different column to the left of the input. Then add a class of .right to the label to have it align to the right.

```html
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

```html
<form>
  <div class="row">
    <div class="small-8 columns">
      <div class="row">
        <div class="small-3 columns">
          <label for="middle-label" class="right middle">Label</label>
        </div>
        <div class="small-9 columns">
          <input type="text" id="middle-label" placeholder="Right/middle-aligned text input">
        </div>
      </div>
    </div>
  </div>
</form>
```

---

## Pre/postfix Labels and Actions

Foundation forms support actions tied to buttons, and prefix / postfix labels, through a versatile approach using special grid properties. Essentially you can use `<div class="row collapse">` to create label / action / input combinations. You use the Foundation columns to define the size of the pre/postfix `<span class="postfix">` or `<span class="prefix">`.

```html
<form>
  <div class="row collapse">
    <div class="small-3 large-2 columns">
      <span class="prefix">http://</span>
    </div>
    <div class="small-9 large-10 columns">
      <input type="text" placeholder="Enter your URL...">
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <div class="row collapse">
        <div class="small-10 columns">
          <input type="text" placeholder="Hex Value">
        </div>
        <div class="small-2 columns">
          <a href="#" class="button postfix">Go</a>
        </div>
      </div>
    </div>
  </div>
</form>
```
