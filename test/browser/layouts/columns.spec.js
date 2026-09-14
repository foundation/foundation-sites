import { test, expect } from 'playwright/test';
import { open, stage, rects, rect, token, px, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('columns', () => {
	test('three columns above the threshold, three rows below it', async ({ page }) => {
		await open(page, 'columns', 1000);
		const wide = await rects(page, '#columns > *');
		expect(new Set(wide.map((r) => r.top)).size).toBe(1);
		const gap = await token(page, '--yeti-space-md');
		for (const r of wide) expect(r.width).toBeCloseTo((1000 - 2 * gap) / 3, 1);
		await stage(page, 400);
		const narrow = await rects(page, '#columns > *');
		expect(new Set(narrow.map((r) => r.top)).size).toBe(3);
		for (const r of narrow) expect(r.width).toBeCloseTo(400, 1);
	});

	test('the switch happens at the threshold token', async ({ page }) => {
		await open(page, 'columns');
		const threshold = await token(page, '--yeti-width-md');
		await stage(page, threshold + 2);
		expect(new Set((await rects(page, '#columns > *')).map((r) => r.top)).size).toBe(1);
		await stage(page, threshold - 2);
		expect(new Set((await rects(page, '#columns > *')).map((r) => r.top)).size).toBe(3);
	});

	test('data-limit="2" wraps the third child to a full row', async ({ page }) => {
		await open(page, 'columns', 1000);
		const [l1, l2, l3] = await Promise.all([rect(page, '#l1'), rect(page, '#l2'), rect(page, '#l3')]);
		expect(l1.top).toBeCloseTo(l2.top, 1);
		expect(l3.top).toBeGreaterThanOrEqual(l1.bottom);
		expect(l3.width).toBeCloseTo(1000, 1);
	});

	test('data-span gives a child a multiple of its siblings\' share', async ({ page }) => {
		await open(page, 'columns', 1000);
		const [main, side] = await Promise.all([rect(page, '#s-main'), rect(page, '#s-side')]);
		// The grow ratio applies to the free space, so each item's own padding comes out first.
		const pad = 2 * (await px(page, '#s-side', 'padding-inline-start'));
		expect(main.width - pad).toBeCloseTo(2 * (side.width - pad), 0);
		await stage(page, 400);
		expect((await rect(page, '#s-main')).width).toBeCloseTo(400, 1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'columns');
		await expectNoChildMargins(page, '.columns');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'columns');
		expect(await axe(page)).toEqual([]);
	});
});
