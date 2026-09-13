import { test, expect } from 'playwright/test';
import { open, stage, rect, token, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('breakout', () => {
	test('plain children sit in a centered column at the maximum; bleeding children span the width', async ({ page }) => {
		await open(page, 'breakout', 1000);
		const [box, plain, bleed, after] = await Promise.all([rect(page, '#breakout'), rect(page, '#plain'), rect(page, '#bleed'), rect(page, '#after')]);
		expect(plain.width).toBeCloseTo(await token(page, '--yeti-width-lg'), 0);
		expect(plain.left - box.left).toBeCloseTo(box.right - plain.right, 0);
		expect(bleed.width).toBeCloseTo(box.width, 0);
		expect(after.top - bleed.bottom).toBeCloseTo(await token(page, '--yeti-space-md'), 0);
	});

	test('the column shrinks to the width minus two gutters when narrow', async ({ page }) => {
		await open(page, 'breakout', 400);
		const gap = await token(page, '--yeti-space-md');
		expect((await rect(page, '#plain')).width).toBeCloseTo(400 - 2 * gap, 0);
		expect((await rect(page, '#bleed')).width).toBeCloseTo(400, 0);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'breakout');
		await expectNoChildMargins(page, '.breakout');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'breakout');
		expect(await axe(page)).toEqual([]);
	});
});
