---
title: Progress Bar
description: A simple way to add progress bars to your layouts. You only need two HTML elements to make them, and they're easy to customize.
sass: ./scss/components/_progress-bar.scss
---

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
