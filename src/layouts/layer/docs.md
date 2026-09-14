## When to use it

A caption over a picture, a badge in the corner of a thumbnail, a heading over a hero image, a loading message over a form. Anything that sits on top of something else and should still take part in the layout: the box is as tall as its tallest child, so nothing overlaps its neighbours.

## How it works

Every child is placed in the same grid cell, in source order, so later children paint over earlier ones. `data-align` on the layer sets where every child sits vertically when it is shorter than the box; by default they stretch to fill it. To place one child on its own, put `data-align-self` and `data-justify-self` on that child: a badge in the top-right corner is `data-align-self="start" data-justify-self="end"`. Compare `overlay`, which takes one marked child out of the flow and centers it over the rest.

```html
<div class="layer">
	<img src="thumb.jpg" alt="">
	<span data-align-self="start" data-justify-self="end">New</span>
</div>
```

## Why this name

Layers is what every design tool calls things stacked in one frame. Foundation 6 readers did this with a positioned wrapper and an absolutely positioned child, which is what `overlay` still does when you need it.
