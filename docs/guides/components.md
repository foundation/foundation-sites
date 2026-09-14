---
raw: true
title: "Components"
description: "Buttons, badges, cards, forms, tables, and seams: three attributes, native state, and tokens for everything visual."
nav_group: "Guides"
nav_order: 4
---

# Components

Layouts arrange; components have a face. The first eight are the essentials every site needs — a button, a badge, a card, a form, a table, a seam — and the face is quiet on purpose: flat surfaces, one border width, no shadow unless you ask for one. Every visual value a component draws is a token, so a theme changes the look without touching a single class or selector in your markup.

## Three attributes

A component's shape comes from its markup and its manifest; its look comes from three `data-*` attributes, the same three names wherever they apply.

| Attribute | Values | Read by |
| --- | --- | --- |
| `data-variant` | `primary`, `secondary`, `success`, `warning`, `alert`, `neutral` | button, badge, card, field |
| `data-emphasis` | `high`, `medium`, `low` | button, badge |
| `data-size` | `sm`, `md`, `lg` | button, badge, field, table, seam |

`data-variant` picks a hue from the palette; the component reads that hue's ladder for its fill, its border, or its text. `data-emphasis` picks how much of the ladder shows: `high` is a solid fill, `medium` an outline or a tint, `low` the hue in text alone. `data-size` scales text and padding together, one step at a time, so nothing looks stretched between sizes. A component that does not carry an attribute uses its default, set the same way every other component sets its defaults: `.name:not([data-size])` and the like.

## State is native

None of the eight components invents a state attribute. Every state a person sees is one the browser or ARIA already knows, so it appears the moment the underlying element is in that state, with no script to set a class.

| State | Where it comes from |
| --- | --- |
| Hover | `:hover` — a button's fill deepens, a table row tints under `data-hover`. |
| Focus | `:focus-visible` — the same ring the base layer gives every focusable element; no component removes it. |
| Disabled | `:disabled`, or `[aria-disabled="true"]` on a link acting as a button. |
| Pressed | `[aria-pressed="true"]` on a toggle button. |
| Busy | `[aria-busy="true"]`, set together with `aria-disabled="true"` while a button waits on a request. |
| Checked | `:checked` — a checkbox or radio redrawn to the field's `data-variant` colour. |
| Invalid | `:user-invalid`, or `[aria-invalid="true"]` after a server round trip. |

Set the attribute the state actually means — `aria-pressed`, `required`, `disabled` — and the look follows. There is nothing else to set.

## Forms without JavaScript

A `field` pairs a label with its control and adds a hint and an error the control can trigger on its own. The label's `for` must match the control's `id`; the validator refuses an example where it does not. The error stays hidden until the control is invalid *and* touched (`:user-invalid`), or until `aria-invalid="true"` marks a failure found on the server. A `required` control gets a marker after its label, decoration only — the `required` attribute is what a screen reader announces. An `input-group` attaches a prefix or a suffix to a control and takes its size from the field around it, not from an attribute of its own.

```html
<form class="stack" data-gap="md">
	<div class="field">
		<label for="name">Name</label>
		<input id="name" type="text" required>
	</div>
	<div class="field">
		<label for="email">Email</label>
		<input id="email" type="email" required aria-describedby="email-hint">
		<p id="email-hint" data-hint>We only use it to sign you in.</p>
	</div>
	<button class="button" type="submit">Sign up</button>
</form>
```

## Cards

A `card` is a bordered surface for one thing: an optional figure that bleeds to the edges, a body, and a footer pinned to the bottom so a row of cards with different lengths still lines up its actions. Below 22rem of the card's own width — a container query, not a viewport one — a card with a figure becomes a row with a thumbnail on its own, wherever on the page it sits. Never wrap a card in a link, because the whole card's text would become the link's name; instead put the link on the heading and give it `data-stretch`, which grows the link to cover the card while its accessible name stays the heading's text.

```html
<article class="card" data-raised>
	<figure>
		<img src="ridge.jpg" alt="A snow ridge at first light">
		<figcaption>Photo: Ada</figcaption>
	</figure>
	<h3><a href="/ridge" data-stretch>First light on the ridge</a></h3>
	<p>Up before the sun, and glad of it.</p>
	<footer>
		<span class="badge" data-variant="success">New</span>
		<a class="button" href="/ridge" data-emphasis="low" tabindex="-1">Read more</a>
	</footer>
</article>
```

## Tables

The `table` class styles a data table in place — a rule under the header, lines between rows, cell padding from `data-size` — without changing its shape at any width, because a table that turns into stacked cards at narrow widths breaks the row-and-column relationships a screen reader depends on. Mark a column of numbers with `data-numeric` on its cells and its header cell; they end-align with tabular figures, so the digits line up. When a table is wider than its container, put it inside a `scroller` with `tabindex="0"` and an `aria-label`: the scroller carries the horizontal overflow and the table itself stays a table.

```html
<div class="scroller" role="region" aria-label="Quarterly results" tabindex="0">
	<table class="table" data-size="sm" data-striped>
		<caption>Quarterly results</caption>
		<thead>
			<tr><th scope="col">Region</th><th scope="col" data-numeric>Q1</th><th scope="col" data-numeric>Q2</th></tr>
		</thead>
		<tbody>
			<tr><th scope="row">North</th><td data-numeric>120</td><td data-numeric>132</td></tr>
			<tr><th scope="row">South</th><td data-numeric>98</td><td data-numeric>101</td></tr>
		</tbody>
	</table>
</div>
```

## Seams

A `seam` cuts a shaped edge — a slant, a curve, or a wave — from a section's own background, so whatever sits behind it shows through with no extra element in the markup. `data-edge` picks which edge is cut, `data-size` the depth, and `data-flip` mirrors a slant or a wave, which is what an alternating run of sections needs: one seam cut on the way out of a section, the next cut on the way into the one below it, mirrored so the two edges read as a single unbroken line down the page. The depth of the cut is added as space on the cut edge, so give the section its own padding and background as you would any other section — the seam never manages that padding for you.

```html
<section class="seam" data-shape="wave" style="background: var(--yeti-color-primary-subtle); padding: var(--yeti-space-xl)">
	<h2>A calmer opening</h2>
	<p>The wave along the bottom carries into the section below.</p>
</section>
<section class="seam" data-shape="wave" data-edge="top" data-flip style="background: var(--yeti-color-surface-raised); padding: var(--yeti-space-xl)">
	<h2>Mirrored to meet the section above</h2>
	<p>Flipping the second seam keeps the curve from repeating itself down the page.</p>
</section>
```

## Skinning

Every color, radius, weight, and shadow a component draws is a token, most of them shared with the layouts (`--yeti-color-primary`, `--yeti-radius-md`) and a few that belong to one component alone (`--yeti-button-radius`, `--yeti-card-padding`, `--yeti-badge-radius`, `--yeti-table-stripe`, `--yeti-seam-size`, and the rest on the [Tokens](../tokens.md) page). Set them and every component that reads them follows, with no class to swap and no CSS of your own to write. Two worked examples ship in `dist/themes/`: `soft`, round and warm with pill buttons and roomy cards, and `sharp`, square and mono with thick borders — see [Theming: Make a theme](theming.md#make-a-theme) for how each is built and how to build a third.
