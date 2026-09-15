import { test, expect } from 'playwright/test';
import { stage, rect, style, px, axe } from '../lib/layout.js';
import { PAGE_HELPERS } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/accordion.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const isOpen = (page, id) => page.evaluate((i) => document.getElementById(i).open, id);
const after = (page, id, prop) => page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i), '::after').getPropertyValue(p), [id, prop]);
const content = (page, id, prop) => page.evaluate(([i, p]) => getComputedStyle(document.getElementById(i), '::details-content').getPropertyValue(p), [id, prop]);

test.describe('accordion', () => {
	test('a shut panel is hidden and an open one is shown', async ({ page }) => {
		await open(page);
		expect(await isOpen(page, 'd1')).toBe(false);
		expect(await isOpen(page, 'd2')).toBe(true);
		expect((await rect(page, '#p2')).height).toBeGreaterThan(0);
		expect(await page.locator('#p1').isVisible()).toBe(false);
	});

	test('the native marker is gone and the chevron turns when it opens', async ({ page }) => {
		await open(page);
		expect(await style(page, '#s1', 'list-style-type')).toBe('none');
		const shut = await after(page, 's1', 'rotate');
		const open2 = await after(page, 's2', 'rotate');
		expect(shut).not.toBe(open2);
		expect(await after(page, 's1', 'content')).not.toBe('none');
	});

	test('the shut row carries a collapsed grid row and the open one a full one', async ({ page }) => {
		await open(page);
		// The row is what the transition runs on, so it is the row that has to
		// differ between the two states; a panel that merely changed opacity
		// arrived at full height at once and read as a flash.
		expect(await style(page, '#d1', 'display')).toBe('grid');
		const [shut, opened] = await Promise.all([style(page, '#d1', 'grid-template-rows'), style(page, '#d2', 'grid-template-rows')]);
		expect(shut.split(' ').length).toBe(2);
		expect(parseFloat(shut.split(' ')[1])).toBe(0);
		expect(parseFloat(opened.split(' ')[1])).toBeGreaterThan(0);
		expect(await content(page, 'd1', 'overflow-y')).toBe('hidden');
		// Without this the rows would still differ, but the change would jump.
		expect(await style(page, '#d1', 'transition-property')).toBe('grid-template-rows');
		expect(parseFloat(await style(page, '#d1', 'transition-duration'))).toBeGreaterThan(0.01);
	});

	test('the panel grows open rather than appearing at full height', async ({ page }) => {
		await open(page);
		const height = () => page.evaluate(() => document.getElementById('d1').getBoundingClientRect().height);
		const shut = await height();
		await page.click('#s1');
		// Sampled while the transition runs: a jump would already be at its
		// final height on the first read.
		const midway = await height();
		await page.evaluate(() => Promise.all(document.getElementById('d1').getAnimations().map((a) => a.finished)));
		const opened = await height();
		expect(opened).toBeGreaterThan(shut);
		expect(midway).toBeGreaterThan(shut);
		expect(midway).toBeLessThan(opened);
	});

	test('under reduced motion the panel opens at once', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await open(page);
		expect(await style(page, '#d1', 'transition-property')).toBe('grid-template-rows');
		expect(parseFloat(await style(page, '#d1', 'transition-duration'))).toBeLessThanOrEqual(0.01);
	});

	// How far apart two backgrounds look, as a difference in CIE lightness.
	// A contrast ratio is the wrong instrument here: its +0.05 floor squashes
	// every pair of dark colours together, so two clearly different rows in dark
	// scored lower than two nearly identical ones in light. L* is perceptually
	// even, so one threshold means the same thing in both schemes.
	//
	// Merely being different is not enough either. The first attempt used
	// neighbouring steps of the surface ramp, three hundredths of an oklch
	// lightness apart in dark, and the rows vanished into the panel while still
	// passing a test that only asked whether two strings differed.
	const lightnessGap = (page, a, b) => page.evaluate((sels) => {
		const channel = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
		const lstar = (selector) => {
			const [r, g, b] = window.__yeti.rgb(getComputedStyle(document.querySelector(selector)).backgroundColor);
			const y = 0.2126 * channel(r / 255) + 0.7152 * channel(g / 255) + 0.0722 * channel(b / 255);
			return y <= 216 / 24389 ? (y * 24389) / 27 : Math.cbrt(y) * 116 - 16;
		};
		return Math.abs(lstar(sels[0]) - lstar(sels[1]));
	}, [a, b]);

	for (const scheme of ['light', 'dark']) {
		test(`a summary sits on its own surface, apart from the panel and from hover in ${scheme}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			await page.addInitScript(PAGE_HELPERS);
			await open(page);
			expect(await style(page, '#s2', 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
			// Around five points of L* is where a block of colour stops reading as
			// the same shade as its neighbour. The ramp this replaced managed three
			// in dark, which is why the rows were hard to pick out.
			expect(await lightnessGap(page, '#s2', '#solo')).toBeGreaterThan(5);
			await page.hover('#s2');
			expect(await lightnessGap(page, '#s2', '#solo')).toBeGreaterThan(10);
		});
	}

	test('an open summary is ruled off from its panel and a shut one is not', async ({ page }) => {
		await open(page);
		expect(await px(page, '#s1', 'border-block-end-width')).toBe(0);
		expect(await px(page, '#s2', 'border-block-end-width')).toBeGreaterThan(0);
		expect(await style(page, '#s2', 'border-block-end-color')).toBe(await style(page, '#solo', 'border-block-start-color'));
	});

	test('Enter on a summary opens its panel', async ({ page }) => {
		await open(page);
		await page.focus('#s1');
		await page.keyboard.press('Enter');
		expect(await isOpen(page, 'd1')).toBe(true);
	});

	test('two details sharing a name close one another', async ({ page }) => {
		await open(page);
		await page.click('#es1');
		expect(await isOpen(page, 'e1')).toBe(true);
		await page.click('#es2');
		expect(await isOpen(page, 'e2')).toBe(true);
		expect(await isOpen(page, 'e1')).toBe(false);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
