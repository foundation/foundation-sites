import { test, expect } from 'playwright/test';
import { stage, style, px, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/spinner.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const after = (page, id, prop) => page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i), '::after').getPropertyValue(p), [id, prop]);

test.describe('spinner', () => {
	test('a one-em ring that turns', async ({ page }) => {
		await open(page);
		const ring = await page.evaluate(() => {
			const spin = document.getElementById('spin');
			const lg = document.getElementById('lg');
			const running = spin.getAnimations().map((animation) => animation.playState);
			// The ring turns, and getBoundingClientRect measures the rotated box
			// (a square at 45 degrees measures sqrt(2) times its side), so hold
			// both rings at the start of their turn before reading.
			for (const el of [spin, lg]) for (const animation of el.getAnimations()) { animation.pause(); animation.currentTime = 0; }
			const r = spin.getBoundingClientRect();
			return { width: r.width, height: r.height, em: parseFloat(getComputedStyle(spin).fontSize), lg: lg.getBoundingClientRect().width, running };
		});
		expect(ring.width).toBeCloseTo(ring.em, 0);
		expect(ring.height).toBeCloseTo(ring.em, 0);
		expect(ring.running).toContain('running');
		expect(await style(page, '#spin', 'border-top-left-radius')).not.toBe('0px');
		expect(await style(page, '#spin', 'animation-name')).toBe('yeti-spin');
		expect(ring.lg).toBeGreaterThan(ring.width);
	});

	test('a busy button grows a ring after its label', async ({ page }) => {
		await open(page);
		expect(await after(page, 'busy', 'content')).toBe('""');
		expect(await after(page, 'busy', 'animation-name')).toBe('yeti-spin');
		expect(parseFloat(await after(page, 'busy', 'width'))).toBeCloseTo(await px(page, '#busy', 'font-size'), 0);
	});

	test('under reduced motion the ring stands still', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await open(page);
		expect(parseFloat(await style(page, '#spin', 'animation-duration'))).toBeLessThanOrEqual(0.01);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
