import { test, expect } from 'playwright/test';
import { stage, rect, style, axe, painted } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/tooltip.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
	await painted(page);
};
const settle = (page, selector) => page.evaluate((s) => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	.then(() => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished))), selector);
/** The id of whatever is painted at a point. The caret is a pseudo-element, so hitting it reports the bubble. */
const at = (page, x, y) => page.evaluate(([px, py]) => document.elementFromPoint(px, py)?.id ?? null, [x, y]);
const anchored = (page) => page.evaluate(() => CSS.supports('anchor-name: --a') && CSS.supports('position-area', 'block-start'));
const centre = (box) => box.left + box.width / 2;
const middle = (box) => box.top + box.height / 2;

test.describe('tooltip', () => {
	test('hidden at rest and shown on hover', async ({ page }) => {
		await open(page);
		expect(await style(page, '#top-tip', 'visibility')).toBe('hidden');
		await page.hover('#top-trigger');
		await settle(page, '#top-tip');
		expect(await style(page, '#top-tip', 'visibility')).toBe('visible');
		expect(parseFloat(await style(page, '#top-tip', 'opacity'))).toBeCloseTo(1, 1);
	});

	test('shown on keyboard focus too', async ({ page }) => {
		await open(page);
		await page.focus('#top-trigger');
		await settle(page, '#top-tip');
		expect(await style(page, '#top-tip', 'visibility')).toBe('visible');
	});

	test('sits above its trigger by default and beside it when asked', async ({ page }) => {
		await open(page);
		await page.hover('#top-trigger');
		await settle(page, '#top-tip');
		const [trigger, tip] = await Promise.all([rect(page, '#top-trigger'), rect(page, '#top-tip')]);
		expect(tip.bottom).toBeLessThanOrEqual(trigger.top + 1);
		await page.hover('#end-trigger');
		await settle(page, '#end-tip');
		const [endTrigger, endTip] = await Promise.all([rect(page, '#end-trigger'), rect(page, '#end-tip')]);
		expect(endTip.left).toBeGreaterThanOrEqual(endTrigger.right - 1);
	});

	test('a caret bridges the gap and points at the trigger', async ({ page }) => {
		await open(page);
		// The first of five tooltips on the page: an unscoped anchor name would hang this caret off the last trigger.
		await page.hover('#top-trigger');
		await settle(page, '#top-tip');
		const [trigger, tip] = await Promise.all([rect(page, '#top-trigger'), rect(page, '#top-tip')]);
		const gap = (tip.bottom + trigger.top) / 2;
		expect(await at(page, centre(trigger), gap)).toBe('top-tip');
		expect(await at(page, centre(trigger) + 30, gap)).not.toBe('top-tip');
	});

	test('every placement puts the caret on the side facing the trigger', async ({ page }) => {
		await open(page);
		test.skip(!await anchored(page), 'without anchor positioning every bubble sits above its trigger');
		for (const name of ['bottom', 'start', 'end']) {
			await page.hover(`#${name}-trigger`);
			await settle(page, `#${name}-tip`);
			const [trigger, tip] = await Promise.all([rect(page, `#${name}-trigger`), rect(page, `#${name}-tip`)]);
			const point = {
				bottom: [centre(trigger), (trigger.bottom + tip.top) / 2],
				start: [(tip.right + trigger.left) / 2, middle(trigger)],
				end: [(tip.left + trigger.right) / 2, middle(trigger)],
			}[name];
			expect(await at(page, ...point)).toBe(`${name}-tip`);
		}
	});

	test('the caret stays on the trigger when the bubble slides off an edge', async ({ page }) => {
		await page.setViewportSize({ width: 600, height: 720 });
		await open(page, 560);
		test.skip(!await anchored(page), 'without anchor positioning the bubble overflows the edge rather than sliding');
		await page.hover('#edge-trigger');
		await settle(page, '#edge-tip');
		const [trigger, tip] = await Promise.all([rect(page, '#edge-trigger'), rect(page, '#edge-tip')]);
		expect(Math.abs(centre(tip) - centre(trigger))).toBeGreaterThan(20);
		const gap = (tip.bottom + trigger.top) / 2;
		expect(await at(page, centre(trigger), gap)).toBe('edge-tip');
		expect(await at(page, centre(tip), gap)).not.toBe('edge-tip');
	});

	test('the caret overlaps the bubble, so no seam shows between them', async ({ page }) => {
		await open(page);
		test.skip(!(await anchored(page)), 'the fallback hangs the caret off the bubble, where there is no seam to close');
		// Caret and bubble are separately positioned boxes meeting on a fractional
		// edge, because the space token is fluid. Abutting exactly leaves a
		// hairline of page showing through at most zoom levels, so the caret has to
		// reach past the bubble's edge rather than stop at it.
		for (const [trigger, tip, axis] of [['#top-trigger', '#top-tip', 'block'], ['#bottom-trigger', '#bottom-tip', 'block'], ['#start-trigger', '#start-tip', 'inline'], ['#end-trigger', '#end-tip', 'inline']]) {
			await page.hover(trigger);
			await settle(page, tip);
			const measured = await page.evaluate(([t, p, ax]) => {
				const trig = document.querySelector(t).getBoundingClientRect();
				const bubble = document.querySelector(p).getBoundingClientRect();
				const caret = getComputedStyle(document.querySelector(p), '::after');
				const gap = ax === 'block'
					? Math.max(trig.top - bubble.bottom, bubble.top - trig.bottom)
					: Math.max(trig.left - bubble.right, bubble.left - trig.right);
				return { gap, depth: parseFloat(ax === 'block' ? caret.blockSize : caret.inlineSize) };
			}, [trigger, tip, axis]);
			expect(measured.gap, `${trigger} gap`).toBeGreaterThan(0);
			expect(measured.depth, `${trigger} caret depth`).toBeGreaterThan(measured.gap);
			await page.mouse.move(2, 2);
		}
	});

	test('a scrolling ancestor does not clip it where anchor positioning exists', async ({ page }) => {
		await open(page);
		test.skip(!await anchored(page), 'without anchor positioning the bubble is absolutely positioned and can be clipped');
		await page.hover('#clipped-trigger');
		await settle(page, '#clipped-tip');
		expect(await style(page, '#clipped-tip', 'position')).toBe('fixed');
		expect((await rect(page, '#clipped-tip')).width).toBeGreaterThan(0);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
