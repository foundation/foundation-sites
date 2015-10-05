---
title: Range Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass: scss/components/_range-slider.scss
js: js/foundation.range-slider.js
---


<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>Needs method for initial handle positioning.</li>
    <li>Needs accessibility compliant keyboard access bindings.</li>
    <li>Strange bug when click event is exactly halfway between left and right handles, fill bar flows to the left.</li>
    <li>Needs resize event handler, and handles positioned by percentage.</li>
    <li>Vertical orientation isn't smooth on Windows Phone.</li>
    <li>Two-handled sliders not working in Firefox.</li>
    <li>Data-binding not yet implemented fully.</li>
    <li>iOS Safari leaves strange artifacts of handles on reposition.</li>
    <li>Android 4.4 browser transitions not working, handles are snapping to location.</li>
    <li>Postioning of single handles not quite correct on Firefox, it leaves a small gap between the fill and handle.</li>

  </ul>
</div>


## Basics

It's got a handle and an active fill, what more do you need?

```html_example
<div class="slider" data-slider data-initial-start='50'>
  <span class="slider-handle"  data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```

---

## Vertical

Let's get vertical. Just add a `vertical` class to `slider` `<div>`.

```html_example
<div class="slider vertical" data-slider data-initial-start='25'>
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>
```



<!-- ```html_example
<div class="slider vertical" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 100px);" role="slider" tabindex="5" aria-controls='vertSlideOutput'></span>
  <span class="slider-fill" style="height: 100px"></span>
</div>

<input type='number' id='vertSlideOutput'>
``` -->

---

## Disabled

U can't touch this. Need to disable a slider? Just add a `disabled` class to the `slider` `<div>`.

```html_example
<!-- <div class="slider disabled" data-slider data-initial-start='33'>
<span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div> -->
```

---

## Two Handles

Oh... You might need two handles? Don't fret. We got you covered. Hook it up with another `.slider-handle` span and `input` field. This works for horizontal and vertical sliders! Please note that our JavaScript will assign `id`'s for input fields, unless you do so yourself. If you choose not to, handles and inputs will be matched in the order they are in the dom tree.

```html_example
<!-- <div class="slider" data-slider data-initial-start='25' data-initial-end='75'>
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <input type="hidden">
  <input type="hidden">
</div> -->
```

<!-- <div class="slider" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="3" aria-controls='check1' ></span>
  <span class="slider-fill" style="left: 100px; width: 100px;"></span>
  <span class="slider-handle" data-slider-handle style="transform: translate(200px, -50%);" role="slider" tabindex="4" aria-controls='check2' ></span>
</div>
<div>
  <input id='check1' type="number">
  <input id='check2' type="number">
</div> -->

---

## Data binding

Wait, you want a visible input AND a slider? You're crazy, but ok. Change the value of either and see the other match it. Note that you have to set an `id` for the `input` and add the `aria-controls='idOfInput'` to the slider handle.

```html_example
<!-- <div class='small-10 columns'>
<div class="slider" data-slider data-initial-start='50' >
  <span class="slider-handle"  data-slider-handle role="slider" tabindex="1" aria-controls='sliderOutput1'></span>
  <span class="slider-fill" data-slider-fill></span>
</div>
</div>
<div class='small-2 columns'>
  <input type="number" id='sliderOutput1'>
</div> -->
```
