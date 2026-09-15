import { test, expect } from 'playwright/test';
import { stage, style, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/breadcrumbs.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const before = (page, id, prop) => page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i), '::before').getPropertyValue(p), [id, prop]);

test.describe('breadcrumbs', () => {
	test('every step after the first has a separator that is seen and not read', async ({ page }) => {
		await open(page);
		expect(await before(page, 'first', 'content')).toBe('none');
		const content = await before(page, 'second', 'content');
		expect(content).toContain('"/"');
		expect(content.replace(/\s/g, '')).toMatch(/\/""$/);
	});

	test('the current step is the text colour in a strong weight', async ({ page }) => {
		await open(page);
		expect(await style(page, '#last', 'color')).not.toBe(await style(page, '#second a', 'color'));
		expect(parseInt(await style(page, '#last', 'font-weight'), 10)).toBeGreaterThan(parseInt(await style(page, '#second a', 'font-weight'), 10));
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
