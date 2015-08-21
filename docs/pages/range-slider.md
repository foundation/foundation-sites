---
title: Range Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass: scss/components/_range-slider.scss
---

## Basics

It's got a handle and an active fill, what more do you need?

```html_example
<div class="slider" data-slider>
  <span class="slider-handle"  data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill style="width: 100px;"></span>
  <input type="hidden">
</div>
```

---

## Vertical

Let's get vertical. Just add a `vertical` class to `slider` `<div>`.

```html_example
<div class="slider vertical" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 100px);" role="slider" tabindex="5"></span>
  <span class="slider-fill" style="height: 100px"></span>
  <input type="hidden">
</div>
```

---

## Disabled

U can't touch this. Need to disable a slider? Just add a `disabled` class to the `slider` `<div>`.

```html_example
<div class="slider disabled" data-slider>
<span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="2"></span>
  <span class="slider-fill" style="width: 100px;"></span>
  <input type="hidden">
</div>
```

---

## Two Handles

Oh... You might need two handles? Don't fret. We got you covered. Hook it up with another `.slider-handle` span. This works for horizontal and vertical sliders!

```html_example
<div class="slider" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="3"></span>
  <span class="slider-fill" style="left: 100px; width: 100px;"></span>
  <span class="slider-handle" data-slider-handle style="transform: translate(200px, -50%);" role="slider" tabindex="4"></span>
  <input type="hidden">
</div>
```
