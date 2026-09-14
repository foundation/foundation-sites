import { test, expect } from 'playwright/test';
import { open, stage, rect, token, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('breakout', () => {
	test('plain children sit in a centered column at the maximum; bleeding children span the width', async ({ page }) => {
		await open(page, 'breakout', 1000);
		const [box, plain, bleed, after] = await Promise.all([rect(page, '#breakout'), rect(page, '#plain'), rect(page, '#bleed'), rect(page, '#after')]);
		expect(plain.width).toBeCloseTo(await token(page, '--yeti-width-md'), 0);
		expect(plain.left - box.left).toBeCloseTo(box.right - plain.right, 0);
		expect(bleed.width).toBeCloseTo(box.width, 0);
		expect(after.top - bleed.bottom).toBeCloseTo(await token(page, '--yeti-space-md'), 0);
	});

	test('data-note sits in the margin when wide and in the column when narrow', async ({ page }) => {
		await open(page, 'breakout', 1200);
		const [plain, note] = await Promise.all([rect(page, '#plain'), rect(page, '#note')]);
		expect(note.left).toBeCloseTo(plain.right, 0);
		expect(Math.abs(note.top - plain.top)).toBeLessThan(2);
		await stage(page, 600);
		const [p2, n2] = await Promise.all([rect(page, '#plain'), rect(page, '#note')]);
		expect(n2.top).toBeGreaterThanOrEqual(p2.bottom);
		expect(n2.left).toBeCloseTo(p2.left, 0);
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
