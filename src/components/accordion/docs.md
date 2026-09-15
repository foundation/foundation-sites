## When to use it

A run of questions and answers, a set of sections most readers only want one of, a long form split into stages. Not for content everyone needs: if it matters, leave it open.

## How it works

Each panel is a `details` with a `summary`, so the opening, the keyboard, and the announced state come from the browser rather than from Yeti. The component draws the lines between panels, the padding, and a chevron that turns when the panel opens.

To open one at a time, give every `details` the same `name`. That is the browser's own exclusive accordion, and it needs nothing from Yeti. There is deliberately no Yeti attribute for it: CSS cannot set an attribute, so the only way to offer one would be a script, and this is a component that should never need one.

```html
<div class="accordion">
	<details name="plans" open>
		<summary>Monthly</summary>
		<p>Cancel whenever you like.</p>
	</details>
	<details name="plans">
		<summary>Yearly</summary>
		<p>Two months free.</p>
	</details>
</div>
```

## Accessibility

A `summary` is a button to assistive tech, and its panel's state is announced as it opens and closes, so nothing needs ARIA. `summary` is not a heading, so if the rows are section titles, put a heading element inside each one. Keep the summary's text meaningful on its own, since a reader may hear the rows in a list before choosing one.
