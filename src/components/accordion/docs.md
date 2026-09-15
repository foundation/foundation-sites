## When to use it

A run of questions and answers, a set of sections most readers only want one of, a long form split into stages. Not for content everyone needs: if it matters, leave it open.

## How it works

Each panel is a `details` with a `summary`, so the opening, the keyboard, and the announced state come from the browser rather than from Yeti. The component draws the lines between panels, the padding, and a chevron that turns when the panel opens.

Each summary sits on its own surface, clearly apart from the answer below it, and moves a step further under the pointer. That is what keeps a set of rows reading as rows rather than as one undivided block; an open one also keeps a line under it. Three tokens carry it: `--yeti-accordion-surface` for the set and so for the panels, `--yeti-accordion-summary` for a row at rest, and `--yeti-accordion-summary-hover` for the one under the pointer.

The last two are mixed from the first toward the text colour rather than picked off the surface ramp, because the ramp's own steps are too small to read here. Mixing toward text also moves the right way by itself in both schemes, darkening the row on a light page and lifting it on a dark one, and a theme that restyles `--yeti-color-surface` or `--yeti-color-text` gets a header that still works without redefining anything.

The panel grows open rather than appearing. A `details` cannot animate its own height to `auto` in every engine, because the keywords that make `auto` interpolable are Chromium's alone, so the set makes each `details` a two-row grid instead: the summary takes the first row and the generated panel the second, and the transition runs on that row's size. That works in all three engines, and the panel clips its overflow so the content is revealed rather than squashed. The rows are packed to the start of the grid, because an `fr` row is a share of the leftover space and the summary would otherwise take part in that sum and visibly swell while the share was being interpolated.

Closing animates in Chromium and Firefox. WebKit shuts the panel at once, because it drops the panel's content before the row has anything left to shrink. Opening is smooth everywhere, which is the direction people watch.

Under `prefers-reduced-motion` the whole thing collapses with the rest of Yeti's motion, and the panel simply appears.

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
