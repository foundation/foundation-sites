import { test, expect } from 'playwright/test';
import { open, stage, style, token, expectNoChildMargins, axe } from '../lib/layout.js';

const columns = async (page, selector) => (await style(page, selector, 'grid-template-columns')).trim().split(/\s+/).length;
const expected = (width, min, gap) => Math.floor((width + gap) / (min + gap));

test.describe('grid', () => {
	test('fits as many columns as the minimum allows', async ({ page }) => {
		await open(page, 'grid', 1000);
		const [min, gap] = await Promise.all([token(page, '--yeti-width-xs'), token(page, '--yeti-space-md')]);
		expect(await columns(page, '#grid')).toBe(expected(1000, min, gap));
		await stage(page, 500);
		expect(await columns(page, '#grid')).toBe(expected(500, min, gap));
	});

	test('data-columns caps the count and still shrinks below it', async ({ page }) => {
		await open(page, 'grid', 1000);
		expect(await columns(page, '#capped')).toBe(3);
		await stage(page, 300);
		expect(await columns(page, '#capped')).toBe(1);
	});

	test('data-min="none" with data-columns gives an exact count', async ({ page }) => {
		await open(page, 'grid', 300);
		expect(await columns(page, '#exact')).toBe(3);
		await stage(page, 1000);
		expect(await columns(page, '#exact')).toBe(3);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'grid');
		await expectNoChildMargins(page, '.grid');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'grid');
		expect(await axe(page)).toEqual([]);
	});
});
