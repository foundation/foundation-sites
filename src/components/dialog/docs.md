## When to use it

A decision that has to be made before anything else happens: confirming something destructive, a short form the page cannot carry, a message that must be acknowledged. Anything the reader can come back to later belongs on the page rather than over it.

## How it works

A native `dialog`, opened as a modal. That one word is why the component exists in this shape: `showModal` makes everything behind the dialog inert, keeps focus inside it, closes it on Escape, and gives you a `::backdrop` to paint. None of that is Yeti's, and none of it needs ARIA.

Opening is the one thing the browser will not do for you, so `dialog.js` does it: any button carrying `data-open` with a dialog's id opens it, a click on the backdrop closes it, and focus returns to the button that opened it. Closing needs no script at all if you use a form: a button inside `<form method="dialog">` closes the dialog on its own.

```html
<button class="button" type="button" data-open="share">Share</button>

<dialog class="dialog" id="share" data-width="sm" aria-labelledby="share-title">
	<h2 id="share-title">Share this page</h2>
	<p>Anyone with the link can read it.</p>
	<footer>
		<form method="dialog"><button class="button" type="submit">Done</button></form>
	</footer>
</dialog>
```

## Accessibility

Name the dialog with `aria-labelledby` pointing at its heading, so it is announced as something rather than as an unnamed dialog. Because it is opened modally the page behind it is genuinely inert, not merely covered, so a screen reader cannot wander out of it. Focus returns to the opener on close, which is what keeps a keyboard reader's place.

Without the module the dialog never opens. That is a real limitation, not a detail: do not put the only way to reach something behind a dialog on a page that does not load `dialog.js`.
