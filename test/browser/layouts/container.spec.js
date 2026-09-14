import { test, expect } from 'playwright/test';
import { open, stage, rect, axe } from '../lib/layout.js';

test.describe('container', () => {
	test('a query against the container fires at its width, not the viewport', async ({ page }) => {
		await open(page, 'container', 1000);
		let [a, b] = await Promise.all([rect(page, '#a'), rect(page, '#b')]);
		expect(b.top).toBeCloseTo(a.top, 1);
		await stage(page, 400);
		[a, b] = await Promise.all([rect(page, '#a'), rect(page, '#b')]);
		expect(b.top).toBeGreaterThanOrEqual(a.bottom);
	});

	test('the viewport alone does not fire the query', async ({ page }) => {
		await open(page, 'container', 1000);
		let [a, b] = await Promise.all([rect(page, '#a'), rect(page, '#b')]);
		expect(b.top).toBeCloseTo(a.top, 1);
		await page.setViewportSize({ width: 500, height: 800 });
		[a, b] = await Promise.all([rect(page, '#a'), rect(page, '#b')]);
		expect(b.top).toBeCloseTo(a.top, 1);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'container');
		expect(await axe(page)).toEqual([]);
	});
});
