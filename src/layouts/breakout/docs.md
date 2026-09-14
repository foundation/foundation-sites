## When to use it

Long-form pages: an article, a case study, documentation. The text sits in a column narrow enough to read, and the occasional picture, quote band, or code block breaks out to the full width without leaving the flow.

## How it works

The breakout is a grid of three columns: a gutter, the reading column, and a gutter. The reading column is `data-max` wide, or the container minus two gutters when that is less, and the gutters share whatever remains, so the column is centered. Every child lands in the middle track. A child carrying `data-bleed` spans all three. The rows are separated by the gap, and children's own margins are zeroed, as in every gap-based layout. Prose is also capped at `--yeti-measure`, so a column set wider than the measure is not filled by paragraphs.

```html
<div class="breakout" data-max="md">
	<p>Readable.</p>
	<div data-bleed>Edge to edge.</div>
	<p>Readable again.</p>
</div>
```

A child carrying `data-note` is a margin note: it follows the paragraph it belongs to in the source, and when the content box is at least `xl` wide it moves into the end gutter beside that paragraph, in the small muted text of a hint; narrower, it stays in the column as an aside. One note per paragraph; a second note after the same paragraph stacks below the first and pushes the next paragraph down a row.

```html
<div class="breakout" data-max="md">
	<p>The main text carries the argument.</p>
	<aside data-note>A citation, or a caveat, that would interrupt the flow.</aside>
</div>
```

## Why this name

The column is ordinary; what is special is that a child can break out of it. Foundation 6 had `.grid-container.fluid` for the whole page and nothing for one element; people reached for negative margins.
