import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { contrast, luminance, PAGE_HELPERS } from './lib/color.js';

const pair = (page, selector) => page.evaluate((s) => [window.__yeti.bg(s), window.__yeti.fg(s)], selector);
const ratio = async (page, selector) => contrast(...(await pair(page, selector)));

for (const scheme of ['light', 'dark']) {
	test.describe(`color tokens in ${scheme}`, () => {
		test.beforeEach(async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			await page.addInitScript(PAGE_HELPERS);
			const response = await page.goto('/test/browser/fixtures/color.html');
			expect(response.status()).toBe(200);
		});

		test('surface and text sit at the right ends and contrast at 7:1', async ({ page }) => {
			const [bg, fg] = await pair(page, '#page');
			expect(luminance(bg) > luminance(fg)).toBe(scheme === 'light');
			expect(await ratio(page, '#page')).toBeGreaterThanOrEqual(7);
			expect(await ratio(page, '#muted')).toBeGreaterThanOrEqual(4.5);
		});

		test('text on every base color reaches 4.5:1', async ({ page }) => {
			for (const id of ['primary', 'secondary', 'success', 'warning', 'alert']) {
				expect(await ratio(page, `#${id}`), id).toBeGreaterThanOrEqual(4.5);
			}
		});

		test('hued text on the surface reaches 4.5:1 and subtle backgrounds keep body text readable', async ({ page }) => {
			expect(await ratio(page, '#primary-text')).toBeGreaterThanOrEqual(4.5);
			expect(await ratio(page, '#subtle')).toBeGreaterThanOrEqual(7);
		});

		test('an ancestor can force light', async ({ page }) => {
			const [bg] = await pair(page, '#forced');
			expect(luminance(bg)).toBeGreaterThan(0.8);
		});

		test('has no accessibility violations', async ({ page }) => {
			expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
		});
	});

	test(`hue sweep holds contrast in ${scheme}`, async ({ page }) => {
		await page.emulateMedia({ colorScheme: scheme });
		await page.addInitScript(PAGE_HELPERS);
		await page.goto('/test/browser/fixtures/hues.html');
		for (let hue = 0; hue < 360; hue += 30) {
			await page.evaluate((h) => document.documentElement.style.setProperty('--yeti-hue-primary', String(h)), hue);
			expect(await ratio(page, '#primary'), `on-primary at hue ${hue}`).toBeGreaterThanOrEqual(4.5);
			expect(await ratio(page, '#primary-text'), `primary-text at hue ${hue}`).toBeGreaterThanOrEqual(4.5);
			expect(await ratio(page, '#page'), `surface at hue ${hue}`).toBeGreaterThanOrEqual(7);
		}
	});
}
