import { test, expect } from 'playwright/test';
import { open, stage, style, token, px, rects, expectNoChildMargins, axe } from '../lib/layout.js';

const columns = async (page, selector) => (await style(page, selector, 'grid-template-columns')).trim().split(/\s+/).length;
const expected = (width, min, gap) => Math.floor((width + gap) / (min + gap));
const perRow = (rs) => { const tops = [...new Set(rs.map((r) => Math.round(r.top)))].sort((a, b) => a - b); return rs.filter((r) => Math.round(r.top) === tops[0]).length; };

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

	test('data-min="none" without data-columns gives a single column, not a runaway count', async ({ page }) => {
		await open(page, 'grid', 1000);
		expect(await columns(page, '#loose')).toBe(1);
	});

	test('role="list" keeps padding reset even inside a grid', async ({ page }) => {
		await open(page, 'grid');
		expect(await px(page, '#list-grid', 'padding-inline-start')).toBe(0);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'grid');
		await expectNoChildMargins(page, '.grid');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'grid');
		expect(await axe(page)).toEqual([]);
	});

	test('data-fold halves the count and never shows three', async ({ page }) => {
		await open(page, 'grid', 1100);
		expect(perRow(await rects(page, '#fold > *'))).toBe(4);
		await stage(page, 900);
		expect(perRow(await rects(page, '#fold > *'))).toBe(2);
		await stage(page, 700);
		expect(perRow(await rects(page, '#fold > *'))).toBe(2);
		await stage(page, 400);
		expect(perRow(await rects(page, '#fold > *'))).toBe(1);
	});

	test('the nested-columns twin gives the same counts', async ({ page }) => {
		await open(page, 'grid', 1100);
		expect(perRow(await rects(page, '#nest .columns .columns > *'))).toBe(4);
		expect(new Set((await rects(page, '#nest .columns .columns > *')).map((r) => Math.round(r.top))).size).toBe(1);
		await stage(page, 700);
		expect(new Set((await rects(page, '#nest .columns .columns > *')).map((r) => Math.round(r.top))).size).toBe(2);
		await stage(page, 300);
		expect(new Set((await rects(page, '#nest .columns .columns > *')).map((r) => Math.round(r.top))).size).toBe(4);
	});
});
