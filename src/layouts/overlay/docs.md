## When to use it

An overlay sits on top of something without taking part in the layout underneath: a "sold out" stamp on a product image, a loading message over a form, a notice over the whole page with `data-fixed`. It is the positioning half of a dialog; the behaviour half is a component's job.

## How it works

The overlay is absolutely positioned with its top-left corner at the center of the nearest positioned ancestor, then translated back by half its own size, which centers it whatever its dimensions. Its maximum width and height are the ancestor's minus a gap on each side, and it scrolls internally rather than growing beyond that. `data-fixed` swaps `absolute` for `fixed`, so the containing box is the viewport.

## Why this name

Overlay is what everyone already calls a thing that lies over other things. Foundation 6's Reveal was the modal; the plain positioning had no name.
