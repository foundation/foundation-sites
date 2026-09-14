import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/badge.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('badge', () => {
	test('is one step smaller than its text, quiet by default, and steps up with emphasis', async ({ page }) => {
		await open(page);
		const text = await px(page, '#stage p', 'font-size');
		expect(await px(page, '#medium', 'font-size')).toBeCloseTo(text * 0.8, 0);
		expect(await px(page, '#lg', 'font-size')).toBeGreaterThan(await px(page, '#medium', 'font-size'));
		expect(await style(page, '#low', 'background-color')).toBe('rgba(0, 0, 0, 0)');
		expect(await style(page, '#high', 'background-color')).not.toBe(await style(page, '#medium', 'background-color'));
		const r = await rect(page, '#medium');
		expect(await px(page, '#medium', 'border-top-left-radius')).toBeGreaterThanOrEqual(r.height / 2);
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
