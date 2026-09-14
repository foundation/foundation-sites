import { test, expect } from 'playwright/test';
import { rect, px, axe } from './lib/layout.js';

test.describe('themes', () => {
	test('soft renders pill buttons and rounded cards', async ({ page }) => {
		expect((await page.goto('/test/browser/fixtures/themes/soft.html')).status()).toBe(200);
		const r = await rect(page, '.button');
		expect(await px(page, '.button', 'border-top-left-radius')).toBeGreaterThanOrEqual(r.height / 2);
		expect(await px(page, '.card', 'border-top-left-radius')).toBeGreaterThanOrEqual(20);
		expect(await axe(page)).toEqual([]);
	});

	test('sharp renders square corners and thick borders', async ({ page }) => {
		expect((await page.goto('/test/browser/fixtures/themes/sharp.html')).status()).toBe(200);
		expect(await px(page, '.button', 'border-top-left-radius')).toBe(0);
		expect(await px(page, '.card', 'border-top-width')).toBe(2);
		expect(await axe(page)).toEqual([]);
	});
});
