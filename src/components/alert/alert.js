// Alert: a click on the dismiss button fades the alert out and removes it.
// Delegated, so alerts added after load work too; safe on pages with none.
// The duration is the fast token, which reduced motion collapses.
document.addEventListener('click', (event) => {
	const button = event.target.closest('.alert > [data-dismiss]');
	if (!button) return;
	const alert = button.parentElement;
	const duration = parseFloat(getComputedStyle(alert).getPropertyValue('--yeti-duration-fast')) || 0;
	alert.animate([{ opacity: 1 }, { opacity: 0 }], { duration, fill: 'forwards' }).finished.then(() => alert.remove());
});
