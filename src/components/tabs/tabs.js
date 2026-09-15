// Tabs: pairs every tab with the panel its aria-controls names, shows one of
// them, and moves selection with the arrow keys. Without this module the CSS
// hides nothing, so every panel is readable; loading it is an enhancement.
// Tabs added after load are not picked up.
const tabsOf = (root) => [...root.querySelectorAll('[role="tab"]')];

function select(root, tab) {
	for (const other of tabsOf(root)) {
		const on = other === tab;
		other.setAttribute('aria-selected', String(on));
		other.tabIndex = on ? 0 : -1;
		const panel = document.getElementById(other.getAttribute('aria-controls'));
		if (panel) panel.hidden = !on;
	}
}

for (const root of document.querySelectorAll('.tabs')) {
	const tabs = tabsOf(root);
	if (tabs.length) select(root, tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? tabs[0]);
}

document.addEventListener('click', (event) => {
	const tab = event.target?.closest?.('.tabs [role="tab"]');
	if (!tab) return;
	select(tab.closest('.tabs'), tab);
	tab.focus();
});

document.addEventListener('keydown', (event) => {
	const tab = event.target?.closest?.('.tabs [role="tab"]');
	if (!tab) return;
	const root = tab.closest('.tabs');
	const tabs = tabsOf(root);
	const vertical = root.getAttribute('data-orientation') === 'vertical';
	const step = { [vertical ? 'ArrowDown' : 'ArrowRight']: 1, [vertical ? 'ArrowUp' : 'ArrowLeft']: -1 }[event.key];
	let target;
	if (step) target = tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length];
	else if (event.key === 'Home') target = tabs[0];
	else if (event.key === 'End') target = tabs[tabs.length - 1];
	if (!target) return;
	event.preventDefault();
	select(root, target);
	target.focus();
});
