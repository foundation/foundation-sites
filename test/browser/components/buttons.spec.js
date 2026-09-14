import { test, expect } from 'playwright/test';
import { stage, rect, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/buttons.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('buttons', () => {
	test('a loose group keeps a gap; an attached group fuses its members', async ({ page }) => {
		await open(page);
		const [l1, l2] = await Promise.all([rect(page, '#l1'), rect(page, '#l2')]);
		expect(l2.left - l1.right).toBeCloseTo(await token(page, '--yeti-space-sm'), 0);
		const [a1, a2, a3] = await Promise.all([rect(page, '#a1'), rect(page, '#a2'), rect(page, '#a3')]);
		const border = await token(page, '--yeti-border-width');
		expect(a2.left - a1.right).toBeCloseTo(-border, 1);
		expect(a3.left - a2.right).toBeCloseTo(-border, 1);
		expect(await px(page, '#a1', 'border-top-right-radius')).toBe(0);
		expect(await px(page, '#a2', 'border-top-left-radius')).toBe(0);
		expect(await px(page, '#a2', 'border-top-right-radius')).toBe(0);
		expect(await px(page, '#a3', 'border-top-left-radius')).toBe(0);
		expect(await px(page, '#a1', 'border-top-left-radius')).toBeGreaterThan(0);
	});

	test('a focused member is lifted above its neighbours', async ({ page, browserName }) => {
		// See the identical note in button.spec.js: headless WebKit does not
		// include plain buttons in Tab order by default, so Shift+Tab/Tab away
		// from a scripted .focus() cannot land back on a button either;
		// verified for real in chromium and firefox.
		test.skip(browserName === 'webkit', 'headless WebKit does not Tab to buttons');
		await open(page);
		await page.focus('#a2');
		await page.keyboard.press('Shift+Tab');
		await page.keyboard.press('Tab');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('a2');
		expect(await style(page, '#a2', 'z-index')).toBe('1');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
