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

A `field` pairs a label with its control and adds a hint and an error the control can trigger on its own. The label's `for` must match the control's `id`; the validator refuses an example where it does not. The error stays hidden until the control is invalid *and* touched (`:user-invalid`), or until `aria-invalid="true"` marks a failure found on the server. A `required` control gets a marker after its label, decoration only — the `required` attribute is what a screen reader announces. An `affix` attaches a prefix or a suffix to a control and takes its size from the field around it, not from an attribute of its own.

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
<section class="seam" data-shape="wave" data-edge="top" style="background: var(--yeti-color-surface-raised); padding: var(--yeti-space-xl)">
	<h2>Nested to meet the section above</h2>
	<p>The top seam repeats the same wave unflipped, so the two curves nest into one line instead of mirroring each other.</p>
</section>
```

## Navigation

A `nav` is one list of links in two modes, not two lists. Below `data-threshold` — the bar's own width, the same attribute `columns` reads, so a nav and the columns beneath it can pass the same threshold together — the list carries `popover` and sits closed until the toggle opens it; at or above the threshold the bar's own container query puts the list back in the row and hides the toggle. Nothing in the markup changes between the two; the `popover` attribute is simply not doing anything once the list is back in the bar.

`data-panel` picks the shape of the open list. `sheet`, the default, hangs under the bar and suits most sites. `drawer` slides in from the start edge as a column with the page dimmed behind it, for an app shell where the nav is a permanent fixture the reader opens and closes. `screen` fills the viewport with the links large and centred, for a marketing page where the open menu is itself a moment. `screen` has no edge to click outside of, so it is the one panel that requires the close item — an `li` with `data-close` holding a button that hides the popover — where the other two can rely on light dismiss alone.

Where anchor positioning is missing, the sheet cannot anchor under the bar, so it starts at the top of the viewport and covers the bar instead; Escape and a click outside still close it either way.

`breadcrumbs` is a trail of steps with a separator between them that is seen and not read, generated by CSS so nothing but the steps themselves reaches a screen reader. `pagination` is a row of page links that compacts to Previous, the current page, and Next below its own threshold, the same shrinking a `nav` does but on a row of pages instead of a row of links.

```html
<nav class="nav" aria-label="Site">
	<a href="#" data-brand>Yeti</a>
	<button type="button" popovertarget="site-menu" aria-label="Menu"><svg aria-hidden="true" viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
	<ul id="site-menu" popover role="list">
		<li><a href="#" aria-current="page">Docs</a></li>
		<li><a href="#">Blog</a></li>
		<li><a href="#">About</a></li>
	</ul>
	<div data-actions><a class="button" href="#" data-size="sm">Get started</a></div>
</nav>
```

## Feedback

An `alert` carries `role="status"` for the usual notice, announced politely, or `role="alert"` for something urgent enough to interrupt. Neither role announces content that is already on the page when it loads; they only matter for an alert inserted after the fact, so a banner baked into the page needs no role at all to be seen, just one to be right. The close button is a `button` with `data-dismiss`; on its own it does nothing; loaded once anywhere in the page, `alert.js` listens on the document and fades the alert away on a click.

A `progress` bar fills to its value, and without one it goes indeterminate: the track takes diagonal stripes that move along it, for work whose length is not known rather than work with none. A `spinner` is the same idea with no value at all, a turning ring sized to the text around it. A button with `aria-busy="true"` draws that same ring after its label, so the one waiting indicator serves a standalone wait and a button's wait alike.

```html
<div class="alert" role="status" data-variant="success">
	<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
	<div><strong>Saved.</strong> Your changes are live.</div>
	<button type="button" data-dismiss aria-label="Dismiss">×</button>
</div>
```

## Things that open

Six components hold something shut until a person asks for it, and each hands that job to whatever the platform already does best. An accordion opens on `details` and `summary`. A dropdown opens on `popover`. A dialog opens on the `dialog` element. A tooltip opens on hover and focus. A carousel moves on scroll-snap. Tabs select a panel with `aria-controls` and `aria-labelledby`. Of the six, only two ever need a script: the dialog, because nothing else can call `showModal`, and tabs, because nothing else can hide the inactive panels and rove focus between the tabs. The other four are complete in CSS and HTML alone.

The accordion's one-at-a-time mode is not a Yeti attribute. Give every `details` in a set the same `name` and the browser closes the others when one opens, the same way radio buttons share a name to close each other out. Yeti adds nothing for it, because CSS cannot set an attribute on an element — only the markup or a script can — and here the markup already can.

The dropdown's panel holds ordinary links and a button, with no `role="menu"` anywhere in it. `role="menu"` promises the full keyboard contract of an application menu — arrow keys moving selection, typeahead, a required active descendant — and a page that does not deliver the rest of that contract leaves a screen reader announcing a menu that does not behave like one. A disclosure panel of ordinary links needs none of it: Tab walks the items in document order, Enter activates whichever one has focus, and a screen reader announces exactly what is there, links and a button, nothing promised and unmet.

Tabs and the dialog fail differently without their module, and the difference matters. Without `tabs.js`, nothing is hidden — every panel stays in the page and every tab stays focusable, which is plainer to navigate but never traps content behind a script that failed to load. Without `dialog.js`, the dialog does not open at all; there is no fallback state, because nothing but `showModal` can put it up. Never put the only route to something behind a dialog on a page that might not load the module.

A tooltip is never the only place something is said. It shows on hover and on focus, and touch has neither, so whatever the bubble says must also live somewhere a touch user can reach it: the trigger's own label, a field's hint, or the surrounding text. Treat the tooltip as a short-hand restatement of something already true elsewhere, not as the one place it is written down.

```html
<div class="dropdown">
	<button class="button" type="button" popovertarget="account-menu" data-emphasis="medium">Account</button>
	<div id="account-menu" popover>
		<a href="#">Profile</a>
		<a href="#">Settings</a>
		<button type="button">Sign out</button>
	</div>
</div>
```

## Loading a module

Yeti's JavaScript lives in `dist/js/`, one module per component, dependency-free and optional: nothing in the CSS expects it, so a page that never loads a module still gets the component, minus whatever that module would have added. Link it with a single `<script type="module" src="…/js/alert.js"></script>` anywhere in the page — there is no init call to run and no order to get right — and it is safe to include on a page with none of that component at all; it simply finds nothing to listen on. Leave the module out and the alert's close button sits there inert, the rest of the component unaffected.

Today that list is three modules long: `alert.js`, for the close button's fade and removal; `tabs.js`, for hiding inactive panels and roving focus between tabs; and `dialog.js`, for opening the dialog with `showModal`. That is the budget the architecture set for 7.0, and it is spent: no further component in this release will bring a script.

## Skinning

Every color, radius, weight, and shadow a component draws is a token, most of them shared with the layouts (`--yeti-color-primary`, `--yeti-radius-md`) and a few that belong to one component alone (`--yeti-button-radius`, `--yeti-card-padding`, `--yeti-badge-radius`, `--yeti-table-stripe`, `--yeti-seam-size`, and the rest on the [Tokens](../tokens.md) page). Set them and every component that reads them follows, with no class to swap and no CSS of your own to write. Two worked examples ship in `dist/themes/`: `soft`, round and warm with pill buttons and roomy cards, and `sharp`, square and mono with thick borders — see [Theming: Make a theme](theming.md#make-a-theme) for how each is built and how to build a third.
