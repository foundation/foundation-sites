## When to use it

Rows and columns of data: prices, results, comparisons. If the content is a list of things with a picture each, that is a `grid` of cards, not a table.

## How it works

The class goes on the `table`. Cells get padding from `data-size` and a line beneath each row; the header row gets a stronger rule. `data-striped` tints every other row, `data-hover` the row under the pointer, `data-grid` draws every cell. Mark a column of numbers with `data-numeric` on its cells and header: they align to the end with tabular figures, so the digits line up. A table that is wider than its container goes inside a `scroller`, which scrolls it sideways while the table itself stays a table.

```html
<div class="scroller" role="region" aria-label="Quarterly results" tabindex="0">
	<table class="table" data-size="sm" data-grid>
		<caption>Quarterly results</caption>
		<thead><tr><th scope="col">Region</th><th scope="col" data-numeric>Q1</th><th scope="col" data-numeric>Q2</th></tr></thead>
		<tbody><tr><th scope="row">North</th><td data-numeric>120</td><td data-numeric>132</td></tr></tbody>
	</table>
</div>
```

## Accessibility

A table needs a name: a `caption`, or `aria-label` or `aria-labelledby` on the element. Header cells carry `scope`. Yeti never turns a table into stacked cards at narrow widths, because that breaks the relationships a screen reader depends on; use a `scroller` and keep the table a table.
