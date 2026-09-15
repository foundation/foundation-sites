import { test, expect } from 'playwright/test';
import { stage, rect, style, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/accordion.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const isOpen = (page, id) => page.evaluate((i) => document.getElementById(i).open, id);
const after = (page, id, prop) => page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i), '::after').getPropertyValue(p), [id, prop]);

test.describe('accordion', () => {
	test('a shut panel is hidden and an open one is shown', async ({ page }) => {
		await open(page);
		expect(await isOpen(page, 'd1')).toBe(false);
		expect(await isOpen(page, 'd2')).toBe(true);
		expect((await rect(page, '#p2')).height).toBeGreaterThan(0);
		expect(await page.locator('#p1').isVisible()).toBe(false);
	});

	test('the native marker is gone and the chevron turns when it opens', async ({ page }) => {
		await open(page);
		expect(await style(page, '#s1', 'list-style-type')).toBe('none');
		const shut = await after(page, 's1', 'rotate');
		const open2 = await after(page, 's2', 'rotate');
		expect(shut).not.toBe(open2);
		expect(await after(page, 's1', 'content')).not.toBe('none');
	});

	test('Enter on a summary opens its panel', async ({ page }) => {
		await open(page);
		await page.focus('#s1');
		await page.keyboard.press('Enter');
		expect(await isOpen(page, 'd1')).toBe(true);
	});

	test('two details sharing a name close one another', async ({ page }) => {
		await open(page);
		await page.click('#es1');
		expect(await isOpen(page, 'e1')).toBe(true);
		await page.click('#es2');
		expect(await isOpen(page, 'e2')).toBe(true);
		expect(await isOpen(page, 'e1')).toBe(false);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
