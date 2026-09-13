## When to use it

A caption over a picture, a badge in the corner of a thumbnail, a heading over a hero image, a loading message over a form. Anything that sits on top of something else and should still take part in the layout: the box is as tall as its tallest child, so nothing overlaps its neighbours.

## How it works

Every child is placed in the same grid cell, in source order, so later children paint over earlier ones. `data-align` sets where they sit vertically when they are shorter than the box; by default they stretch to fill it. To place one child differently, give it `align-self` and `justify-self` in your own CSS. Compare `overlay`, which takes one child out of the flow and centers it over a positioned ancestor.

```html
<div class="layer">
	<img src="thumb.jpg" alt="">
	<span style="justify-self: end; align-self: start">New</span>
</div>
```

## Why this name

Layers is what every design tool calls things stacked in one frame. Foundation 6 readers did this with a positioned wrapper and an absolutely positioned child, which is what `overlay` still does when you need it.
