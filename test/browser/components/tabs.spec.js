import { test, expect } from 'playwright/test';
import { stage, rect, style, axe, withoutModule } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/tabs.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const hidden = (page, id) => page.evaluate((i) => document.getElementById(i).hidden, id);
const selected = (page, id) => page.evaluate((i) => document.getElementById(i).getAttribute('aria-selected'), id);

test.describe('tabs', () => {
	test('without the module every panel is readable', async ({ page }) => {
		await withoutModule(page, 'tabs');
		await open(page);
		for (const id of ['p1', 'p2', 'p3']) expect(await hidden(page, id), id).toBe(false);
		for (const id of ['p1', 'p2', 'p3']) expect((await rect(page, `#${id}`)).height, id).toBeGreaterThan(0);
		for (const id of ['t1', 't2', 't3']) expect(await page.evaluate((i) => document.getElementById(i).tabIndex, id), id).toBe(0);
		expect(await axe(page)).toEqual([]);
	});

	test('with the module one panel shows and the rest are hidden', async ({ page }) => {
		await open(page);
		expect(await hidden(page, 'p1')).toBe(false);
		expect(await hidden(page, 'p2')).toBe(true);
		expect(await selected(page, 't1')).toBe('true');
		expect(await selected(page, 't2')).toBe('false');
	});

	test('clicking a tab swaps the panels', async ({ page }) => {
		await open(page);
		await page.click('#t2');
		expect(await hidden(page, 'p1')).toBe(true);
		expect(await hidden(page, 'p2')).toBe(false);
		expect(await selected(page, 't2')).toBe('true');
	});

	test('the arrows, Home and End move selection, and only one tab is in the tab order', async ({ page }) => {
		await open(page);
		await page.focus('#t1');
		await page.keyboard.press('ArrowRight');
		expect(await selected(page, 't2')).toBe('true');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('t2');
		await page.keyboard.press('End');
		expect(await selected(page, 't3')).toBe('true');
		await page.keyboard.press('Home');
		expect(await selected(page, 't1')).toBe('true');
		expect(await page.evaluate(() => document.getElementById('t2').tabIndex)).toBe(-1);
	});

	test('a vertical list uses the up and down arrows', async ({ page }) => {
		await open(page);
		await page.focus('#v1');
		await page.keyboard.press('ArrowDown');
		expect(await selected(page, 'v2')).toBe('true');
		const [list, panel] = await Promise.all([rect(page, '#vertical [role="tablist"]'), rect(page, '#vp2')]);
		expect(panel.left).toBeGreaterThanOrEqual(list.right - 2);
	});

	test('the selected panel can take focus when nothing inside it can', async ({ page }) => {
		await open(page);
		expect(await page.evaluate(() => document.getElementById('p1').tabIndex)).toBe(0);
	});

	test('the selected tab is marked with the hue', async ({ page }) => {
		await open(page);
		expect(await style(page, '#t1', 'border-bottom-color')).not.toBe(await style(page, '#t2', 'border-bottom-color'));
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
