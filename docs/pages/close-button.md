---
title: Close Button
description: The humble close button can be used anywhere you need something to go away on click.
sass: scss/components/_close-button.scss
---

A close button is a `<button>` element with the class `.close-button`. We use the multiplication symbol (`&times;`) as the X icon. This icon is wrapped in a `<span>` with the attribute `aria-hidden="true"`, so screen readers don't read the X icon.

The button is also labeled with `aria-label` to clarify what the button's purpose is.

```html_example
<div class="callout">
  <button class="close-button" aria-label="Close alert" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
  <p>You can so totally close this!</p>
</div>
```

<div class="callout primary">
  <p>The close button on its own doesn't close elements, but you can use it with <a href="toggler.html">Toggler</a>, <a href="reveal.html">Reveal</a>, <a href="off-canvas.html">Off-canvas</a>, and other plugins that have open and close behaviors.</p>
</div>
