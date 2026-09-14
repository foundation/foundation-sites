import { test, expect } from 'playwright/test';
import { open, stage, rect, rects, token, expectNoChildMargins, axe } from '../lib/layout.js';

const pseudo = (page, selector, which) => page.evaluate(([s, w]) => {
	const el = document.querySelector(s);
	const cs = getComputedStyle(el, w);
	const r = el.getBoundingClientRect();
	return { content: cs.content, width: parseFloat(cs.width), left: r.left + parseFloat(cs.left), right: r.right - parseFloat(cs.right) };
}, [selector, which]);

test.describe('timeline', () => {
	test('has a rail down the start edge with a marker per entry on it', async ({ page }) => {
		await open(page, 'timeline', 1000);
		const rail = await pseudo(page, '#single', '::before');
		expect(rail.content).not.toBe('none');
		const list = await rect(page, '#single');
		const railX = list.left + parseFloat(await page.evaluate(() => getComputedStyle(document.getElementById('single'), '::before').left)) + 1;
		for (const id of ['s1', 's2', 's3']) {
			const m = await pseudo(page, `#${id}`, '::before');
			expect(m.content).not.toBe('none');
			const li = await rect(page, `#${id}`);
			expect(li.left + parseFloat(await page.evaluate((i) => getComputedStyle(document.getElementById(i), '::before').left, id)) + 8).toBeCloseTo(railX, 0);
		}
		const [s1, s2] = await Promise.all([rect(page, '#s1'), rect(page, '#s2')]);
		expect(s2.top - s1.bottom).toBeCloseTo(await token(page, '--yeti-space-lg'), 0);
	});

	test('data-alternate puts entries on either side of a centred rail when wide, one side when narrow', async ({ page }) => {
		await open(page, 'timeline', 1000);
		const list = await rect(page, '#alt');
		const [a1, a2, a3] = await Promise.all([rect(page, '#a1'), rect(page, '#a2'), rect(page, '#a3')]);
		expect(a1.left).toBeCloseTo(list.left, 1);
		expect(a1.right).toBeLessThan((list.left + list.right) / 2);
		expect(a2.right).toBeCloseTo(list.right, 1);
		expect(a2.left).toBeGreaterThan((list.left + list.right) / 2);
		expect(a3.left).toBeCloseTo(list.left, 1);
		await stage(page, 500);
		const narrow = await rects(page, '#alt > li');
		expect(new Set(narrow.map((r) => Math.round(r.left))).size).toBe(1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'timeline');
		await expectNoChildMargins(page, '.timeline');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'timeline');
		expect(await axe(page)).toEqual([]);
	});
});
