## When to use it

A price with its currency, a distance with its unit, a search box with its button, a URL with a fixed domain after it. The attachment shares the control's border and height, so the two read as one thing.

## How it works

A flex row. The control grows; a `span` becomes a labelled box on the sunken surface; a `button` keeps its own colours. Inner corners are squared and each border overlaps the next by one width, so the seam is a single line. The group sets no size of its own: it reads the field around it, so `data-size` on the field scales the whole row.

```html
<div class="field" data-size="lg">
	<label for="site">Site</label>
	<div class="input-group">
		<input id="site" type="text" aria-describedby="site-domain">
		<span id="site-domain">.foundationcss.com</span>
	</div>
</div>
```

## Accessibility

The prefix is not part of the control, so a screen reader will not read it with the value unless you connect them: give the `span` an id and put it in the control's `aria-describedby`, or include the unit in the label ("Price in dollars"). The field's label still points at the control with `for`.
