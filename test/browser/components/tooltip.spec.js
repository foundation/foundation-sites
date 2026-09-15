import { test, expect } from 'playwright/test';
import { stage, rect, style, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/tooltip.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const settle = (page, selector) => page.evaluate((s) => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	.then(() => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished))), selector);

test.describe('tooltip', () => {
	test('hidden at rest and shown on hover', async ({ page }) => {
		await open(page);
		expect(await style(page, '#top-tip', 'visibility')).toBe('hidden');
		await page.hover('#top-trigger');
		await settle(page, '#top-tip');
		expect(await style(page, '#top-tip', 'visibility')).toBe('visible');
		expect(parseFloat(await style(page, '#top-tip', 'opacity'))).toBeCloseTo(1, 1);
	});

	test('shown on keyboard focus too', async ({ page }) => {
		await open(page);
		await page.focus('#top-trigger');
		await settle(page, '#top-tip');
		expect(await style(page, '#top-tip', 'visibility')).toBe('visible');
	});

	test('sits above its trigger by default and beside it when asked', async ({ page }) => {
		await open(page);
		await page.hover('#top-trigger');
		await settle(page, '#top-tip');
		const [trigger, tip] = await Promise.all([rect(page, '#top-trigger'), rect(page, '#top-tip')]);
		expect(tip.bottom).toBeLessThanOrEqual(trigger.top + 1);
		await page.hover('#end-trigger');
		await settle(page, '#end-tip');
		const [endTrigger, endTip] = await Promise.all([rect(page, '#end-trigger'), rect(page, '#end-tip')]);
		expect(endTip.left).toBeGreaterThanOrEqual(endTrigger.right - 1);
	});

	test('a scrolling ancestor does not clip it where anchor positioning exists', async ({ page }) => {
		await open(page);
		const anchored = await page.evaluate(() => CSS.supports('anchor-name: --a') && CSS.supports('position-area', 'block-start'));
		test.skip(!anchored, 'without anchor positioning the bubble is absolutely positioned and can be clipped');
		await page.hover('#clipped-trigger');
		await settle(page, '#clipped-tip');
		expect(await style(page, '#clipped-tip', 'position')).toBe('fixed');
		expect((await rect(page, '#clipped-tip')).width).toBeGreaterThan(0);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
