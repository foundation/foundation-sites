import { test, expect } from 'playwright/test';
import { PAGE_HELPERS, expectAA } from './lib/contrast.js';

// .button transitions background-color/border-color/color on :hover, so the
// "before" value is still current on the very next read after page.hover()
// (the interpolation is only sampled on a later frame, and two animation
// frames end before a 150ms transition does). Wait on the element's own
// running animations instead, as field.spec.js does; Promise.all([]) resolves
// at once when there is nothing to wait for.
// Two frames: input is processed, then rAF callbacks run, so after two the
// style recalculation that creates the transition has certainly happened and
// getAnimations() reports it. Waiting on an empty list resolves at once.
const settle = (page, selector) => page.evaluate((s) => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	.then(() => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished))), selector);

const PAGES = [
	'/test/browser/fixtures/components/button.html',
	'/test/browser/fixtures/components/badge.html',
	'/test/browser/fixtures/components/card.html',
	'/test/browser/fixtures/components/field.html',
	'/test/browser/fixtures/components/affix.html',
	'/test/browser/fixtures/components/table.html',
	'/test/browser/fixtures/components/seam.html',
	'/test/browser/fixtures/components/nav.html',
	'/test/browser/fixtures/components/breadcrumbs.html',
	'/test/browser/fixtures/components/pagination.html',
	'/test/browser/fixtures/components/alert.html',
	'/test/browser/fixtures/components/accordion.html',
	'/test/browser/fixtures/components/tabs.html',
	'/test/browser/fixtures/components/dropdown.html',
	'/test/browser/fixtures/components/dialog.html',
	'/test/browser/fixtures/components/tooltip.html',
	'/test/browser/fixtures/components/carousel.html',
	'/test/browser/fixtures/themes/soft.html',
	'/test/browser/fixtures/themes/sharp.html',
];

for (const url of PAGES) {
	for (const scheme of ['light', 'dark']) {
		test(`${url.split('/').slice(-2).join('/')} meets AA in ${scheme}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			await page.addInitScript(PAGE_HELPERS);
			expect((await page.goto(url)).status()).toBe(200);
			const targets = await page.evaluate(() => [...document.querySelectorAll('[data-contrast]')].map((el, i) => {
				el.dataset.contrastId = String(i);
				const r = el.getBoundingClientRect();
				return { sel: `[data-contrast-id="${i}"]`, large: el.dataset.contrast === 'large', hover: el.matches('.button'), width: r.width, height: r.height };
			}));
			expect(targets.length).toBeGreaterThan(0);
			for (const t of targets) {
				expect(t.width, `${t.sel} has zero width (${scheme})`).toBeGreaterThan(0);
				expect(t.height, `${t.sel} has zero height (${scheme})`).toBeGreaterThan(0);
				await expectAA(page, t.sel, { large: t.large, label: `${t.sel} at rest (${scheme})` });
				if (t.hover) {
					await page.hover(t.sel);
					await settle(page, t.sel);
					await expectAA(page, t.sel, { large: t.large, label: `${t.sel} hovered (${scheme})` });
				}
			}
		});
	}
}
