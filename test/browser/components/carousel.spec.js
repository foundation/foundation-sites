import { test, expect } from 'playwright/test';
import { stage, rect, style, token, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/carousel.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const scrollLeft = (page, id) => page.evaluate((i) => document.getElementById(i).scrollLeft, id);

test.describe('carousel', () => {
	test('one slide fills the track and the track snaps', async ({ page }) => {
		await open(page);
		const [track, slide] = await Promise.all([rect(page, '#track'), rect(page, '#s1')]);
		expect(slide.width).toBeCloseTo(track.width, 0);
		expect(await style(page, '#track', 'scroll-snap-type')).toContain('mandatory');
		expect(await style(page, '#s1', 'scroll-snap-align')).toBe('start');
	});

	test('data-slides="2" halves each slide less the gap', async ({ page }) => {
		await open(page);
		const track = await rect(page, '#track-two');
		const gap = await token(page, '--yeti-space-md');
		expect((await rect(page, '#q1')).width).toBeCloseTo((track.width - gap) / 2, 0);
	});

	test('a dot scrolls to its slide', async ({ page }) => {
		await open(page);
		expect(await scrollLeft(page, 'track')).toBe(0);
		await page.click('#dot3');
		await expect.poll(() => scrollLeft(page, 'track')).toBeGreaterThan(0);
	});

	test('each dot is a named, pressable link', async ({ page }) => {
		await open(page);
		const size = await token(page, '--yeti-control-size');
		const dot = await rect(page, '#dot1');
		expect(dot.width).toBeCloseTo(size, 0);
		expect(dot.height).toBeCloseTo(size, 0);
		await expect(page.getByLabel('Slide 2')).toHaveAttribute('href', '#s2');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
