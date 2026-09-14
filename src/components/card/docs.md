## When to use it

One thing in a box: an article in a listing, a product, a person, a plan. Put cards in a `grid` and they line up; put one in a narrow column and it turns into a row with a thumbnail on its own, because it reads its own width rather than the screen's.

## How it works

A card is a flex column on the raised surface with a border and a radius. A picture, video, or `figure` placed first bleeds through the padding to the card's edges and is cropped to `data-ratio`. A `figure` puts its caption under the picture; give the figure the `layer` class and the caption sits over the picture instead, on a light scrim, placed with `data-align-self`. Everything after it is the body, spaced at the card's gap. A `footer` is pushed to the bottom, so a row of cards of different lengths keeps its actions aligned. `data-raised` trades the border for a shadow; `data-variant` colours the border and draws a bar along the top without tinting the text. Below 22rem of content width, a card with a picture becomes a two-column row: the picture is a thumbnail down the left, the body takes the rest.

```html
<ul class="grid" data-min="sm" role="list">
	<li class="card" data-raised>
		<figure>
			<img src="ridge.jpg" alt="A snow ridge at first light">
			<figcaption>Photo: Ada</figcaption>
		</figure>
		<h3>First light</h3>
		<p>Up before the sun, and glad of it.</p>
	</li>
	<li class="card" data-variant="warning">
		<h3>No picture</h3>
		<p>A card is fine without one.</p>
		<footer><a class="button" href="#" data-emphasis="medium">Details</a></footer>
	</li>
</ul>
```

## Accessibility

Do not wrap a card in a link. Put the link on the heading and add `data-stretch`: the link grows to cover the card, so the whole card is clickable, while its accessible name stays the heading text. If the footer repeats the link as a button, give that button `tabindex="-1"` so keyboard users do not meet the same destination twice. Use `article` for a card that stands alone and `li` for cards in a list, so the list is announced with its count.
