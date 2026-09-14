## When to use it

A sidebar pairs something with a natural width, such as a navigation list, a figure, or a form's summary, with content that should take whatever is left. It handles the awkward middle widths on its own: the two sit side by side as long as the content keeps at least half the space, and stack when it cannot.

## How it works

Both children live in a wrapping flex row. The sidebar child gets `data-width` as its basis; the content child grows aggressively from a zero basis and refuses to shrink below half the container. When the container is too narrow for sidebar plus half, the content wraps to its own line and both fill the width. There is no breakpoint; the switch happens wherever the numbers say it should.

```html
<div class="sidebar" data-side="end">
	<article>Main content first in the source.</article>
	<aside>Shown after it.</aside>
</div>
```

## Why this name

The word says exactly what the fixed child is. Foundation 6 built this with `.grid-x` columns and `medium-8`/`medium-4` classes, which fixed the switch to a viewport breakpoint rather than to the content.
