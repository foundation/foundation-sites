import { test, expect } from 'playwright/test';
import { stage, rect, style, px, token, axe, withoutModule } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/alert.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('alert', () => {
	test('medium tints, high fills, low keeps the border alone', async ({ page }) => {
		await open(page);
		const [medium, high, low] = await Promise.all(['#medium', '#high', '#low'].map((s) => style(page, s, 'background-color')));
		expect(medium).not.toBe('rgba(0, 0, 0, 0)');
		expect(high).not.toBe(medium);
		expect(low).toBe('rgba(0, 0, 0, 0)');
		const border = await token(page, '--yeti-border-width');
		expect(await px(page, '#medium', 'border-inline-start-width')).toBeCloseTo(border * 4, 0);
		expect(await px(page, '#medium', 'border-inline-end-width')).toBeCloseTo(border, 0);
	});

	test('the icon is sized to the text and takes the hue', async ({ page }) => {
		await open(page);
		const icon = await rect(page, '#icon');
		expect(icon.width).toBeCloseTo(1.25 * (await px(page, '#medium', 'font-size')), 0);
		expect(await style(page, '#icon', 'color')).not.toBe(await style(page, '#medium', 'color'));
	});

	test('the close button does not make the alert taller than its text', async ({ page }) => {
		await open(page);
		const [closable, plain] = await Promise.all([rect(page, '#closable'), rect(page, '#success')]);
		expect(closable.height).toBeCloseTo(plain.height, 0);
	});

	test('with the module, the close button removes the alert', async ({ page }) => {
		await open(page);
		await page.click('#dismiss');
		await expect(page.locator('#closable')).toHaveCount(0);
	});

	test('without the module, the close button does nothing', async ({ page }) => {
		await withoutModule(page, 'alert');
		await open(page);
		await page.click('#dismiss');
		await page.waitForTimeout(300);
		await expect(page.locator('#closable')).toHaveCount(1);
		await expect(page.locator('#closable')).toBeVisible();
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
