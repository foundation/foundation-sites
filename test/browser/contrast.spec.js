import { test, expect } from 'playwright/test';
import { PAGE_HELPERS, expectAA } from './lib/contrast.js';

// .button transitions background-color/border-color/color on :hover, so the
// "before" value is still current on the very next read after page.hover()
// (the interpolation is only sampled on a later frame). Wait two animation
// frames so the transition has settled before measuring hovered colours.
const settle = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

const PAGES = [
	'/test/browser/fixtures/components/button.html',
	'/test/browser/fixtures/components/badge.html',
	'/test/browser/fixtures/components/card.html',
	'/test/browser/fixtures/components/field.html',
	'/test/browser/fixtures/components/input-group.html',
	'/test/browser/fixtures/components/table.html',
	'/test/browser/fixtures/components/seam.html',
	'/test/browser/fixtures/themes/soft.html',
	'/test/browser/fixtures/themes/sharp.html',
];

for (const url of PAGES) {
	for (const scheme of ['light', 'dark']) {
		test(`${url.split('/').slice(-2).join('/')} meets AA in ${scheme}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			await page.addInitScript(PAGE_HELPERS);
			expect((await page.goto(url)).status()).toBe(200);
			const targets = await page.evaluate(() => [...document.querySelectorAll('[data-contrast]')].map((el, i) => { el.dataset.contrastId = String(i); return { sel: `[data-contrast-id="${i}"]`, large: el.dataset.contrast === 'large', hover: el.matches('.button') }; }));
			expect(targets.length).toBeGreaterThan(0);
			for (const t of targets) {
				await expectAA(page, t.sel, { large: t.large, label: `${t.sel} at rest (${scheme})` });
				if (t.hover) {
					await page.hover(t.sel);
					await settle(page);
					await expectAA(page, t.sel, { large: t.large, label: `${t.sel} hovered (${scheme})` });
				}
			}
		});
	}
}
