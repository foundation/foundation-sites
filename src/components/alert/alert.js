// Alert: a click on the dismiss button fades the alert out and removes it.
// Delegated, so alerts added after load work too; safe on pages with none.
// The duration is the fast token, which reduced motion collapses.
document.addEventListener('click', (event) => {
	const button = event.target?.closest?.('.alert > [data-dismiss]');
	if (!button) return;
	const alert = button.parentElement;
	const parent = alert.parentElement;
	const held = alert.contains(document.activeElement);
	const duration = parseFloat(getComputedStyle(alert).getPropertyValue('--yeti-duration-fast')) || 0;
	alert.animate([{ opacity: 1 }, { opacity: 0 }], { duration, fill: 'forwards' }).finished.then(() => {
		alert.remove();
		// The button that had focus has just gone, so put focus where the alert
		// was rather than letting it fall to the top of the document.
		// Only add tabindex if the parent isn't already focusable, and only
		// remove it again if we added it, so an author's own tabindex (a focus
		// trap, a scrollable region) survives untouched.
		if (held && parent) {
			const had = parent.getAttribute('tabindex');
			if (had === null) parent.setAttribute('tabindex', '-1');
			parent.focus({ preventScroll: true });
			if (had === null) parent.addEventListener('blur', () => parent.removeAttribute('tabindex'), { once: true });
		}
	});
});
