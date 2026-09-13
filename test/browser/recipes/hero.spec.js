import { test, expect } from 'playwright/test';
import { stage, rect, rects, token, expectNoChildMargins, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/recipes/hero.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
/** Two boxes match in size and in position relative to their own container. */
const same = (a, b, aBox, bBox) => {
	expect(a.width).toBeCloseTo(b.width, 0);
	expect(a.height).toBeCloseTo(b.height, 0);
	expect(a.left - aBox.left).toBeCloseTo(b.left - bBox.left, 0);
	expect(a.top - aBox.top).toBeCloseTo(b.top - bBox.top, 0);
};

// The figure selector, shared by media and hero:
// > :is(img, video, picture), > :has(> :is(img, video, picture))

test.describe('hero recipe', () => {
	test('matches the composed form side by side and centers the row in the band', async ({ page }) => {
		await open(page, 1000);
		const [c, p, cc, pc, cf, pf] = await Promise.all([rect(page, '#classed'), rect(page, '#composed'), rect(page, '#c-copy'), rect(page, '#p-copy'), rect(page, '#c-figure'), rect(page, '#p-figure')]);
		same(cc, pc, c, p);
		same(cf, pf, c, p);
		expect(c.height).toBeCloseTo(await page.evaluate(() => window.innerHeight), 0);
		const rowTop = Math.min(cc.top, cf.top);
		const rowBottom = Math.max(cc.bottom, cf.bottom);
		expect((rowTop + rowBottom) / 2).toBeCloseTo((c.top + c.bottom) / 2, 0);
		expect(cf.width / cf.height).toBeCloseTo(4 / 3, 1);
	});

	test('matches the composed form stacked', async ({ page }) => {
		await open(page, 400);
		const [c, p, cc, pc, cf, pf] = await Promise.all([rect(page, '#classed'), rect(page, '#composed'), rect(page, '#c-copy'), rect(page, '#p-copy'), rect(page, '#c-figure'), rect(page, '#p-figure')]);
		same(cc, pc, c, p);
		same(cf, pf, c, p);
		expect(cf.top).toBeGreaterThanOrEqual(cc.bottom);
	});

	test('data-side="start" moves a last-in-source figure to the start', async ({ page }) => {
		await open(page, 1000);
		const [copy, figure, band] = await Promise.all([rect(page, '#f-copy'), rect(page, '#f-figure'), rect(page, '#forced')]);
		expect(figure.right).toBeLessThan(copy.left);
		expect(band.height).toBeCloseTo(400, 0);
	});

	test('children have no margins', async ({ page }) => {
		await open(page);
		await expectNoChildMargins(page, '.hero');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
