---
title: Close Button
description: The humble close button can be used anywhere you need something to go away on click.
---

Creating a close button is as simple as adding the `.close-button` class to an element. We recommend using a `<button>` element, as opposed to an `<a>`. For the text of the button, we use the times symbol (`&times;`) instead of an X, because it's symmetrical.

```html
<div class="callout">
  <button class="close-button">&times;</button>
  <p>You can so totally close this!</p>
</div>
```

<div class="callout" style="position: relative;">
  <button class="close-button">&times;</button>
  <p>You can so totally close this!</p>
</div>

For accessibility purposes, add a label to the close button using the `aria-label` attribute. A screen reader won't know what a times symbol or X means, so adding a label helps our users who can't see the control.

```html
<div class="callout">
  <button class="close-button" aria-label="Close alert">&times;</button>
  <p>Now screen readers will know what on earth that &times; does.</p>
</div>
```

<div class="callout" style="position: relative;">
  <button class="close-button" aria-label="Close alert">&times;</button>
  <p>Now screen readers will know what on earth that &times; does.</p>
</div>