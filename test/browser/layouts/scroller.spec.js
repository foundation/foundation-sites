import { test, expect } from 'playwright/test';
import { open, style, rect, token, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('scroller', () => {
	test('overflows and scrolls instead of wrapping', async ({ page }) => {
		await open(page, 'scroller', 400);
		const overflow = await page.evaluate(() => { const el = document.getElementById('scroller'); return el.scrollWidth > el.clientWidth; });
		expect(overflow).toBe(true);
		const [s1, s2] = await Promise.all([rect(page, '#s1'), rect(page, '#s2')]);
		expect(s2.top).toBeCloseTo(s1.top, 1);
		expect(s2.left - s1.right).toBeCloseTo(await token(page, '--yeti-space-md'), 1);
	});

	test('snaps only with data-snap, and data-width sizes every item', async ({ page }) => {
		await open(page, 'scroller', 400);
		expect(await style(page, '#scroller', 'scroll-snap-type')).toBe('none');
		expect((await style(page, '#snapped', 'scroll-snap-type')).startsWith('x')).toBe(true);
		expect((await rect(page, '#n1')).width).toBeCloseTo(await token(page, '--yeti-width-xs'), 1);
	});

	test('receives focus from the keyboard', async ({ page }) => {
		await open(page, 'scroller', 400);
		await page.keyboard.press('Tab');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('scroller');
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'scroller');
		await expectNoChildMargins(page, '.scroller');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'scroller');
		expect(await axe(page)).toEqual([]);
	});
});
