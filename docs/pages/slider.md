---
title: Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass: scss/components/_slider.scss
js: js/foundation.slider.js
tags:
  - range
---

## Basics

Create a slider by adding the class `.slider` and the attribute `data-slider` to a container element. You should also define both a starting and maximum value for the slider.

Inside the container are three elements:
- The handle (`.slider-handle`), which the user drags.
- The fill (`.slider-fill`), which resizes dynamically based on where the handle is.
- A hidden `<input>`, which is where the value of the slider is stored.

```html_example
<div class="slider" data-slider data-initial-start="50" data-end="200">
  <span class="slider-handle"  data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Vertical

To get *vertical*, just add a `.vertical` class and `data-vertical="true"` the slider.

```html_example
<div class="slider vertical" data-slider data-initial-start="25" data-end="200" data-vertical="true">
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Disabled

Add the class `.disabled` to disable interaction with the slider.

```html_example
<div class="slider disabled" data-slider data-initial-start="78">
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Two Handles

Two-handle sliders can be used to define a range of values, versus a single value. To make a two-handle slider, add a second handle, and a second `<input>`. This works with horizontal and vertical sliders.

You can add IDs to the `<input>`s inside the sliders to make it easier to access the values. If you don't, the plugin will add an ID to each for you.

Note that the first handle manipulates the first `<input>`, while the second handle manipulates the second `<input>`.

```html_example
<div class="slider" data-slider data-initial-start="25" data-initial-end="75">
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <input type="hidden">
  <input type="hidden">
</div>
```

---

## Data Binding

Data binding allows you to connect the slider to an external `<input>` field. With data binding set up, dragging the handle will change the value inside the text field, and editing the number in the text field will move the slider in real-time.

To set it all up, create an `<input>` with an ID and add `aria-controls="id"` to the slider handle, where `id` is the ID of the `<input>`.

```html_example
<div class="small-10 columns">
  <div class="slider" data-slider data-initial-start="50">
    <span class="slider-handle"  data-slider-handle role="slider" tabindex="1" aria-controls="sliderOutput1"></span>
    <span class="slider-fill" data-slider-fill></span>
  </div>
</div>
<div class="small-2 columns">
  <input type="number" id="sliderOutput1">
</div>
```
