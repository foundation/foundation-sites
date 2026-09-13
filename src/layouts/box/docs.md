## When to use it

A box is the thing to reach for when content needs breathing room from its edges: a card body, a callout, a panel in a sidebar. Combine it with a stack inside for the spacing between its children and with a background or border to make it a surface.

## How it works

`padding` on all four sides from `data-gap`, and a one-pixel border in `--yeti-color-border` when `data-border` is present. Nothing else. Unlike the spacing layouts, a box does not reset its children's margins, so paragraphs inside it keep their prose rhythm.

```html
<div class="box" data-border>
	<div class="stack" data-gap="sm">
		<h3>Title</h3>
		<p>Body</p>
	</div>
</div>
```

## Why this name

Every Layout's Box, kept: there is no plainer word for a padded rectangle. Foundation 6's Callout was a styled box with a colour scheme; the plain one had no name.
