## When to use it

Reach for a stack whenever things sit one above another and should be spaced evenly: the sections of a card, the fields of a form, the parts of a sidebar. Nest stacks with different gaps to express hierarchy: a large gap between sections, a small one inside each.

## How it works

The stack is a flex column with a `gap`, so the space between children is the stack's decision and children's own margins are zeroed. `data-align` controls horizontal alignment. Give one child `data-split` and it, with everything after it, moves to the end whenever the stack is taller than its content, which is how a card keeps its actions at the bottom. Add `data-fill` and the stack is at least as tall as the viewport, which with a `data-split` footer is the whole of a sticky footer.

```html
<div class="stack" data-gap="sm" data-align="start">
	<h3>Title</h3>
	<p>Body</p>
	<a href="#" data-split>Action</a>
</div>
```

## Why this name

No other word says it as plainly: things stacked, one on another. Foundation 6 had no equivalent; the space between blocks came from each element's own margins.
