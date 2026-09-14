## When to use it

Wrap an inline SVG in an icon whenever it should behave like a character: in a link, a button, a list item, a heading. It takes the size and colour of the text around it and stays aligned with it, at any font size.

## How it works

The wrapper is an inline flex row with a small gap. The SVG is sized to one em, so it follows the text size, and `currentColor` inside it follows the text colour. `data-align` chooses between centering on the line, which suits buttons and labels, and sitting on the baseline, which suits running text; the baseline setting nudges the glyph down an eighth of an em, because an icon whose bottom edge sits exactly on the baseline reads as floating.

```html
<button class="icon" type="button">
	<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/></svg>
	Save
</button>
```

## Why this name

An icon is what it holds. Foundation 6 shipped an icon font instead, which set size and alignment by font rules; inline SVG needs this small layout to do the same.
