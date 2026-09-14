// Contrast of an element's text over the first painted background behind it.
import { expect } from 'playwright/test';
import { contrast, PAGE_HELPERS } from './color.js';

export { PAGE_HELPERS };

export async function ratioOf(page, selector) {
	const [fg, bg] = await page.evaluate((s) => {
		const el = document.querySelector(s);
		const fg = window.__yeti.rgb(getComputedStyle(el).color);
		let node = el;
		let background = 'white';
		while (node) {
			const c = getComputedStyle(node).backgroundColor;
			if (c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') { background = c; break; }
			node = node.parentElement;
		}
		return [fg, window.__yeti.rgb(background)];
	}, selector);
	return contrast(fg, bg);
}

export async function expectAA(page, selector, { large = false, label = selector } = {}) {
	expect(await ratioOf(page, selector), label).toBeGreaterThanOrEqual(large ? 3 : 4.5);
}
