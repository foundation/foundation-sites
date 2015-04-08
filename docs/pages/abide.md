---
title: Abide
description: Abide is an form validation library that extends the HTML5 validation API with custom validators.
---

<p>&nbsp;</p>

<div class="form-error is-visible">There were some errors with your form.</div>

<label class="is-invalid-label">
  Required Thing
  <input type="text" class="is-invalid-input">
  <span class="form-error is-visible">
    Yo, you had better fill this out.
  </span>
</label>

<label class="is-invalid-label">
  Required Thing
  <textarea type="text" class="is-invalid-input"></textarea>
</label>

## Initial State

```html
<form data-abide>
  <div class="form-error" data-abide-error>There were some errors in your form submission.</div>
  <label>
    Name
    <input type="text" required>
    <span class="form-error">This field is required.</span>
  </label>
</form>
```

## Error State

```html
<form data-abide>
  <!-- Focus shifts to this element -->
  <div class="form-error is-visible" data-abide-error>There were some errors in your form submission.</div>
  <label class="is-invalid-label">
    Name
    <input type="text is-invalid-input" required aria-invalid aria-describedby="uuid">
    <span class="form-error is-visible" id="uuid">This field is required.</span>
  </label>
</form>
```