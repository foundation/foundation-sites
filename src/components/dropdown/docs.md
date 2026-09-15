## When to use it

A short list of things to go to or to do, hung off one button: an account menu, a row of secondary actions, the children of a nav item. For choosing a value in a form, use a `select` inside a field instead.

## How it works

The panel carries `popover` and the button carries `popovertarget`, so the browser opens it, puts it in the top layer, closes it on Escape or a click outside, and keeps the button's expanded state current. Yeti adds the surface, the shadow, and the placement. Because the panel is in the top layer, nothing on the page can clip it, which is why a dropdown inside a nav works even though the bar is a query container.

Where anchor positioning exists the panel hangs under its own trigger, and `data-side="end"` lines it up with the trigger's end edge instead. The anchor name is scoped to each dropdown, so a page full of them behaves. Where anchor positioning is missing the browser centres the panel, which is plainer but still opens, closes, and reads correctly.

```html
<div class="dropdown" data-side="end">
	<button class="button" type="button" popovertarget="row-actions" data-emphasis="low">More</button>
	<div id="row-actions" popover>
		<a href="#">Duplicate</a>
		<button type="button">Archive</button>
	</div>
</div>
```

## Opening on hover

Click is the default and never changes. `data-trigger="hover"` adds opening under the pointer on top of it, and needs `hover.js`, loaded once with `<script type="module" src="…/js/hover.js">`. The module is optional: without it the attribute does nothing and the dropdown still works by click.

Hover is added only where the pointer can actually hover, so a touch screen keeps the tap. Opening waits for `--yeti-dropdown-open-delay` so a pointer crossing the trigger on its way somewhere else does not flash the panel open, and closing waits for `--yeti-dropdown-close-delay` so the gap between the trigger and the panel is forgiving. Hovering the panel itself keeps it open.

The module closes only a panel it opened itself. A panel you opened with Enter or a click stays open when the pointer wanders off it, because the deliberate act should outrank the accidental one. Pressing the trigger while hover has the panel open closes it, and a press always cancels an opening that has not happened yet, so the same gesture never does opposite things depending on how long you lingered.

```html
<div class="dropdown" data-trigger="hover">
	<button class="button" type="button" popovertarget="products" data-emphasis="low">Products</button>
	<div id="products" popover>
		<a href="#">Overview</a>
		<a href="#">Pricing</a>
	</div>
</div>
<script type="module" src="…/js/hover.js"></script>
```

This module is a stopgap and says so. The `interestfor` attribute is this feature standardised, and it is in one engine today. When it reaches Baseline the module goes and the attribute maps to it instead.

## Accessibility

The items are ordinary links and buttons, on purpose. `role="menu"` and `role="menuitem"` promise a full application menu, arrow keys and all, and a half-built one is worse than none; a disclosure panel of links is announced clearly by every screen reader and needs no script. Give the trigger a name, and let the browser handle the expanded state rather than setting `aria-expanded` yourself. Escape closes the panel and returns focus to the trigger, which is the browser's doing.

Opening on hover changes none of that. The module never touches focus, ARIA, or the keyboard; it only opens and closes the same popover the button already opens, and a reader who cannot use a pointer is unaffected either way.
