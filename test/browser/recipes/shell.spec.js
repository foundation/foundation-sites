import { test, expect } from 'playwright/test';
import { stage, rect, token, expectNoChildMargins, same, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/recipes/shell.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('shell recipe', () => {
	test('matches the composed form with the footer at the bottom of the viewport', async ({ page }) => {
		await open(page, 1000);
		const [c, p] = await Promise.all([rect(page, '#classed'), rect(page, '#composed')]);
		const height = await page.evaluate(() => window.innerHeight);
		expect(c.height).toBeCloseTo(height, 0);
		expect(p.height).toBeCloseTo(height, 0);
		for (const part of ['header', 'nav', 'main', 'footer']) {
			const [a, b] = await Promise.all([rect(page, `#c-${part}`), rect(page, `#p-${part}`)]);
			same(a, b, c, p);
		}
		const [footer, nav, main] = await Promise.all([rect(page, '#c-footer'), rect(page, '#c-nav'), rect(page, '#c-main')]);
		expect(footer.bottom).toBeCloseTo(c.bottom, 1);
		expect(nav.top).toBeCloseTo(main.top, 1);
		// flex-grow: 1 against main's 999 leaves nav a fraction of a pixel over its basis (see sidebar.spec.js).
		expect(Math.abs(nav.width - await token(page, '--yeti-width-sm'))).toBeLessThan(2);
	});

	test('matches the composed form stacked', async ({ page }) => {
		await open(page, 400);
		const [c, p] = await Promise.all([rect(page, '#classed'), rect(page, '#composed')]);
		for (const part of ['header', 'nav', 'main', 'footer']) {
			const [a, b] = await Promise.all([rect(page, `#c-${part}`), rect(page, `#p-${part}`)]);
			same(a, b, c, p);
		}
		const [nav, main] = await Promise.all([rect(page, '#c-nav'), rect(page, '#c-main')]);
		expect(main.top).toBeGreaterThanOrEqual(nav.bottom);
	});

	test('three regions share the row, nav first and aside last, and stack when narrow', async ({ page }) => {
		// 1200, not 1000: with two data-width="xs" (256px) flanks plus the
		// md gap (18px) on both sides of main, main's own 50%-of-container
		// floor needs a container of at least 4*(256+18) = 1096px before all
		// three fit on one line (below that, main's floor alone forces a
		// wrap no matter how the flanks are sized down to 0). 1000px is
		// under that threshold, so it wraps even though it isn't "narrow"
		// by the recipe's own standard; 1200 comfortably clears it.
		await open(page, 1200);
		const xs = await token(page, '--yeti-width-xs');
		const [nav, main, aside] = await Promise.all([rect(page, '#t-nav'), rect(page, '#t-main'), rect(page, '#t-aside')]);
		expect(nav.top).toBeCloseTo(main.top, 1);
		expect(aside.top).toBeCloseTo(main.top, 1);
		expect(nav.right).toBeLessThanOrEqual(main.left);
		expect(main.right).toBeLessThanOrEqual(aside.left);
		expect(Math.abs(nav.width - xs)).toBeLessThan(2);
		expect(Math.abs(aside.width - xs)).toBeLessThan(2);
		await stage(page, 400);
		const [n2, m2, a2] = await Promise.all([rect(page, '#t-nav'), rect(page, '#t-main'), rect(page, '#t-aside')]);
		expect(m2.top).toBeGreaterThanOrEqual(n2.bottom);
		expect(a2.top).toBeGreaterThanOrEqual(m2.bottom);
	});

	test('a body-row div only applies to a div holding nav, main, or aside', async ({ page }) => {
		await open(page, 1000);
		const [shell, pcA, pcB] = await Promise.all([rect(page, '#plain'), rect(page, '#pc-a'), rect(page, '#pc-b')]);
		const height = await page.evaluate(() => window.innerHeight);
		expect(pcB.top).toBeGreaterThanOrEqual(pcA.bottom);
		expect(shell.height).toBeCloseTo(height, 0);
	});

	test('children have no margins', async ({ page }) => {
		await open(page);
		await expectNoChildMargins(page, '.shell');
		await expectNoChildMargins(page, '.shell > div:has(> :is(nav, main, aside))');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		// Stacking several full shells (each with its own header/footer/main) in one
		// document to measure them side by side creates landmark duplicates and,
		// for #plain's bare div.center, content outside any landmark; those are
		// artifacts of the fixture, not the recipe, so both are removed here and
		// measured on their own above instead.
		await page.evaluate(() => { document.getElementById('three').remove(); document.getElementById('plain').remove(); });
		expect(await axe(page)).toEqual([]);
	});
});
