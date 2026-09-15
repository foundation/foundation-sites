import { test, expect } from 'playwright/test';
import { stage, rect, style, token, axe } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/progress.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('progress', () => {
	test('the bar is half the size step thick and rounded', async ({ page }) => {
		await open(page);
		expect((await rect(page, '#bar')).height).toBeCloseTo((await token(page, '--yeti-space-sm')) / 2, 0);
		expect((await rect(page, '#lg')).height).toBeCloseTo((await token(page, '--yeti-space-md')) / 2, 0);
		expect(await style(page, '#bar', 'border-top-left-radius')).not.toBe('0px');
	});

	test('the value is drawn in the variant colour', async ({ page, browserName }) => {
		await open(page);
		// Only Firefox exposes the progress value's own box to getComputedStyle:
		// Chromium reports the host element's background for
		// ::-webkit-progress-value, and WebKit reports nothing.
		test.skip(browserName !== 'firefox', 'the value is only readable through ::-moz-progress-bar');
		const [fill, primary] = await page.evaluate(() => {
			// Resolve the token on a probe, so the fill is checked against the
			// palette rather than against another reading of the same element.
			const probe = document.createElement('span');
			probe.style.color = 'var(--yeti-color-primary)';
			document.body.append(probe);
			const expected = getComputedStyle(probe).color;
			probe.remove();
			return [getComputedStyle(document.getElementById('bar'), '::-moz-progress-bar').backgroundColor, expected];
		});
		expect(fill).toBe(primary);
	});

	test('with no value the track is striped and moving', async ({ page }) => {
		await open(page);
		expect(await style(page, '#busy', 'background-image')).not.toBe('none');
		expect(await style(page, '#busy', 'animation-name')).toBe('yeti-progress');
		expect(await style(page, '#bar', 'background-image')).toBe('none');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
