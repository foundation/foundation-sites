## When to use it

Every page has a skeleton, and most of them are this one: a header, a footer that should sit at the bottom of the screen even when the page is short, and a middle that may have navigation down one side or related material down the other. Put the class on `body` and the landmarks do the rest.

## Built from primitives

A `stack` with `data-fill` is at least as tall as the viewport, and a footer carrying `data-split` drops to its bottom. In the middle, a `sidebar` puts the nav beside the main content until the content would fall below half the width. That is the whole page.

```html
<body class="stack" data-fill>
	<header>Site header</header>
	<div class="sidebar" data-width="sm">
		<nav aria-label="Section">Section navigation</nav>
		<main>
			<h1>Page title</h1>
			<p>The main content, which takes what is left.</p>
		</main>
	</div>
	<footer data-split>Site footer</footer>
</body>
```

The one-class form adds the third region: an `aside` after `main` in the same body row takes the same width as the nav and sits at the end. The body row needs its own element, the `div`, because three regions cannot share a row with a header and footer above and below them without one; a page with only `main` may skip it.

## Why this name

A shell is the part of the page that is there before any content is, and stays when the content changes. Foundation 6 readers built this with `.grid-container` and a sticky-footer snippet from the forums; the shell is both, with the landmarks as the API.
