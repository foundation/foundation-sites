import { test, expect } from 'playwright/test';
import { stage, rect, style, axe, painted } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/nav.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
	await painted(page);
};
const isOpen = (page, id) => page.evaluate((i) => document.getElementById(i).matches(':popover-open'), id);
// The panel enters with a transition, so geometry is read once it has settled.
// Two frames: input is processed, then rAF callbacks run, so after two the
// style recalculation that creates the transition has certainly happened and
// getAnimations() reports it. Waiting on an empty list resolves at once.
const settle = (page, selector) => page.evaluate((s) => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	.then(() => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished))), selector);
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

	test('a sheet never runs past the bottom of the viewport', async ({ page }) => {
		await page.setViewportSize({ width: 400, height: 220 });
		await open(page, 400);
		await page.click('#toggle');
		await settle(page, '#menu');
		const menu = await rect(page, '#menu');
		expect(menu.bottom).toBeLessThanOrEqual(220 + 1);
		const scrolls = await page.evaluate(() => { const el = document.getElementById('menu'); return el.scrollHeight > el.clientHeight; });
		expect(scrolls || menu.bottom <= 220).toBe(true);
	});

	test('a short sheet hugs its content instead of filling the rest of a tall viewport', async ({ page }) => {
		await open(page, 400);
		await page.click('#toggle');
		await settle(page, '#menu');
		const menu = await rect(page, '#menu');
		const viewport = page.viewportSize();
		expect(menu.height).toBeLessThan(400);
		expect(menu.bottom).toBeLessThan(viewport.height);
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

	test('a panel that is open stays a panel when the nav widens', async ({ page }) => {
		await open(page, 400);
		await page.click('#toggle');
		await settle(page, '#menu');
		await stage(page, 1000);
		expect(await isOpen(page, 'menu')).toBe(true);
		expect(await style(page, '#menu', 'position')).toBe('fixed');
		expect(await style(page, '#menu', 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
		expect(await style(page, '#toggle', 'display')).not.toBe('none');
		await page.keyboard.press('Escape');
		expect(await style(page, '#menu', 'position')).toBe('static');
		expect(await style(page, '#toggle', 'display')).toBe('none');
	});

	test('has no accessibility violations, closed and open', async ({ page }) => {
		await open(page, 400);
		expect(await axe(page)).toEqual([]);
		await page.click('#toggle');
		await settle(page, '#menu');
		expect(await axe(page)).toEqual([]);
		await stage(page, 1000);
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

	test('a dropdown trigger in the list is styled like a link', async ({ page }) => {
		await open(page, 1000);
		const [link, trigger] = await Promise.all([rect(page, '#current'), rect(page, '#nav-more-trigger')]);
		expect(trigger.height).toBeCloseTo(link.height, 0);
	});

	test('a dropdown in the open panel is a full-width block docked under its trigger', async ({ page }) => {
		await open(page, 400);
		await page.click('#toggle');
		await settle(page, '#menu');
		// The wrapper is inline-block in the bar, so without a reset the trigger
		// shrink-wraps and sits narrower than the links it stands among.
		const [link, trigger] = await Promise.all([rect(page, '#plain'), rect(page, '#nav-more-trigger')]);
		expect(trigger.width).toBeCloseTo(link.width, 0);
		await page.click('#nav-more-trigger');
		await settle(page, '#nav-more');
		expect(await isOpen(page, 'menu')).toBe(true);
		const viewport = page.viewportSize();
		const [panel, sub] = await Promise.all([rect(page, '#menu'), rect(page, '#nav-more')]);
		if (await anchored(page)) {
			expect(sub.top).toBeCloseTo(trigger.bottom, 0);
			expect(sub.left).toBeCloseTo(panel.left, 0);
			expect(sub.right).toBeCloseTo(panel.right, 0);
		} else {
			expect(sub.bottom).toBeCloseTo(viewport.height, 0);
			expect(sub.width).toBeCloseTo(viewport.width, 0);
		}
		expect(sub.bottom).toBeLessThanOrEqual(viewport.height + 1);
	});

	test('a submenu taller than the room below its trigger scrolls instead of running off', async ({ page }) => {
		await open(page, 400);
		await page.evaluate(() => {
			const panel = document.getElementById('nav-more');
			for (let i = 0; i < 30; i += 1) {
				const link = document.createElement('a');
				link.href = '#';
				link.textContent = `Item ${i}`;
				panel.append(link);
			}
		});
		await page.click('#toggle');
		await page.click('#nav-more-trigger');
		await settle(page, '#nav-more');
		const sub = await rect(page, '#nav-more');
		expect(sub.bottom).toBeLessThanOrEqual(page.viewportSize().height + 1);
		expect(await page.evaluate(() => { const el = document.getElementById('nav-more'); return el.scrollHeight > el.clientHeight + 1; })).toBe(true);
	});

	test('a submenu inside a drawer stops at the drawer\u2019s edge', async ({ page }) => {
		await open(page, 400);
		await page.click('#drawer-toggle');
		await settle(page, '#drawer-menu');
		await page.click('#drawer-more-trigger');
		await settle(page, '#drawer-more');
		const [panel, sub] = await Promise.all([rect(page, '#drawer-menu'), rect(page, '#drawer-more')]);
		expect(panel.right).toBeLessThan(page.viewportSize().width);
		if (await anchored(page)) {
			expect(sub.left).toBeCloseTo(panel.left, 0);
			expect(sub.right).toBeCloseTo(panel.right, 0);
		} else {
			expect(sub.bottom).toBeCloseTo(page.viewportSize().height, 0);
		}
	});

	test('Escape closes the submenu before the panel', async ({ page }) => {
		await open(page, 400);
		await page.click('#toggle');
		await page.click('#nav-more-trigger');
		await settle(page, '#nav-more');
		expect(await isOpen(page, 'nav-more')).toBe(true);
		await page.keyboard.press('Escape');
		expect(await isOpen(page, 'nav-more')).toBe(false);
		expect(await isOpen(page, 'menu')).toBe(true);
		await page.keyboard.press('Escape');
		expect(await isOpen(page, 'menu')).toBe(false);
	});

	test('a dropdown in the bar keeps its own card', async ({ page }) => {
		await open(page, 1000);
		await page.click('#nav-more-trigger');
		await settle(page, '#nav-more');
		const [bar, sub] = await Promise.all([rect(page, '#nav'), rect(page, '#nav-more')]);
		expect(sub.width).toBeLessThan(bar.width / 2);
		expect(sub.left).toBeGreaterThan(bar.left);
	});

	test('a dropdown inside a nav item opens and is not clipped by the bar', async ({ page }) => {
		await open(page, 1000);
		await page.click('#nav-more-trigger');
		await settle(page, '#nav-more');
		expect(await page.evaluate(() => document.getElementById('nav-more').matches(':popover-open'))).toBe(true);
		const panel = await rect(page, '#nav-more');
		expect(panel.height).toBeGreaterThan(0);
		const painted = await page.evaluate(() => {
			const panel = document.getElementById('nav-more');
			const box = panel.getBoundingClientRect();
			const hit = document.elementFromPoint(box.left + box.width / 2, box.top + Math.min(10, box.height / 2));
			return panel === hit || panel.contains(hit);
		});
		expect(painted).toBe(true);
	});
});
