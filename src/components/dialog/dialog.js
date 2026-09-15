// Dialog: a button carrying data-open shows the dialog with that id as a
// modal, a click on the backdrop closes it, and focus returns to whatever
// opened it. Delegated, so dialogs added after load work too, and safe on a
// page with none. Without this module a dialog cannot open at all, which the
// docs say plainly.
// The opener is remembered per dialog rather than once for the page, so a
// dialog opened from inside another still returns focus to its own trigger.
const openers = new WeakMap();

document.addEventListener('click', (event) => {
	const trigger = event.target?.closest?.('[data-open]');
	if (trigger) {
		const dialog = document.getElementById(trigger.getAttribute('data-open'));
		// showModal throws on a dialog that is already open, and a trigger
		// inside an open dialog is not made inert by it.
		if (!dialog?.showModal || dialog.open) return;
		openers.set(dialog, trigger);
		dialog.addEventListener('close', () => {
			openers.get(dialog)?.focus?.({ preventScroll: true });
			openers.delete(dialog);
		}, { once: true });
		dialog.showModal();
		return;
	}
	// A click on the backdrop reports the dialog as its target but lands
	// outside the dialog's own box. A keyboard activation has no coordinates
	// at all, so it must not be mistaken for one.
	const dialog = event.target?.closest?.('dialog.dialog');
	if (!dialog || !dialog.open || event.detail === 0) return;
	const box = dialog.getBoundingClientRect();
	const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
	if (!inside) dialog.close();
});
