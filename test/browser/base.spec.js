import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

const px = (page, selector, prop) => page.evaluate(([s, p]) => parseFloat(getComputedStyle(document.querySelector(s))[p]), [selector, prop]);
const style = (page, selector, prop) => page.evaluate(([s, p]) => getComputedStyle(document.querySelector(s))[p], [selector, prop]);
const token = (page, name) => page.evaluate((n) => { const el = document.createElement('div'); el.style.width = `var(${n})`; document.body.append(el); const w = parseFloat(getComputedStyle(el).width); el.remove(); return w; }, name);

test.describe('base typography and prose', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 900 });
		const response = await page.goto('/test/browser/fixtures/base.html');
		expect(response.status()).toBe(200);
	});

	test('headings map to the scale and body reads the base', async ({ page }) => {
		const md = await token(page, '--yeti-text-md');
		expect(await px(page, 'body', 'fontSize')).toBeCloseTo(md, 1);
		expect(await px(page, '#h1', 'fontSize')).toBeCloseTo(await token(page, '--yeti-text-3xl'), 1);
		expect(await px(page, '#h2', 'fontSize')).toBeCloseTo(await token(page, '--yeti-text-2xl'), 1);
		expect(await style(page, '#h1', 'fontWeight')).toBe('700');
	});

	test('prose rhythm: default gap, heading hug, and heading lead-in', async ({ page }) => {
		expect(await px(page, '#second', 'marginTop')).toBeCloseTo(await token(page, '--yeti-space-md'), 1);
		expect(await px(page, '#lead', 'marginTop')).toBeCloseTo(await token(page, '--yeti-space-sm'), 1);
		expect(await px(page, '#h2', 'marginTop')).toBeCloseTo(await token(page, '--yeti-space-xl'), 1);
		expect(await px(page, '#after-h2', 'marginTop')).toBeCloseTo(await token(page, '--yeti-space-sm'), 1);
		expect(await px(page, '#li2', 'marginTop')).toBeCloseTo(await token(page, '--yeti-space-xs'), 1);
	});

	test('measure caps line length', async ({ page }) => {
		const width = await page.evaluate(() => document.getElementById('second').getBoundingClientRect().width);
		const measure = await page.evaluate(() => {
			const el = document.createElement('div');
			el.style.width = 'var(--yeti-measure)';
			document.getElementById('second').after(el);
			const w = el.getBoundingClientRect().width;
			el.remove();
			return w;
		});
		expect(width).toBeLessThanOrEqual(measure + 1);
		expect(width).toBeGreaterThan(measure * 0.9);
	});

	test('links are underlined and keyboard focus shows a ring', async ({ page }) => {
		expect(await style(page, '#link', 'textDecorationLine')).toContain('underline');
		await page.keyboard.press('Tab');
		const focused = await page.evaluate(() => document.activeElement.id);
		expect(['link', 'name']).toContain(focused);
		expect(await style(page, `#${focused}`, 'outlineStyle')).toBe('solid');
		expect(await px(page, `#${focused}`, 'outlineWidth')).toBe(2);
	});

	test('has no accessibility violations', async ({ page }) => {
		expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	});
});

test.describe('base controls and media', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 900 });
		await page.goto('/test/browser/fixtures/base.html');
	});

	test('text inputs fill the row and share the border token; buttons are raised', async ({ page }) => {
		const form = await page.evaluate(() => document.getElementById('form').getBoundingClientRect().width);
		expect(await page.evaluate(() => document.getElementById('name').getBoundingClientRect().width)).toBeCloseTo(form, 0);
		expect(await style(page, '#name', 'borderTopStyle')).toBe('solid');
		expect(await px(page, '#name', 'borderTopWidth')).toBe(1);
		expect(await style(page, '#name', 'borderTopColor')).toBe(await style(page, '#submit', 'borderTopColor'));
		expect(await style(page, '#submit', 'backgroundColor')).not.toBe(await style(page, '#name', 'backgroundColor'));
		expect(await style(page, '#disabled', 'opacity')).toBe('0.6');
		expect(await style(page, '#submit', 'cursor')).toBe('default');
	});

	test('tables have header emphasis, padding, and row rules', async ({ page }) => {
		expect(await style(page, '#th', 'fontWeight')).toBe('700');
		expect(await px(page, '#td', 'paddingTop')).toBeCloseTo(await token(page, '--yeti-space-sm'), 1);
		expect(await style(page, '#td', 'borderBottomStyle')).toBe('solid');
	});

	test('code uses the mono stack on a raised surface and pre scrolls', async ({ page }) => {
		expect(await style(page, '#code', 'fontFamily')).not.toBe(await style(page, 'body', 'fontFamily'));
		expect(await style(page, '#code', 'backgroundColor')).toBe(await style(page, '#pre', 'backgroundColor'));
		expect(await style(page, '#pre', 'overflowX')).toBe('auto');
		expect(await style(page, '#hr', 'borderTopStyle')).toBe('solid');
		expect(await px(page, '#quote', 'borderLeftWidth')).toBe(4);
		expect(await style(page, '#caption', 'color')).toBe(await style(page, 'caption', 'color'));
	});
});
