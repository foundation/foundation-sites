---
raw: true
title: "Layouts"
description: "Twelve intrinsic layouts that respond to their container, one attribute vocabulary, and the responsive model behind them."
nav_group: "Guides"
nav_order: 3
---

# Layouts

Layouts are Yeti's grammar. A layout is a class that arranges its own children and owns the space between them. Children never carry their own margins; the layout that holds them decides the gap.

## Three tools, in this order

Yeti has three ways to make a page respond to its context, and they apply in a fixed order.

Intrinsic layouts come first. The twelve on this page arrange their children by reading their own width, not the viewport's. A `sidebar` drops to a stack when it runs low on room, wherever on the page it sits and whatever else is happening at the edge of the browser window. Reach for one of these before reaching for anything else.

Container queries come second. They let a single component change shape based on the width of the box that holds it rather than the window: a card that goes from one column to two once its own container is wide enough, in a sidebar or in a full-width section alike. These arrive in phase 3.

Media queries come last, if at all. They read the viewport itself, or a visitor's stated preferences: color scheme, reduced motion, print. Those are the right job for a media query. Layout is not, because a rule that switches at a viewport width breaks the moment its element moves into a narrower or wider container than the one it was tuned for.

Nothing under `src/layouts/` contains a media query, and the validator refuses one there.

## Why columns has a threshold, not a breakpoint

`columns` takes a `data-threshold`, not a breakpoint, and the difference shows as soon as the same markup moves.

Put a `columns` inside a `sidebar`'s content side, and it never sees the full viewport: the sidebar has already taken some of the width for itself. The columns still switch to rows at their own threshold, measured against their own container, so they can be stacked as rows while the page around them is wide open. Put the identical `columns` markup in a full-width section instead, and it switches at a much wider viewport, because its container is wider. Same markup, same threshold, two different viewport widths, because a threshold reads the box the element is in, not the window.

```html
<div class="sidebar" data-side="start" data-width="xs">
	<nav aria-label="Section">
		<a href="#">Overview</a>
	</nav>
	<div class="columns" data-threshold="sm">
		<section>
			<h2>Plan</h2>
			<p>Three equal columns once the content column is wide enough.</p>
		</section>
		<section>
			<h2>Build</h2>
			<p>Two rows once it is not, regardless of the viewport.</p>
		</section>
	</div>
</div>
```

## The vocabulary

Every layout is configured with a small set of `data-*` attributes, drawn from a shared list of values.

| Attribute | Values | Read by |
| --- | --- | --- |
| `data-gap` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, plus a fluid pair of any two of those (`xs-sm`, `xs-md`, `xs-lg`, `xs-xl`, `xs-2xl`, `xs-3xl`, `sm-md`, `sm-lg`, `sm-xl`, `sm-2xl`, `sm-3xl`, `md-lg`, `md-xl`, `md-2xl`, `md-3xl`, `lg-xl`, `lg-2xl`, `lg-3xl`, `xl-2xl`, `xl-3xl`, `2xl-3xl`) | stack, cluster, sidebar, columns, cover, grid, scroller, overlay, box, center, icon |
| `data-align` | `start`, `center`, `end`, `stretch`, `baseline` | stack, cluster, sidebar, columns, icon |
| `data-justify` | `start`, `center`, `end`, `between`, `around`, `evenly` | cluster, columns |
| `data-threshold` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | columns |
| `data-width` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | sidebar, scroller |
| `data-min` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | grid |
| `data-max` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | center |
| `data-ratio` | `1/1`, `4/3`, `3/2`, `16/9`, `21/9` | frame |
| `data-columns` | `1`, `2`, `3`, `4`, `5`, `6` | grid |
| `data-side` | `start`, `end` | sidebar |
| `data-limit` | `2`, `3`, `4`, `5` | columns — the first N share a row; every later child takes a full row |

For the sizing attributes the mapping rule is always the same: a value is a token suffix. `data-gap="lg"` reads `--yeti-space-lg`; `data-width="sm"` reads `--yeti-width-sm`. The attribute names the property to set; the value names the step on Yeti's scale to set it to. The rest — `data-align`, `data-justify`, `data-ratio`, `data-columns`, `data-side`, `data-limit` — name a behaviour rather than a token; `attributes.css` maps each value to the CSS keyword it means.

