---
title: Range Slider
description: This handy lil slider is perfect for setting specific values within a range.
sass:
  - scss/components/_range-slider.scss
---

## Basic Range Slider

```html_example
<div class="slider" data-slider>
  <span class="slider-handle" role="slider" tabindex="0"></span>
  <span class="slider-fill" style="width: 25%;"></span>
  <input type="hidden">
</div>
<div class="slider disabled" data-slider>
  <span class="slider-handle" role="slider" tabindex="0"></span>
  <span class="slider-fill" style="width: 25%;"></span>
  <input type="hidden">
</div>
```