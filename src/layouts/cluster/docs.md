## When to use it

Use a cluster for a row of things that are sized by their content and may need to wrap: tags, buttons, navigation links, a logo beside a menu. When it wraps, the gap holds between rows as well as between items, so nothing needs a margin.

## How it works

A cluster is a wrapping flex row with a `gap`. `data-justify` distributes the items along the row, so `between` pushes the first and last to the edges, and `data-align` lines them up vertically within a row. Items keep their own width; a cluster never stretches them.

```html
<ul class="cluster" data-gap="xs" role="list">
	<li>css</li>
	<li>layout</li>
	<li>intrinsic</li>
</ul>
```

## Why this name

The word is exact: items gather, they do not line up in columns. Foundation 6 reached for `.button-group` or a menu for the same job.
