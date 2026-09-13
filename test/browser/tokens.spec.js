import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

const px = (page, selector, prop) => page.evaluate(([s, p]) => parseFloat(getComputedStyle(document.querySelector(s))[p]), [selector, prop]);
const NARROW = { width: 320, height: 800 };
const WIDE = { width: 1280, height: 800 };
const step4 = (base, ratio) => base * ratio ** 4;

test.describe('scale tokens', () => {
	test('steps interpolate base and ratio between the two viewports', async ({ page }) => {
		await page.setViewportSize(NARROW);
		const response = await page.goto('/test/browser/fixtures/scale.html');
		expect(response.status()).toBe(200);
		expect(await px(page, '#step-4', 'width')).toBeCloseTo(step4(16, 1.2), 0);
		expect(await px(page, '#space-md', 'width')).toBeCloseTo(16, 1);
		await page.setViewportSize(WIDE);
		expect(await px(page, '#step-4', 'width')).toBeCloseTo(step4(18, 1.333), 0);
		expect(await px(page, '#space-md', 'width')).toBeCloseTo(18, 1);
		expect(await px(page, '#space-md-static', 'width')).toBeCloseTo(16, 1);
	});

	test('changing --yeti-ratio live recomputes every step', async ({ page }) => {
		await page.setViewportSize(NARROW);
		await page.goto('/test/browser/fixtures/scale.html');
		await page.evaluate(() => document.documentElement.style.setProperty('--yeti-ratio', '2'));
		expect(await px(page, '#step-4', 'width')).toBeCloseTo(step4(16, 2), 0);
		await page.setViewportSize(WIDE);
		expect(await px(page, '#step-4', 'width')).toBeCloseTo(step4(18, 2), 0);
	});

	test('radius and leading derive from the base', async ({ page }) => {
		await page.setViewportSize(NARROW);
		await page.goto('/test/browser/fixtures/scale.html');
		expect(await px(page, '#radius-md', 'width')).toBeCloseTo(8, 1);
		expect(await px(page, '#leading', 'lineHeight')).toBeCloseTo(16 + 8, 0);
	});

	test('has no accessibility violations', async ({ page }) => {
		await page.goto('/test/browser/fixtures/scale.html');
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	});
});
