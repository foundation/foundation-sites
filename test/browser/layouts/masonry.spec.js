import { test, expect } from 'playwright/test';
import { open, stage, rects, style, token, axe } from '../lib/layout.js';

const columns = async (page, selector) => new Set((await rects(page, `${selector} > *`)).map((r) => Math.round(r.left))).size;
const expected = (width, min, gap) => Math.floor((width + gap) / (min + gap));
const native = (page) => page.evaluate(() => CSS.supports('grid-template-rows', 'masonry'));

test.describe('masonry', () => {
	test('fits as many columns as the minimum allows', async ({ page }) => {
		await open(page, 'masonry', 1000);
		const [min, gap] = await Promise.all([token(page, '--yeti-width-xs'), token(page, '--yeti-space-md')]);
		expect(await columns(page, '#masonry')).toBe(expected(1000, min, gap));
		await stage(page, 500);
		expect(await columns(page, '#masonry')).toBe(expected(500, min, gap));
	});

	test('data-columns caps the count', async ({ page }) => {
		await open(page, 'masonry', 1000);
		expect(await columns(page, '#capped')).toBe(2);
	});

	test('packs items under each other with the gap between', async ({ page }) => {
		await open(page, 'masonry', 1000);
		const gap = await token(page, '--yeti-space-md');
		const items = await rects(page, '#masonry > *');
		const firstColumn = items.filter((r) => Math.round(r.left) === Math.round(items[0].left)).sort((a, b) => a.top - b.top);
		expect(firstColumn.length).toBeGreaterThan(1);
		expect(firstColumn[1].top - firstColumn[0].bottom).toBeCloseTo(gap, 0);
	});

	test('uses the native path where it exists and the column path elsewhere', async ({ page }) => {
		await open(page, 'masonry', 1000);
		if (await native(page)) {
			expect(await style(page, '#masonry', 'display')).toBe('grid');
			expect(await style(page, '#masonry > :first-child', 'margin-bottom')).toBe('0px');
		} else {
			expect(await style(page, '#masonry', 'display')).toBe('block');
			expect(parseFloat(await style(page, '#masonry', 'column-width'))).toBeCloseTo(await token(page, '--yeti-width-xs'), 0);
		}
	});

	test('children have no inline margins', async ({ page }) => {
		await open(page, 'masonry');
		const margins = await page.evaluate(() => [...document.querySelectorAll('.masonry > *')].map((el) => { const cs = getComputedStyle(el); return `${cs.marginLeft} ${cs.marginRight} ${cs.marginTop}`; }));
		for (const m of margins) expect(m).toBe('0px 0px 0px');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'masonry');
		expect(await axe(page)).toEqual([]);
	});
});
