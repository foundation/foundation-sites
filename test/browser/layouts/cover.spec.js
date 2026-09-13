import { test, expect } from 'playwright/test';
import { open, rect, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('cover', () => {
	test('is at least as tall as the viewport', async ({ page }) => {
		await open(page, 'cover');
		const height = await page.evaluate(() => window.innerHeight);
		expect((await rect(page, '#cover')).height).toBeGreaterThanOrEqual(height - 1);
	});

	test('centers the data-center child between header and footer', async ({ page }) => {
		await open(page, 'cover');
		const [header, center, footer] = await Promise.all([rect(page, '#header'), rect(page, '#center'), rect(page, '#footer')]);
		const midpoint = (header.bottom + footer.top) / 2;
		expect((center.top + center.bottom) / 2).toBeCloseTo(midpoint, 0);
	});

	test('honours --yeti-cover-height', async ({ page }) => {
		await open(page, 'cover');
		expect((await rect(page, '#short')).height).toBeCloseTo(400, 1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'cover');
		await expectNoChildMargins(page, '.cover');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'cover');
		expect(await axe(page)).toEqual([]);
	});
});
