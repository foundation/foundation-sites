---
title: Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass: scss/components/_slider.scss
js: js/foundation.slider.js
tags:
  - range
---

## Basics

It's got a handle and an active fill, what more do you need?

```html_example
<div class="slider" data-slider data-initial-start="50" data-end="200">
  <span class="slider-handle"  data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Vertical

Let's get vertical. Just add a `vertical` class and `data-vertical="true"` to `slider` `<div>`.

```html_example
<div class="slider vertical" data-slider data-initial-start="25" data-end="200" data-vertical="true">
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Disabled

U can't touch this. Need to disable a slider? Just add a `disabled` class to the `slider` `<div>`.

```html_example
<div class="slider disabled" data-slider data-initial-start="78">
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Two Handles

Oh... You might need two handles? Don't fret. We got you covered. Hook it up with another `.slider-handle` span and `input` field. This works for horizontal and vertical sliders! Please note that our JavaScript will assign `id`'s for input fields, unless you do so yourself. If you choose not to, handles and inputs will be matched in the order they are in the dom tree.

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

## Data binding

Wait, you want a visible input AND a slider? You're crazy, but ok. Change the value of either and see the other match it. Note that you have to set an `id` for the `input` and add the `aria-controls="idOfInput"` to the slider handle.

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

---

## Native Range Slider

In Foundation 6.2, we introduced styles for `<input type="range">`, the native HTML element for range sliders. It's not supported in every browser, namely IE9 and some older mobile browsers. [View browser support for the range input type.](http://caniuse.com/#feat=input-range)

```html_example
<input type="range" min="1" max="100" step="1">
```

If you're using the Sass version of Foundation, add this line to your main Sass file:

```scss
@include foundation-range-input;
```

It's possible to use both the JavaScript slider and the native slider in the same codebase, as the CSS selectors used don't overlap. Here's what's different about the native slider:

- Less markup: just write `<input type="range">` and you're good.
- No JavaScript is needed, which guarantees it runs faster in most browsers.
- To disable the slider, add `disabled` as an attribute, instead of a class.
- No support for vertical orientation.
- No support for two handles.
