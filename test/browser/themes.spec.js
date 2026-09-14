import { test, expect } from 'playwright/test';
import { rect, px, style, axe } from './lib/layout.js';

test.describe('themes', () => {
	test('soft renders pill buttons and rounded cards', async ({ page }) => {
		expect((await page.goto('/test/browser/fixtures/themes/soft.html')).status()).toBe(200);
		const r = await rect(page, '.button');
		expect(await px(page, '.button', 'border-top-left-radius')).toBeGreaterThanOrEqual(r.height / 2);
		expect(await px(page, '.card', 'border-top-left-radius')).toBeGreaterThanOrEqual(20);
		expect(await style(page, '#t-raised-short', 'border-top-color')).toBe('rgba(0, 0, 0, 0)');
		expect(await style(page, '#t-raised-short', 'box-shadow')).not.toBe('none');
		expect(await axe(page)).toEqual([]);
	});

	test('soft\'s shadow colour still flips with the colour scheme', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		expect((await page.goto('/test/browser/fixtures/themes/soft.html')).status()).toBe(200);
		const light = await style(page, '#t-raised-short', 'box-shadow');
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.reload();
		const dark = await style(page, '#t-raised-short', 'box-shadow');
		expect(dark).not.toBe(light);
	});

	test('sharp renders square corners and thick borders', async ({ page }) => {
		expect((await page.goto('/test/browser/fixtures/themes/sharp.html')).status()).toBe(200);
		expect(await px(page, '.button', 'border-top-left-radius')).toBe(0);
		expect(await px(page, '.card', 'border-top-width')).toBe(2);
		expect(await style(page, '#t-raised-short', 'box-shadow')).not.toBe('none');
		expect(await axe(page)).toEqual([]);
	});
});
