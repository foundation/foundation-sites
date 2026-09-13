## When to use it

The opening of a landing page: a headline and a call to action on one side, a picture on the other, filling the first screen. Below the threshold the two become rows and the band grows to fit. Put the picture first or last as you want it read; `data-side` moves it without changing the source. The copy must not have an img, video, or picture as a direct child (it would be taken for a second figure).

## Built from primitives

A `cover` centers one child in the viewport's height. Give it `columns` carrying `data-center`, and inside the columns a `stack` for the copy and a `frame` for the picture. The threshold on the columns is what turns the two halves into rows.

```html
<header class="cover">
	<div class="columns" data-center data-threshold="lg" data-gap="lg" data-align="center">
		<div class="stack" data-gap="sm">
			<h1>Build interfaces that read their own container</h1>
			<p>Fifteen layouts, one attribute vocabulary, no breakpoints.</p>
			<a href="#">Get started</a>
		</div>
		<div class="frame" data-ratio="4/3">
			<img src="peak.jpg" alt="A snow ridge at first light">
		</div>
	</div>
</header>
```

The one-class form does the same in one element: a wrapping row whose lines are centered in the band's height. Its test measures both forms against each other.

## Why this name

"Hero" is what designers have called the big opening image since the print era, and every framework since Bootstrap 2 has shipped one under that name. The split is the common form; a hero with no picture is a `cover`.
