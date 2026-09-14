import { test, expect } from 'playwright/test';
import { stage, rect, token, expectNoChildMargins, same, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/recipes/media.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

// The figure selector, shared by media and hero:
// > :is(img, video, picture), > :has(> :is(img, video, picture))

test.describe('media recipe', () => {
	test('matches the composed form side by side', async ({ page }) => {
		await open(page, 1000);
		const [c, p, cf, pf, cb, pb] = await Promise.all([rect(page, '#classed'), rect(page, '#composed'), rect(page, '#c-figure'), rect(page, '#p-figure'), rect(page, '#c-body'), rect(page, '#p-body')]);
		same(cf, pf, c, p);
		same(cb, pb, c, p);
		// flex-grow: 1 against the body's 999 leaves the figure a fraction of a pixel over its basis
		// (same behavior as .sidebar's first child; see test/browser/layouts/sidebar.spec.js).
		expect(Math.abs(cf.width - await token(page, '--yeti-width-xs'))).toBeLessThan(2);
		expect(cf.width / cf.height).toBeCloseTo(1, 1);
	});

	test('matches the composed form stacked', async ({ page }) => {
		await open(page, 400);
		const [c, p, cf, pf, cb, pb] = await Promise.all([rect(page, '#classed'), rect(page, '#composed'), rect(page, '#c-figure'), rect(page, '#p-figure'), rect(page, '#c-body'), rect(page, '#p-body')]);
		same(cf, pf, c, p);
		same(cb, pb, c, p);
		expect(cb.top).toBeGreaterThanOrEqual(cf.bottom);
	});

	test('the figure is found wherever it sits, and data-side overrides the side', async ({ page }) => {
		await open(page, 1000);
		const [lb, lf] = await Promise.all([rect(page, '#l-body'), rect(page, '#l-figure')]);
		expect(lf.left).toBeGreaterThan(lb.right);
		expect(lf.width / lf.height).toBeCloseTo(16 / 9, 1);
		const [fb, ff] = await Promise.all([rect(page, '#f-body'), rect(page, '#f-figure')]);
		expect(ff.left).toBeGreaterThan(fb.right);
	});

	test('the fill reaches an img inside a picture inside a wrapped figure', async ({ page }) => {
		await open(page, 1000);
		const [figure, img] = await Promise.all([rect(page, '#w-figure'), rect(page, '#w-figure img')]);
		expect(img.width).toBeCloseTo(figure.width, 0);
		expect(img.height).toBeCloseTo(figure.height, 0);
	});

	test('a figure with a figcaption keeps its caption below the image, and the image keeps its ratio', async ({ page }) => {
		await open(page, 1000);
		const [image, caption] = await Promise.all([rect(page, '#cap-image'), rect(page, '#cap-caption')]);
		expect(caption.top).toBeGreaterThanOrEqual(image.bottom);
		expect(image.width / image.height).toBeCloseTo(1, 1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page);
		await expectNoChildMargins(page, '.media');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
