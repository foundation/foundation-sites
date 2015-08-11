---
title: Range Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass:
- scss/components/_range-slider.scss
---

## Basic Range Slider

```html_example
<div class="slider" data-slider>
  <span class="slider-handle" style="left: 25%;" role="slider" tabindex="0"></span>
  <span class="slider-fill" style="width: 25%;"></span>
  <input type="hidden">
</div>
<div class="slider disabled" data-slider>
<span class="slider-handle" style="left: 25%;" role="slider" tabindex="0"></span>
  <span class="slider-fill" style="width: 25%;"></span>
  <input type="hidden">
</div>
<div class="slider" data-slider>
  <span class="slider-handle" style="left: 10%;" role="slider" tabindex="0"></span>
  <span class="slider-fill" style="left: 10%; width: 25%;"></span>
  <span class="slider-handle" style="left: 35%;" role="slider" tabindex="0"></span>
  <input type="hidden">
</div>
<div class="slider vertical" data-slider>
  <span class="slider-handle" style="top: 25%;"role="slider" tabindex="0"></span>
  <span class="slider-fill" style="height: 25%;"></span>
  <input type="hidden">
</div>
<div class="slider vertical" data-slider>
  <span class="slider-handle" style="top: 10%;"role="slider" tabindex="0"></span>
  <span class="slider-fill" style="top: 10%; height: 50%;"></span>
  <span class="slider-handle" style="top: 60%;"role="slider" tabindex="0"></span>
  <input type="hidden">
</div>
```