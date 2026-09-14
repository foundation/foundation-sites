import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/table.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('table', () => {
	test('header rule, stripes, hover, numeric alignment', async ({ page }) => {
		await open(page);
		expect(await style(page, '#head', 'font-weight')).toBe(String(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--yeti-weight-strong').trim())));
		expect(await style(page, '#r2', 'background-color')).not.toBe(await style(page, '#r1', 'background-color'));
		expect(await style(page, '#r3', 'background-color')).toBe(await style(page, '#r1', 'background-color'));
		const rest = await style(page, '#r1', 'background-color');
		await page.hover('#r1');
		expect(await style(page, '#r1', 'background-color')).not.toBe(rest);
		expect(await style(page, '#n1', 'text-align')).toBe('end');
		expect(await style(page, '#n1', 'font-variant-numeric')).toBe('tabular-nums');
	});

	test('data-grid borders every cell and data-size="sm" tightens padding', async ({ page }) => {
		await open(page);
		expect(await px(page, '#g1', 'border-left-width')).toBeGreaterThan(0);
		expect(await px(page, '#g1', 'padding-top')).toBeLessThan(await px(page, '#n1', 'padding-top'));
	});

	test('the header rule survives data-grid', async ({ page }) => {
		await open(page);
		expect(await style(page, '#g-head', 'border-bottom-color')).not.toBe(await style(page, '#g1', 'border-bottom-color'));
	});

	test('a wide table scrolls inside a scroller and stays a table', async ({ page }) => {
		await open(page);
		expect(await page.evaluate(() => { const el = document.getElementById('wide'); return el.scrollWidth > el.clientWidth; })).toBe(true);
		expect(await style(page, '#widetable', 'display')).toBe('table');
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
