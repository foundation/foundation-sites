## When to use it

Use columns for a set of equals: pricing tiers, feature summaries, a row of statistics. They should be side by side when there is room and one under another when there is not, and the container, not the screen, should decide which.

## How it works

Every child has the same `flex-basis`: the threshold minus the container's width, multiplied by a large number. In a container wider than the threshold that number is hugely negative, so each child shrinks to its minimum and shares the row equally. In a narrower one it is hugely positive, so each child fills a row. `data-limit` caps how many share a row; any child past the cap takes a full row of its own.

```html
<div class="columns" data-threshold="sm" data-limit="2">
	<div>One</div>
	<div>Two</div>
	<div>Three, on its own row</div>
</div>
```

## Why this name

Every Layout calls this the Switcher, after the mechanism. Yeti names layouts for what they do to their children, and what this one gives them is columns. Foundation 6 readers will recognise the job of `.grid-x` with `medium-4` cells; the difference is that the threshold is a container width, so the same markup works in a sidebar and a full-width band.
