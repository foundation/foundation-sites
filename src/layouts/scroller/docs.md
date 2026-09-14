## When to use it

A scroller is for a row that should stay a row: a strip of photos, a set of related cards, a filmstrip of steps. Where a cluster would wrap, a scroller keeps everything on one line and lets the visitor move along it.

## How it works

A flex row that does not wrap, with `overflow-x: auto`. Children are told not to shrink, so the row overflows and the container scrolls. `data-snap` adds scroll snapping so items land cleanly at the start edge; `data-width` gives every item the same width so the strip reads as a sequence of equal frames. Because a scrolling region is an interactive one, the markup carries `tabindex="0"` and an accessible name; the validator insists.

## Why this name

What the visitor does is scroll, so the layout is a scroller; a name for the mechanism (a reel, a track) would say less. Foundation 6's Orbit was a JavaScript carousel; this is the CSS-only shape of the same idea, without the auto-advance.
