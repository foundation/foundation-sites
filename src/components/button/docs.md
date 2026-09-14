## When to use it

Anything the visitor does: submit, save, open, dismiss. Put the class on a `button` for an action and on an `a` for a link that should look like a button. One high-emphasis button per view is a good rule; the rest are medium or low, so the eye finds the main action.

## How it works

Three attributes and no classes. `data-variant` picks a hue from the palette and the button reads that hue's ladder for its fill, its hover step, and its outline text. `data-emphasis` picks how much of the ladder shows: `high` fills, `medium` outlines, `low` is text that tints on hover. `data-size` scales the text and the padding together so the shape holds. Hover, active, focus, disabled, pressed, and busy come from the element's own state, so nothing needs a script to look right.

```html
<a class="button" href="/docs" data-variant="secondary" data-emphasis="medium" data-size="lg">
	<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>
	Read the docs
</a>
```

## Accessibility

A `button` is a button and an `a` is a link; the class changes the look, not the role, so use the element that matches what happens. An icon-only button needs an `aria-label`. A toggle carries `aria-pressed`, and the pressed look follows it. A button that is waiting on a request carries `aria-busy="true"` and `aria-disabled="true"` together: it dims, shows a progress cursor, and your handler ignores presses until the request returns. The focus ring is the page's ring and is never removed. Text over every fill meets AA in both colour schemes; the test suite checks each variant.
