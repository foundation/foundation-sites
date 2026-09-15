## When to use it

The bar across the top of a site: the name, the main links, a button or two. It is a bar of links, not a menu system. Sections with their own submenus are the dropdown's job, and a column of links down the side of a page is a `stack` inside a `sidebar`, which needs no component.

## How it works

One list of links, two modes. The list carries `popover` and the button carries `popovertarget` naming it. When the bar is narrower than `data-threshold` (its own width, not the screen's, so a nav in a narrow column collapses while the same one across a page does not), the list is a closed popover and the button opens it; light dismiss, Escape, and the button's expanded state all come from the browser. At the threshold and above, the nav's own container query puts the list back in the bar and hides the button. The `popover` attribute is still there, so nothing changes in the markup and no link exists twice.

`data-panel` chooses the shape of the open list. `sheet`, the default, hangs under the bar at the full width. `drawer` slides in from the start edge as a column with the page dimmed behind it. `screen` fills the viewport with the links large and centred. Where anchor positioning exists the sheet sits exactly under the bar; elsewhere it starts at the top of the viewport and covers the bar, and Escape or a click outside still closes it. A close item, an `li` carrying `data-close` with a button that hides the popover, sits in the panel's top end corner and disappears in the bar; `screen` needs one, since there is no outside to click.

```html
<nav class="nav" aria-label="Site" data-threshold="sm" data-panel="drawer">
	<a href="#" data-brand>Yeti</a>
	<button type="button" popovertarget="menu" aria-label="Menu"><svg aria-hidden="true" viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
	<ul id="menu" popover role="list">
		<li data-close><button type="button" popovertarget="menu" popovertargetaction="hide" aria-label="Close">×</button></li>
		<li><a href="#">Docs</a></li>
		<li><a href="#">Blog</a></li>
	</ul>
</nav>
```

A panel that is open stays a panel until it is dismissed, whatever the nav's width; widening past the threshold does not return the links to the bar on its own. Escape or a click outside closes the panel, and only then do the links return to the bar. `data-threshold` is the attribute `columns` uses, so a nav and the columns under it can switch at the same width.

A nav item may hold a `dropdown` for a section with children of its own: the item becomes a button rather than a link, since the dropdown brings its own trigger. Its panel is in the top layer, so the bar's own containment cannot clip it.

The panel changes shape with the nav. In the bar it is the dropdown's usual card, anchored under its trigger. Once the links are behind the toggle it becomes a full-width block instead, docked to the foot of its trigger and squared off against the panel's own edges, so a sheet, a drawer and a screen each keep their submenu inside them. It is still a popover, so it covers the items below rather than pushing them down, and Escape or a click outside closes it before the panel it sits in. Where anchor positioning is missing the block docks to the foot of the viewport, which is still full width and still within reach.

## Accessibility

Give the `nav` an `aria-label`, since a page often has more than one. The toggle needs a name, from `aria-label` or visible text; the browser sets its expanded state. Mark the current page's link with `aria-current="page"`. Put `role="list"` on the `ul`: Yeti's reset only removes list markers where that role says the list is decorative. The open panel follows the toggle in the tab order, so Tab from the toggle reaches the first link; Escape closes the panel and returns focus to the toggle.
