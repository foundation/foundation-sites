import { test, expect } from 'playwright/test';
import { stage, rect, style, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/nav.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const isOpen = (page, id) => page.evaluate((i) => document.getElementById(i).matches(':popover-open'), id);
// The panel enters with a transition, so geometry is read once it has settled.
const settle = (page, selector) => page.evaluate((s) => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished)), selector);
const anchored = (page) => page.evaluate(() => CSS.supports('anchor-name: --a') && CSS.supports('anchor-scope: --a'));

test.describe('nav', () => {
	test('at or above the threshold the links sit in the bar and the toggle is gone', async ({ page }) => {
		await open(page, 1000);
		expect(await style(page, '#toggle', 'display')).toBe('none');
		expect(await style(page, '#menu', 'position')).toBe('static');
		expect(await page.getAttribute('#menu', 'popover')).not.toBeNull();
		const [brand, current, plain, actions] = await Promise.all([rect(page, '#brand'), rect(page, '#current'), rect(page, '#plain'), rect(page, '#actions')]);
		const mid = (r) => (r.top + r.bottom) / 2;
		for (const r of [current, plain, actions]) expect(Math.abs(mid(r) - mid(brand))).toBeLessThan(2);
		expect(current.left).toBeGreaterThan(brand.right);
		expect(actions.left).toBeGreaterThan(plain.right);
	});

	test('below the threshold the toggle opens the list as a sheet under the bar; Escape and an outside click close it', async ({ page }) => {
		await open(page, 400);
		expect(await style(page, '#toggle', 'display')).not.toBe('none');
		expect(await style(page, '#menu', 'display')).toBe('none');
		await page.click('#toggle');
		expect(await isOpen(page, 'menu')).toBe(true);
		await settle(page, '#menu');
		const [bar, menu] = await Promise.all([rect(page, '#nav'), rect(page, '#menu')]);
		const viewport = page.viewportSize();
		expect(menu.width).toBeCloseTo(viewport.width, 0);
		if (await anchored(page)) expect(menu.top).toBeCloseTo(bar.bottom, 0);
		else expect(menu.top).toBe(0);
		await page.keyboard.press('Escape');
		expect(await isOpen(page, 'menu')).toBe(false);
		await page.click('#toggle');
		await page.mouse.click(viewport.width / 2, viewport.height - 5);
		expect(await isOpen(page, 'menu')).toBe(false);
	});

	test('Tab from the toggle reaches the first link', async ({ page, browserName }) => {
		await open(page, 400);
		await page.focus('#toggle');
		await page.keyboard.press('Enter');
		expect(await isOpen(page, 'menu')).toBe(true);
		await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('current');
	});

	test('the current link takes the variant text colour and strong weight', async ({ page }) => {
		await open(page, 1000);
		expect(await style(page, '#current', 'color')).not.toBe(await style(page, '#plain', 'color'));
		expect(parseInt(await style(page, '#current', 'font-weight'), 10)).toBeGreaterThan(parseInt(await style(page, '#plain', 'font-weight'), 10));
	});

	test('narrowing collapses the bar and widening restores it', async ({ page }) => {
		await open(page, 400);
		await page.click('#toggle');
		await page.keyboard.press('Escape');
		await stage(page, 1000);
		expect(await style(page, '#toggle', 'display')).toBe('none');
		expect(await style(page, '#menu', 'position')).toBe('static');
		await stage(page, 400);
		expect(await style(page, '#toggle', 'display')).not.toBe('none');
		expect(await style(page, '#menu', 'display')).toBe('none');
	});

	test('has no accessibility violations, closed and open', async ({ page }) => {
		await open(page, 400);
		expect(await axe(page)).toEqual([]);
		await page.click('#toggle');
		await settle(page, '#menu');
		expect(await axe(page)).toEqual([]);
	});

	test('a drawer is a column from the start edge with a backdrop, and a backdrop click closes it', async ({ page }) => {
		await open(page, 400);
		await page.click('#drawer-toggle');
		expect(await isOpen(page, 'drawer-menu')).toBe(true);
		await settle(page, '#drawer-menu');
		const menu = await rect(page, '#drawer-menu');
		const viewport = page.viewportSize();
		expect(menu.left).toBe(0);
		expect(menu.width).toBeCloseTo(320, 0);
		expect(menu.height).toBeCloseTo(viewport.height, 0);
		expect(await page.evaluate(() => getComputedStyle(document.getElementById('drawer-menu'), '::backdrop').backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
		await page.mouse.click(viewport.width - 10, viewport.height / 2);
		expect(await isOpen(page, 'drawer-menu')).toBe(false);
	});

	test('a screen covers the viewport and its close item hides it', async ({ page }) => {
		await open(page, 400);
		await page.click('#screen-toggle');
		await settle(page, '#screen-menu');
		const menu = await rect(page, '#screen-menu');
		const viewport = page.viewportSize();
		expect(menu.width).toBeCloseTo(viewport.width, 0);
		expect(menu.height).toBeCloseTo(viewport.height, 0);
		const close = await rect(page, '#screen-close');
		expect(close.right).toBeGreaterThan(viewport.width - 60);
		expect(close.top).toBeLessThan(60);
		await page.click('#screen-close button');
		expect(await isOpen(page, 'screen-menu')).toBe(false);
	});

	test('the close item is hidden while the links are in the bar', async ({ page }) => {
		await open(page, 1000);
		expect(await style(page, '#drawer-close', 'display')).toBe('none');
		expect(await style(page, '#screen-close', 'display')).toBe('none');
	});
});
