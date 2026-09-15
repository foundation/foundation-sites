## When to use it

Deep pages: a doc inside a section inside a manual, a product inside a category. The trail says where the page sits and gives one click to each level above it. A site two levels deep does not need one.

## How it works

A wrapping row of steps at a small gap. Every step after the first is preceded by a separator drawn by CSS from `--yeti-breadcrumbs-separator`, a slash by default, which a theme may change to a chevron. Links are muted until hovered; the current step is the text colour in a strong weight. `data-size` steps the text.

```html
<nav class="breadcrumbs" aria-label="Breadcrumb" data-size="sm">
	<ol role="list">
		<li><a href="#">Home</a></li>
		<li aria-current="page">Docs</li>
	</ol>
</nav>
```

## Accessibility

Label the `nav` `aria-label="Breadcrumb"`, so it is announced as one. The last step carries `aria-current="page"`, as plain text or as a link to the page itself. The separators are generated content with empty alternative text (`content: "/" / ""`), so a screen reader hears the steps and nothing between them. `role="list"` on the `ol` keeps it a list where the reset removes the markers.
