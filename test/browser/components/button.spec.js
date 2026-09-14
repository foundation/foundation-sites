import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/button.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

// button.css transitions background-color/border-color/color (its :hover and
// :is(:hover) rules). A CSS transition's "before" value is still current on
// the very next read after the triggering event, however short its duration
// (the interpolation is only sampled on a later frame, and two animation
// frames end before the transition itself does), so reading a color
// immediately after page.hover() can catch mid-transition (or pre-transition)
// values. Wait on the element's own running animations instead, as
// field.spec.js does; Promise.all([]) resolves at once when there is nothing
// to wait for.
const settle = (page, selector) => page.evaluate((s) => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished)), selector);

test.describe('button', () => {
	test('every button meets the control height and scales with data-size', async ({ page }) => {
		await open(page);
		const size = await token(page, '--yeti-control-size');
		for (const r of await rects(page, '.button')) expect(r.height).toBeGreaterThanOrEqual(size - 0.5);
		const [sm, md, lg] = await Promise.all([rect(page, '#sm'), rect(page, '#md'), rect(page, '#lg')]);
		expect(await px(page, '#sm', 'font-size')).toBeLessThan(await px(page, '#md', 'font-size'));
		expect(await px(page, '#lg', 'font-size')).toBeGreaterThan(await px(page, '#md', 'font-size'));
		expect(sm.width).toBeLessThan(md.width);
		expect(lg.width).toBeGreaterThan(md.width);
	});

	test('emphasis changes the fill and hover steps along the ladder', async ({ page }) => {
		await open(page);
		expect(await style(page, '#medium', 'background-color')).toBe('rgba(0, 0, 0, 0)');
		expect(await style(page, '#low', 'border-top-color')).toBe('rgba(0, 0, 0, 0)');
		const rest = await style(page, '#primary', 'background-color');
		await page.hover('#primary');
		await settle(page, '#primary');
		expect(await style(page, '#primary', 'background-color')).not.toBe(rest);
		await expectAA(page, '#primary', { label: 'primary hovered' });
		await page.hover('#medium');
		await settle(page, '#medium');
		expect(await style(page, '#medium', 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
		await expectAA(page, '#medium', { label: 'medium hovered' });
	});

	test('a pressed medium or low toggle keeps its pressed look on hover', async ({ page }) => {
		await open(page);
		const rest = await style(page, '#pressed-medium', 'background-color');
		await page.hover('#pressed-medium');
		await settle(page, '#pressed-medium');
		expect(await style(page, '#pressed-medium', 'background-color')).toBe(rest);
	});

	test('a disabled low-emphasis button keeps its transparent border on hover', async ({ page }) => {
		await open(page);
		const rest = await style(page, '#disabled-low', 'border-top-color');
		await page.hover('#disabled-low');
		await settle(page, '#disabled-low');
		expect(await style(page, '#disabled-low', 'border-top-color')).toBe(rest);
	});

	test('a link, a pressed toggle, and an icon behave like buttons', async ({ page }) => {
		await open(page);
		const [link, md] = await Promise.all([rect(page, '#link'), rect(page, '#md')]);
		expect(link.height).toBeCloseTo(md.height, 0);
		expect(await style(page, '#link', 'text-decoration-line')).toBe('none');
		// getPropertyValue returns the token's raw text (a light-dark() call the
		// canvas helper cannot parse), so resolve it the same way token() does:
		// give a probe element that value and read its used color back.
		const [bg, strong] = await page.evaluate(() => {
			const el = document.getElementById('pressed');
			const probe = document.createElement('div');
			probe.style.color = getComputedStyle(el).getPropertyValue('--_yeti-variant-strong');
			document.body.append(probe);
			const strongColor = getComputedStyle(probe).color;
			probe.remove();
			return [window.__yeti.rgb(getComputedStyle(el).backgroundColor), window.__yeti.rgb(strongColor)];
		});
		expect(bg).toEqual(strong);
		const em = await px(page, '#icon', 'font-size');
		expect((await rect(page, '#svg')).width).toBeCloseTo(em, 1);
	});

	test('focus ring shows on keyboard focus only', async ({ page, browserName }) => {
		// A plain <button> without an explicit tabindex is not reachable by
		// sequential Tab navigation in headless WebKit by default (it mirrors
		// Safari's "Full Keyboard Access off" default, which limits Tab to text
		// fields); verified for real in chromium and firefox, where the click
		// leaves #primary unfocused and Tab lands on #secondary.
		test.skip(browserName === 'webkit', 'headless WebKit does not Tab to buttons');
		await open(page);
		await page.click('#primary');
		expect(await style(page, '#primary', 'outline-style')).toBe('none');
		await page.keyboard.press('Tab');
		const focused = await page.evaluate(() => document.activeElement.id);
		expect(await style(page, `#${focused}`, 'outline-style')).toBe('solid');
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
