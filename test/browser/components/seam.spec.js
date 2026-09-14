import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/seam.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

// elementFromPoint reads viewport-relative coordinates: it returns null for
// a point below the fold. The fixture stacks six fixed-height sections
// taller than the default viewport, so scroll each into view first.
const hitIsSection = (page, id, corner) => page.evaluate(([i, c]) => {
	const el = document.getElementById(i);
	el.scrollIntoView({ block: 'center' });
	const r = el.getBoundingClientRect();
	const x = c.includes('left') ? r.left + 3 : r.right - 3;
	const y = c.includes('top') ? r.top + 3 : r.bottom - 3;
	const hit = document.elementFromPoint(x, y);
	return hit === el || el.contains(hit);
}, [id, corner]);

// clip-path removes the cut corner from hit testing (confirmed above), but a
// raster mask-image does not: all three engines still hit-test the section's
// full border-box under a masked-away pixel, even though it paints as
// transparent there. So the curve/wave shape is verified by sampling the
// actual alpha of the strip image the component's own computed mask-image
// references, rather than by hit testing a point.
const maskStripAlphaAt = (page, id, xFrac, yFrac) => page.evaluate(async ([i, xf, yf]) => {
	const cs = getComputedStyle(document.getElementById(i));
	const urls = [...cs.maskImage.matchAll(/url\((["']?)(.*?)\1\)/g)].map((m) => m[2]);
	const strip = urls[urls.length - 1];
	const img = new Image();
	img.src = strip;
	await img.decode();
	const canvas = document.createElement('canvas');
	canvas.width = 100;
	canvas.height = 10;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, 100, 10);
	return ctx.getImageData(Math.min(99, Math.floor(xf * 100)), Math.min(9, Math.floor(yf * 10)), 1, 1).data[3];
}, [id, xFrac, yFrac]);

test.describe('seam', () => {
	test('a slant cuts one corner and leaves the other', async ({ page }) => {
		await open(page);
		expect(await hitIsSection(page, 'slant', 'bottom-right')).toBe(false);
		expect(await hitIsSection(page, 'slant', 'bottom-left')).toBe(true);
		expect(await hitIsSection(page, 'flip', 'bottom-left')).toBe(false);
		expect(await hitIsSection(page, 'flip', 'bottom-right')).toBe(true);
		expect(await hitIsSection(page, 'top', 'top-left')).toBe(false);
		expect(await hitIsSection(page, 'top', 'bottom-left')).toBe(true);
		expect(await hitIsSection(page, 'both', 'top-left')).toBe(false);
		expect(await hitIsSection(page, 'both', 'bottom-right')).toBe(false);
	});

	test('curve and wave use a mask and cut the middle of the edge or the corners', async ({ page }) => {
		await open(page);
		expect(await style(page, '#curve', 'mask-image')).not.toBe('none');
		expect(await maskStripAlphaAt(page, 'curve', 0.02, 0.9)).toBeLessThan(50);
		expect(await maskStripAlphaAt(page, 'curve', 0.5, 0.9)).toBeGreaterThan(200);
		expect(await style(page, '#wave', 'mask-image')).not.toBe('none');
	});

	test('the cut edge gains the depth as padding', async ({ page }) => {
		await open(page);
		const depth = 2 * (await token(page, '--yeti-space-sm'));
		const pad = await token(page, '--yeti-seam-padding');
		expect(await px(page, '#slant', 'padding-bottom')).toBeCloseTo(pad + depth, 0);
		expect(await px(page, '#slant', 'padding-top')).toBeCloseTo(await token(page, '--yeti-space-lg'), 0);
		expect(await px(page, '#both', 'padding-top')).toBeCloseTo(pad + 2 * (await token(page, '--yeti-space-md')), 0);
	});

	for (const scheme of ['light', 'dark']) {
		test(`text meets AA in ${scheme}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			await open(page);
			for (const sel of await page.evaluate(() => [...document.querySelectorAll('[data-contrast]')].map((el, i) => { el.dataset.contrastId = String(i); return `[data-contrast-id="${i}"]`; }))) {
				await expectAA(page, sel, { large: await page.evaluate((s) => document.querySelector(s).dataset.contrast === 'large', sel), label: `${sel} ${scheme}` });
			}
		});
	}

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
