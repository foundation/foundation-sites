import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

const style = (page, selector, prop) => page.evaluate(([s, p]) => getComputedStyle(document.querySelector(s))[p], [selector, prop]);

test.describe('reset', () => {
	test.beforeEach(async ({ page }) => {
		const response = await page.goto('/test/browser/fixtures/reset.html');
		expect(response.status()).toBe(200);
	});

	test('margins are zero on flow elements and preserved on dialog', async ({ page }) => {
		for (const id of ['h2', 'p', 'quote', 'figure', 'plain', 'table']) {
			const sel = `#${id}`;
			expect(await style(page, sel, 'marginTop'), sel).toBe('0px');
			expect(await style(page, sel, 'marginBottom'), sel).toBe('0px');
		}
		await page.evaluate(() => document.getElementById('dialog').showModal());
		const box = await page.evaluate(() => document.getElementById('dialog').getBoundingClientRect());
		const vw = await page.evaluate(() => innerWidth);
		expect(Math.abs((box.left + box.right) / 2 - vw / 2)).toBeLessThan(2);
	});

	test('box-sizing, media, hidden, and lists', async ({ page }) => {
		expect(await style(page, '#box', 'boxSizing')).toBe('border-box');
		expect(await style(page, '#img', 'display')).toBe('block');
		expect(await page.evaluate(() => document.getElementById('img').getBoundingClientRect().width)).toBeLessThanOrEqual(await page.evaluate(() => document.getElementById('figure').getBoundingClientRect().width));
		expect(await style(page, '#hidden', 'display')).toBe('none');
		expect(await style(page, '#plain', 'listStyleType')).toBe('disc');
		expect(await style(page, '#decorative', 'listStyleType')).toBe('none');
	});

	test('controls inherit the font and sup keeps line height', async ({ page }) => {
		const bodyFont = await style(page, 'body', 'fontFamily');
		expect(await style(page, '#input', 'fontFamily')).toBe(bodyFont);
		expect(await style(page, '#button', 'fontFamily')).toBe(bodyFont);
		expect(await style(page, '#sup', 'lineHeight')).toBe('0px');
		expect(await style(page, '#table', 'borderCollapse')).toBe('collapse');
	});

	test('has no accessibility violations', async ({ page }) => {
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	});
});
