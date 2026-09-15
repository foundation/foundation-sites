import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, token, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/pagination.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('pagination', () => {
	test('every target is at least a control square and the current page is filled', async ({ page }) => {
		await open(page);
		const size = await token(page, '--yeti-control-size');
		for (const r of await rects(page, '#pages li > *')) {
			expect(r.width).toBeGreaterThanOrEqual(size - 0.5);
			expect(r.height).toBeGreaterThanOrEqual(size - 0.5);
		}
		expect(await style(page, '#p2', 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
		expect(await style(page, '#p1', 'background-color')).toBe('rgba(0, 0, 0, 0)');
		expect(await style(page, '#gap', 'color')).not.toBe(await style(page, '#p1', 'color'));
	});

	test('below the threshold only Previous, the current page, and Next remain', async ({ page }) => {
		await open(page, 1000);
		for (const id of ['prev', 'p1', 'p2', 'p3', 'gap', 'p9', 'next']) expect(await style(page, `#${id}`, 'display'), id).not.toBe('none');
		await stage(page, 300);
		for (const id of ['prev', 'p2', 'next']) expect((await rect(page, `#${id}`)).width, id).toBeGreaterThan(0);
		for (const id of ['p1', 'p3', 'gap', 'p9']) expect((await rect(page, `#${id}`)).width, id).toBe(0);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
