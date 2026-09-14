import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/card.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('card', () => {
	test('the figure bleeds to the edges and crops to the ratio', async ({ page }) => {
		await open(page);
		const [card, img] = await Promise.all([rect(page, '#short'), rect(page, '#img')]);
		const border = await token(page, '--yeti-border-width');
		expect(img.left).toBeCloseTo(card.left + border, 0);
		expect(img.right).toBeCloseTo(card.right - border, 0);
		expect(img.top).toBeCloseTo(card.top + border, 0);
		expect(img.width / img.height).toBeCloseTo(16 / 9, 1);
	});

	test('the footer sits at the bottom of a card stretched in a row', async ({ page }) => {
		await open(page);
		const [short, tall, sf, tf] = await Promise.all([rect(page, '#short'), rect(page, '#tall'), rect(page, '#short-footer'), rect(page, '#tall-footer')]);
		expect(short.height).toBeCloseTo(tall.height, 0);
		expect(sf.bottom).toBeCloseTo(tf.bottom, 0);
	});

	test('below 24rem of its own width a card with a picture becomes a thumbnail row', async ({ page }) => {
		await open(page);
		const [card, img, title] = await Promise.all([rect(page, '#thumb'), rect(page, '#thumb-img'), rect(page, '#thumb-title')]);
		expect(title.left).toBeGreaterThan(img.right);
		expect(img.width).toBeCloseTo(card.width * 0.4, -1);
		expect(img.height).toBeCloseTo(card.height, 0);
	});

	test('raised, tinted, and captioned variants', async ({ page }) => {
		await open(page);
		expect(await style(page, '#raised', 'box-shadow')).not.toBe('none');
		expect(await style(page, '#raised', 'border-top-color')).toBe('rgba(0, 0, 0, 0)');
		const border = await token(page, '--yeti-border-width');
		expect(await px(page, '#tinted', 'border-top-width')).toBeCloseTo(border * 4, 1);
		expect(await px(page, '#tinted', 'border-left-width')).toBeCloseTo(border, 1);
		const [cap, img, card] = await Promise.all([rect(page, '#caption'), rect(page, '#cap-img'), rect(page, '#captioned')]);
		expect(cap.top).toBeGreaterThanOrEqual(img.bottom);
		expect(img.width).toBeCloseTo(card.width - 2 * border, 0);
	});

	test('data-stretch makes the whole card the link', async ({ page }) => {
		await open(page);
		const card = await rect(page, '#short');
		await page.mouse.click(card.right - 10, card.bottom - 10);
		expect(await page.evaluate(() => location.hash)).toBe('#hills');
	});

	for (const scheme of ['light', 'dark']) {
		test(`text meets AA in ${scheme}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			await open(page);
			for (const sel of await page.evaluate(() => [...document.querySelectorAll('[data-contrast]')].map((el, i) => { el.dataset.contrastId = String(i); return `[data-contrast-id="${i}"]`; }))) {
				await expectAA(page, sel, { large: await page.evaluate((s) => document.querySelector(s).dataset.contrast === 'large', sel), label: `${sel} ${scheme}` });
			}
		});
	}

	test('has no accessibility violations', async ({ page }) => {
		await open(page);
		expect(await axe(page)).toEqual([]);
	});
});
