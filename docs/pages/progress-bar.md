---
title: Progress Bar
description: Show your progress. A simple way to add progress bars to your layouts. You only need two HTML elements to make them and they're easy to customize.
sass: scss/components/_progress-bar.scss
---

## Basics

A progress bar has two elements: the container `.progress`, and the meter `.progress-meter`. The `role` and `aria-` attributes in the code example clarify the status of the bar:

- `aria-valuemin`: Minimum value.
- `aria-valuemax`: Maximum value.
- `aria-valuenow`: Current value.
- `aria-valuetext`: A human-readable version of `aria-valuenow`.

```html_example
<div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuetext="0 percent" aria-valuemax="100">
  <div class="progress-meter"></div>
</div>
```

Add a `width` CSS property to the inner meter to fill the progress bar.

```html_example
<div class="progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
  <div class="progress-meter" style="width: 50%"></div>
</div>
```

---

## Colors

A progress bar can be styled with the `.success`, `.warning`, and `.alert` colors.

```html_example
<div class="success progress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
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

### Progress Bar with Text

You can add text to a progress bar meter. 

<small>Note: Percentages are easy to fit, but make sure your longer text can fit in the meter if it's set to a lower value.</small>

<div class="progress" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
  <span class="progress-meter" style="width:25%">
    <p class="progress-meter-text">25%</p>
  </span>
</div>

<div class="progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuetext="Step 3: Shipping Info" aria-valuemax="100">
  <span class="progress-meter" style="width:75%">
    <p class="progress-meter-text">Step 2: Shipping Info</p>
  </span>
</div>

