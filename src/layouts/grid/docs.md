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

## Why this name

Every Layout's Grid, kept, because it is a grid and nothing else is. Foundation 6 readers: this replaces the Block Grid, and `data-columns="4"` is the intrinsic form of `large-up-4`, with the shrinking at narrow widths handled by the minimum instead of by `small-up-1 medium-up-2`.
