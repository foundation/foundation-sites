import { test, expect } from 'playwright/test';
import { stage, rect, style, axe, withoutModule } from '../lib/layout.js';

const open = async (page, width = 1000) => {
	const response = await page.goto('/test/browser/fixtures/components/dialog.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};
const isOpen = (page) => page.evaluate(() => document.getElementById('confirm').open);
const isModal = (page) => page.evaluate(() => document.getElementById('confirm').matches(':modal'));
// The dialog arrives with a fade and a rise, so wait for that to finish
// before reading colour: a scan mid-transition sees a translucent box.
const settle = (page, selector) => page.evaluate((s) => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	.then(() => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished))), selector);

test.describe('dialog', () => {
	test('data-open opens it modally and Escape closes it', async ({ page }) => {
		await open(page);
		expect(await isOpen(page)).toBe(false);
		await page.click('#opener');
		expect(await isOpen(page)).toBe(true);
		expect(await isModal(page)).toBe(true);
		await page.keyboard.press('Escape');
		expect(await isOpen(page)).toBe(false);
	});

	test('a click on the backdrop closes it, and one inside does not', async ({ page }) => {
		await open(page);
		await page.click('#opener');
		await page.click('#confirm-title');
		expect(await isOpen(page)).toBe(true);
		await page.mouse.click(5, 5);
		expect(await isOpen(page)).toBe(false);
	});

	test('a form button closes it and focus returns to the opener', async ({ page }) => {
		await open(page);
		await page.click('#opener');
		await page.click('#cancel');
		expect(await isOpen(page)).toBe(false);
		expect(await page.evaluate(() => document.activeElement.id)).toBe('opener');
	});

	test('the backdrop is painted', async ({ page }) => {
		await open(page);
		await page.click('#opener');
		await settle(page, '#confirm');
		const backdrop = await page.evaluate(() => getComputedStyle(document.getElementById('confirm'), '::backdrop').backgroundColor);
		expect(backdrop).not.toBe('rgba(0, 0, 0, 0)');
	});

	test('the contents are spaced and the footer buttons share a line', async ({ page }) => {
		await open(page);
		await page.click('#opener');
		await settle(page, '#confirm');
		const [title, body, cancel, go] = await Promise.all([rect(page, '#confirm-title'), rect(page, '#confirm p'), rect(page, '#cancel'), rect(page, '#confirm-go')]);
		expect(body.top).toBeGreaterThan(title.bottom);
		expect(Math.abs(cancel.top - go.top)).toBeLessThan(2);
	});

	test('the page behind a modal is inert', async ({ page }) => {
		await open(page);
		await page.click('#opener');
		await settle(page, '#confirm');
		await page.evaluate(() => document.getElementById('after').focus());
		expect(await page.evaluate(() => document.activeElement.id)).not.toBe('after');
	});

	test('without the module the opener does nothing', async ({ page }) => {
		await withoutModule(page, 'dialog');
		await open(page);
		await page.click('#opener');
		await page.waitForTimeout(200);
		expect(await isOpen(page)).toBe(false);
	});

	test('has no accessibility violations, shut and open', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
		await page.click('#opener');
		await settle(page, '#confirm');
		expect(await axe(page)).toEqual([]);
	});

	// Only discriminates in WebKit: Chromium and Firefox restore dialog focus
	// natively, which masks the bug this guards against.
	test('a dialog opened from inside another returns focus to its own trigger', async ({ page }) => {
		await open(page);
		await page.click('#opener');
		await settle(page, '#confirm');
		await page.click('#nested-open');
		await settle(page, '#nested');
		expect(await page.evaluate(() => document.getElementById('nested').open)).toBe(true);
		await page.click('#nested-cancel');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('nested-open');
		expect(await isOpen(page)).toBe(true);
		await page.keyboard.press('Escape');
		expect(await page.evaluate(() => document.activeElement.id)).toBe('opener');
	});
});