Gap alone also takes a fluid pair. `data-gap="sm-lg"` does not jump between the two: it runs from the `sm` stop at the narrow end of the viewport to the `lg` stop at the wide end, the same way the type scale itself is fluid. `none` never anchors a pair, so any smaller of the remaining seven sized stops can pair with any larger one, which is what makes twenty-one pairs out of seven.

## The twelve

- [stack](../stack.md): stacks its children vertically with one consistent gap between them.
- [cluster](../cluster.md): lays its children out in a row that wraps, keeping one gap between them on both axes.
- [sidebar](../sidebar.md): places a fixed-width sidebar beside flexible content, and stacks them when the content would drop below half the width.
- [columns](../columns.md): lays its children out as equal columns when the container is wider than a threshold, and as rows when it is not.
- [cover](../cover.md): fills at least the viewport's height and centers one child vertically, with optional content pinned above and below it.
- [grid](../grid.md): fits as many equal columns as the container allows at a minimum width, up to an optional maximum count.
- [frame](../frame.md): holds one child in a fixed aspect ratio, cropping media to fill it and centering anything else.
- [scroller](../scroller.md): lays its children out in a single row that scrolls horizontally.
- [overlay](../overlay.md): centers itself over the nearest positioned ancestor, or over the viewport, without pushing anything else around.
- [box](../box.md): pads its content on all sides, with an optional border.
- [center](../center.md): centers a column of content horizontally, up to a maximum width, with gutters on narrow screens.
- [icon](../icon.md): sizes an inline SVG to the surrounding text and aligns it with the text beside it.

## Composing

None of these layouts do much alone. Nest a few and they add up to a page.

A card: a bordered `box` holds a `stack`, which separates a cropped photo, a heading, and a paragraph at its own gap. The last child is a `cluster` of links carrying `data-split`, so it settles at the bottom of the card once the stack has more height than its content needs.

```html
<div class="box" data-border>
	<div class="stack" data-gap="sm">
		<div class="frame" data-ratio="4/3">
			<img src="trail.jpg" alt="A mountain trail at dawn, cropped to four by three">
		</div>
		<h3>Weekend in the hills</h3>
		<p>Six miles, one summit, and a view worth the early start.</p>
		<nav class="cluster" data-gap="sm" data-split aria-label="Card actions">
			<a href="#">Read more</a>
			<a href="#">Share</a>
		</nav>
	</div>
</div>
```

A page shell: a `center` keeps the whole page within a readable maximum width. Inside it, a `cover` fills the viewport and centers its `h1`, then a `grid` of bordered `box`es follows below the fold.

```html
<div class="center" data-max="xl">
	<header class="cover" data-gap="lg">
		<h1 data-center>Build interfaces that read their own container</h1>
	</header>
	<ul class="grid" data-min="sm" data-columns="3" role="list">
		<li class="box" data-gap="md" data-border>
			<h2>Fast</h2>
			<p>No build step to wait on.</p>
		</li>
		<li class="box" data-gap="md" data-border>
			<h2>Legible</h2>
			<p>Plain HTML and a few attributes.</p>
		</li>
		<li class="box" data-gap="md" data-border>
			<h2>Intrinsic</h2>
			<p>Every layout reads its own width.</p>
		</li>
	</ul>
</div>
```

A media object: a `sidebar` puts a square `frame` beside a `stack` of text, and the two swap to a single column once they no longer fit side by side.

```html
<div class="sidebar" data-side="start" data-width="sm">
	<div class="frame" data-ratio="1/1">
		<img src="ada.jpg" alt="Portrait of Ada Lovelace">
	</div>
	<div class="stack" data-gap="sm">
		<h3>Ada Lovelace</h3>
		<p>Wrote the first published algorithm, for Babbage's Analytical Engine.</p>
	</div>
</div>
```

## Coming from version 6

The layouts change more than they look like they do, because the biggest habit to unlearn is thinking in breakpoints at all. Foundation 6's grid classes each encoded a viewport width chosen ahead of time; Yeti's layouts read the width of the box they are actually placed in, so the same markup keeps working when it moves to a narrower column, a wider one, or a sidebar.

| Foundation 6 | Yeti |
| --- | --- |
| `.grid-container` | `center` |
| `.grid-x` with `medium-N` cells | `columns` or `sidebar` |
| Block Grid `small-up-N` / `large-up-N` | `grid` with `data-columns` |
| `.responsive-embed` | `frame` |
| `.callout` | `box` with `data-border` |
| `.button-group` | `cluster` |
| Orbit | `scroller` |
