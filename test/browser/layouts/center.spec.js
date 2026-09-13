import { test, expect } from 'playwright/test';
import { open, stage, rect, token, axe } from '../lib/layout.js';

test.describe('center', () => {
	test('content is capped at the maximum and centered at 1400px', async ({ page }) => {
		await open(page, 'center', 1400);
		const [box, s] = await Promise.all([rect(page, '#center'), rect(page, '#stage')]);
		const gap = await token(page, '--yeti-space-md');
		expect(box.width - 2 * gap).toBeCloseTo(await token(page, '--yeti-width-xl'), 1);
		expect(box.left - s.left).toBeCloseTo(s.right - box.right, 1);
	});

	test('fills a narrow container minus the gutters', async ({ page }) => {
		await open(page, 'center', 500);
		const box = await rect(page, '#center');
		const gap = await token(page, '--yeti-space-md');
		expect(box.width).toBeCloseTo(500, 1);
		expect((await rect(page, '#center > p')).width).toBeCloseTo(500 - 2 * gap, 1);
	});

	test('data-intrinsic centers each child on its own width', async ({ page }) => {
		await open(page, 'center');
		const [box, button] = await Promise.all([rect(page, '#intrinsic'), rect(page, '#button')]);
		expect(button.width).toBeLessThan(box.width / 2);
		expect((button.left + button.right) / 2).toBeCloseTo((box.left + box.right) / 2, 0);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'center');
		expect(await axe(page)).toEqual([]);
	});
});
