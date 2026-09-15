import { test, expect } from 'playwright/test';
import { stage, rect, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/dropdown.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const isOpen = (page, id) => page.evaluate((i) => document.getElementById(i).matches(':popover-open'), id);
const settle = (page, selector) => page.evaluate((s) => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	.then(() => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished))), selector);
const anchored = (page) => page.evaluate(() => CSS.supports('anchor-name: --a') && CSS.supports('anchor-scope: --a') && CSS.supports('position-area', 'block-end'));

test.describe('dropdown', () => {
	test('the panel is shut until the trigger is pressed, and Escape shuts it again', async ({ page }) => {
		await open(page);
		expect(await isOpen(page, 'menu-one')).toBe(false);
		await page.click('#trigger-one');
		expect(await isOpen(page, 'menu-one')).toBe(true);
		await page.keyboard.press('Escape');
		expect(await isOpen(page, 'menu-one')).toBe(false);
	});

	test('a click outside shuts it', async ({ page }) => {
		await open(page);
		await page.click('#trigger-one');
		await settle(page, '#menu-one');
		const viewport = page.viewportSize();
		await page.mouse.click(viewport.width - 5, viewport.height - 5);
		expect(await isOpen(page, 'menu-one')).toBe(false);
	});

	test('each panel hangs under its own trigger', async ({ page }) => {
		await open(page);
		test.skip(!(await anchored(page)), 'anchor positioning is missing, so the user agent centres the panel');
		await page.click('#trigger-two');
		await settle(page, '#menu-two');
		const [trigger, panel] = await Promise.all([rect(page, '#trigger-two'), rect(page, '#menu-two')]);
		expect(panel.top).toBeGreaterThanOrEqual(trigger.bottom - 1);
		expect(Math.abs(panel.right - trigger.right)).toBeLessThan(4);
		await page.keyboard.press('Escape');
		await page.click('#trigger-one');
		await settle(page, '#menu-one');
		const [first, firstPanel] = await Promise.all([rect(page, '#trigger-one'), rect(page, '#menu-one')]);
		expect(firstPanel.top).toBeGreaterThanOrEqual(first.bottom - 1);
		// The anchor name is scoped, so this panel hangs off its own trigger
		// rather than off the last one on the page.
		expect(Math.abs(firstPanel.left - first.left)).toBeLessThan(4);
	});

	test('Tab from the trigger reaches the first item', async ({ page, browserName }) => {
		await open(page);
		await page.focus('#trigger-one');
		await page.keyboard.press('Enter');
		await settle(page, '#menu-one');
		await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('item-one');
	});

	test('has no accessibility violations, shut and open', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
		await page.click('#trigger-one');
		await settle(page, '#menu-one');
		expect(await axe(page)).toEqual([]);
	});
});
