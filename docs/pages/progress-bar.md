---
title: Progress Bar
description: Show your progress. A simple way to add progress bars to your layouts. You only need two HTML elements to make them and they're easy to customize.
sass: scss/components/_progress-bar.scss
---

## Basic Progress Bar

You can create a progress bar using minimal markup.

```html_example
<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
  <span class="progress-bar-meter"></span>
</div>
```

***

### Progress Bar Meter Width

You can change the width of the progress meter by adding `style="width: [1 - 100]%"`. By default, the meter width will be 100%.

```html_example
<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
  <span class="progress-bar-meter" style="width:75%"></span>
</div>
```

***

### Progress Bar Color Modifiers

You can easily change the color of a progress meter by adding a class. Available classes include `.alert`, `.success`, `.secondary`. As usual, `.primary` is default so you do not need to define it.

```html_example
<div class="progress-bar success" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25">
  <span class="progress-bar-meter" style="width:25%"></span>
</div>

<div class="progress-bar alert" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
  <span class="progress-bar-meter" style="width:50%"></span>
</div>

<div class="progress-bar secondary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="75">
  <span class="progress-bar-meter" style="width:75%"></span>
</div>

<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">
  <span class="progress-bar-meter"></span>
</div>
```

***

### Progress Bar Radius

```html_example
<div class="progress-bar radius" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25">
  <span class="progress-bar-meter" style="width:25%"></span>
</div>

<div class="progress-bar round" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
  <span class="progress-bar-meter" style="width:50%"></span>
</div>

```

***

### Progress Bar with Text

You can add text to a progress bar meter. 

<small>Note: Percentages are easy, but make sure your longer text can fit in the meter if it's set to a lower value.</small>

<div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuetext="65 percent" aria-valuemax="100">
  <span class="progress-bar-meter" style="width:65%">
    <p class="progress-bar-text">65%</p>
  </span>
</div>

<div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuetext="Step 2: Shipping Info" aria-valuemax="100">
  <span class="progress-bar-meter" style="width:25%">
    <p class="progress-bar-text">Step 2: Shipping Info</p>
  </span>
</div>