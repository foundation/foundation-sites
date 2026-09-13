## When to use it

A comment with an avatar, a product with its thumbnail, a speaker with a headshot: whenever a picture sits beside a few lines of text, this is the shape. It stays side by side while the text keeps at least half the width and stacks when it cannot. Put the picture first for picture-left, last for picture-right; the reading order follows. The body must not have an img, video, or picture as a direct child (it would be taken for a second figure).

## Built from primitives

A recipe is a shortcut, not a new idea. The same result is three layouts you already know: a `sidebar` whose first child is a `frame` and whose second is a `stack`. Reach for this form when you want to change any part of it, since every knob is an attribute you can see.

```html
<div class="sidebar" data-width="sm">
	<div class="frame" data-ratio="1/1">
		<img src="ada.jpg" alt="Portrait of Ada Lovelace">
	</div>
	<div class="stack" data-gap="sm">
		<h3>Ada Lovelace</h3>
		<p>Wrote the first published algorithm, for Babbage's Analytical Engine.</p>
	</div>
</div>
```

The one-class form renders the same geometry, and its test proves it. Its attributes are the ones the primitives take. Its CSS is its own file, so a project that prefers the composed form can leave `css/recipes/media/media.css` out of a hand-built bundle. One difference: the sidebar's `data-side` picks which child is the sidebar, while the recipe's `data-side` moves the figure with `order`, which changes where it sits but not where it is read.

## Why this name

Nicole Sullivan named the media object in 2010 and the name stuck across a decade of frameworks, Foundation 6's `.media-object` included. One word of it is enough.
