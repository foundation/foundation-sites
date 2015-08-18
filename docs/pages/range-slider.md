---
title: Range Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass:
- scss/components/_range-slider.scss
---

## Basic Range Slider
It's got a handle and an active fill, what more do you need?
```html_example
<div class="slider" data-slider>
  <span class="slider-handle"  data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill style="width: 100px;"></span>
  <input type="hidden">
</div>
```
---

## Two-Handled Range Slider
Oh... You might need two handles? Don't fret. We got you covered. Hook it up with another <code>slider-handle</code> span.
```html_example
<div class="slider" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="3"></span>
  <span class="slider-fill" style="left: 100px; width: 100px;"></span>
  <span class="slider-handle" data-slider-handle style="transform: translate(200px, -50%);" role="slider" tabindex="4"></span>
  <input type="hidden">
</div>
```
---

## Disabled Range Slider
U can't touch this. Need to disable a slider? Just add a <code>disabled</code> class to the <code>slider</code> div.
```html_example
<div class="slider disabled" data-slider>
<span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="2"></span>
  <span class="slider-fill" style="width: 100px;"></span>
  <input type="hidden">
</div>
```
---

## Vertical Range Slider
Let's get vertical. Just add a <code>vertical</code> class to <code>slider</code> div.
```html_example
<div class="slider vertical" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 100px);" role="slider" tabindex="5"></span>
  <span class="slider-fill" style="height: 100px"></span>
  <input type="hidden">
</div>
```
---

## Disabled Vertical Range Slider
You know the drill. Just add a <code>disabled</code> class to the vertical slider.
```html_example
<div class="slider vertical disabled" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 100px);" role="slider" tabindex="5"></span>
  <span class="slider-fill" style="height: 100px"></span>
  <input type="hidden">
</div>
```
---

## Two-Handled Range Slider
You can totally add another handle to a vertical range slider. Just add another <code>slider-handle</code> span into the mix.
```html_example
<div class="slider vertical" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 50px);" role="slider" tabindex="6"></span>
  <span class="slider-fill" style="top: 50px; height: 100px"></span>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 150px);" role="slider" tabindex="7"></span>
  <input type="hidden">
</div>
```