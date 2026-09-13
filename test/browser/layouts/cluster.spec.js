import { test, expect } from 'playwright/test';
import { open, stage, rect, rects, token, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('cluster', () => {
	test('items sit on one row when there is room and wrap when there is not', async ({ page }) => {
		await open(page, 'cluster', 1600);
		const wide = await rects(page, '#cluster > *');
		expect(new Set(wide.map((r) => r.top)).size).toBe(1);
		await stage(page, 300);
		const narrow = await rects(page, '#cluster > *');
		expect(new Set(narrow.map((r) => r.top)).size).toBe(5);
		expect(narrow[1].left - narrow[0].right).toBeCloseTo(await token(page, '--yeti-space-md'), 1);
		expect(narrow[2].top - narrow[0].bottom).toBeCloseTo(await token(page, '--yeti-space-md'), 1);
	});

	test('data-justify="between" puts the first and last items at the edges', async ({ page }) => {
		await open(page, 'cluster');
		const [box, b1, b3] = await Promise.all([rect(page, '#between'), rect(page, '#b1'), rect(page, '#b3')]);
		expect(b1.left).toBeCloseTo(box.left, 1);
		expect(b3.right).toBeCloseTo(box.right, 1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'cluster');
		await expectNoChildMargins(page, '.cluster');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'cluster');
		expect(await axe(page)).toEqual([]);
	});
});
