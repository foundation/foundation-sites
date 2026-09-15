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

## Accessibility

The items are ordinary links and buttons, on purpose. `role="menu"` and `role="menuitem"` promise a full application menu, arrow keys and all, and a half-built one is worse than none; a disclosure panel of links is announced clearly by every screen reader and needs no script. Give the trigger a name, and let the browser handle the expanded state rather than setting `aria-expanded` yourself. Escape closes the panel and returns focus to the trigger, which is the browser's doing.
