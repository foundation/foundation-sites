---
title: Range Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass:
- scss/components/_range-slider.scss
---

## Basic Range Slider

```html_example
<div class="slider" data-slider>
  <span class="slider-handle"  data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill style="width: 100px;"></span>
  <input type="hidden">
</div>
<div class="slider disabled" data-slider>
<span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="2"></span>
  <span class="slider-fill" style="width: 100px;"></span>
  <input type="hidden">
</div>
<div class="slider" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate(100px, -50%);" role="slider" tabindex="3"></span>
  <span class="slider-fill" style="left: 100px; width: 100px;"></span>
  <span class="slider-handle" data-slider-handle style="transform: translate(200px, -50%);" role="slider" tabindex="4"></span>
  <input type="hidden">
</div>
<div class="slider vertical" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 100px);" role="slider" tabindex="5"></span>
  <span class="slider-fill" style="height: 100px"></span>
  <input type="hidden">
</div>
<div class="slider vertical" data-slider>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 50px);" role="slider" tabindex="6"></span>
  <span class="slider-fill" style="top: 50px; height: 100px"></span>
  <span class="slider-handle" data-slider-handle style="transform: translate( -50%, 150px);" role="slider" tabindex="7"></span>
  <input type="hidden">
</div>
```