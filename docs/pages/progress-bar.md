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

## Basics

A progress bar has two elements: the container (`.progress`), and the meter (`.progress-meter`).

```html_example
<div class="progress">
  <div class="progress-meter"></div>
</div>
```

Add a `width` property to the inner meter to fill the progress bar.

```html_example
<div class="progress">
  <div class="progress-meter" style="width: 50%"></div>
</div>
```

---

## Colors

A progress bar can be styled with the `.success`, `.warning`, and `.alert` colors.

```html_example
<div class="success progress">
  <div class="progress-meter" style="width: 25%"></div>
</div>

<div class="warning progress">
  <div class="progress-meter" style="width: 50%"></div>
</div>

<div class="alert progress">
  <div class="progress-meter" style="width: 75%"></div>
</div>
```

---

## Stacked Bars

Multiple meters of different colors can be stacked within one bar.

```html_example
<div class="progress">
  <div class="alert progress-meter" style="width: 25%"></div>
  <div class="warning progress-meter" style="width: 25%"></div>
  <div class="success progress-meter" style="width: 25%"></div>
</div>
```
---

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

