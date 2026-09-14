## When to use it

Use a grid for a collection of like things that should line up in equal cells: cards, thumbnails, team members, products. The grid decides how many columns fit; you decide how narrow a cell may get and, when it matters, how many columns there may be at most.

## How it works

The track list is `repeat(auto-fit, minmax(<min>, 1fr))`, where `<min>` is the larger of `data-min` and the container divided by `data-columns`. Without `data-columns` that second value is zero, so the minimum width alone decides the count. With it, the container split N ways becomes the floor as soon as it is wider than the minimum, so there are never more than N columns, and still fewer when even N would squeeze a cell below the minimum. `data-min="none"` removes the width floor and gives exactly N. `data-min="none"` is meant to be paired with `data-columns`; alone it gives a single full-width column instead of a runaway number of tracks.

```html
<div class="grid" data-columns="4" data-min="none" data-gap="sm">
	<div>Always</div>
	<div>four</div>
	<div>across</div>
	<div>here</div>
</div>
```

Add `data-fold` and the count halves instead of stepping: with `data-min="xs"` and `data-columns="4"` the grid is four across while its content box is at least four `xs` widths, two by two while it is at least two, and a single column below that, never three. The thresholds are the width token's default multiplied by the count, so a theme that changes the token moves the token, not the fold. The closest thing with no container query is two `columns` nested in a third, and it is not the same result: it steps at its own thresholds (inner `sm`, outer `md`) rather than the fold's.

```html
<div class="columns" data-threshold="md">
	<div class="columns" data-threshold="sm"><div>One</div><div>Two</div></div>
	<div class="columns" data-threshold="sm"><div>Three</div><div>Four</div></div>
</div>
```

The fold is one attribute on one element; the nest is two wrappers. Use whichever you would rather explain.

`data-ranks` lines up neighbours' parts: with `data-ranks="3"` each child is a subgrid of three rows, so every first part sits in row one, every second in row two, and so on, across the row. Give the number of parts the fullest child has; a child with fewer leaves its last rows empty. A card in a ranked grid keeps its picture and footer aligned with its neighbours' and does not switch to its thumbnail row. A ranked child cannot also be a size container, because a size container cannot be a subgrid; the card turns its own container off inside a ranked grid for this reason.

## Why this name

It is a grid and nothing else is. Foundation 6 readers: this replaces the Block Grid, and `data-columns="4"` is the intrinsic form of `large-up-4`, with the shrinking at narrow widths handled by the minimum instead of by `small-up-1 medium-up-2`.
