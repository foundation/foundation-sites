import { test, expect } from 'playwright/test';
import { open, rect, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('layer', () => {
	test('children share one box and the box is as tall as the tallest', async ({ page }) => {
		await open(page, 'layer', 600);
		const [box, base, top] = await Promise.all([rect(page, '#layer'), rect(page, '#base'), rect(page, '#top')]);
		expect(top.left).toBeCloseTo(base.left, 1);
		expect(top.top).toBeCloseTo(base.top, 1);
		expect(box.height).toBeCloseTo(Math.max(base.height, top.height), 0);
		expect(top.height).toBeCloseTo(box.height, 0);
	});

	test('data-align="end" sits a short child at the bottom', async ({ page }) => {
		await open(page, 'layer');
		const [box, tall, short] = await Promise.all([rect(page, '#end'), rect(page, '#tall'), rect(page, '#short')]);
		expect(box.height).toBeCloseTo(200, 0);
		expect(tall.top).toBeCloseTo(box.top, 1);
		expect(short.bottom).toBeCloseTo(box.bottom, 1);
	});

	test('data-align="baseline" behaves as start', async ({ page }) => {
		await open(page, 'layer');
		const [box, short] = await Promise.all([rect(page, '#baseline'), rect(page, '#baseline-short')]);
		expect(short.top).toBeCloseTo(box.top, 1);
		expect(box.height).toBeCloseTo(200, 0);
	});

	test('a child places itself with data-align-self and data-justify-self', async ({ page }) => {
		await open(page, 'layer');
		const [box, badge, caption] = await Promise.all([rect(page, '#placed'), rect(page, '#badge'), rect(page, '#caption')]);
		expect(box.height).toBeCloseTo(200, 0);
		expect(badge.top).toBeCloseTo(box.top, 1);
		expect(badge.right).toBeCloseTo(box.right, 1);
		expect(badge.width).toBeLessThan(box.width / 2);
		expect(caption.bottom).toBeCloseTo(box.bottom, 1);
		expect(caption.width).toBeCloseTo(box.width, 1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'layer');
		await expectNoChildMargins(page, '.layer');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'layer');
		expect(await axe(page)).toEqual([]);
	});
});
