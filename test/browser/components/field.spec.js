import { test, expect } from 'playwright/test';
import { stage, rect, rects, style, px, token, axe } from '../lib/layout.js';
import { PAGE_HELPERS, expectAA } from '../lib/contrast.js';

// checked/unchecked box-shadow is transitioned; wait two animation frames so
// it has settled before reading the computed value.
const settle = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

// The box-shadow ring transitions to "none" over --yeti-duration-fast (150ms).
// Two animation frames are enough to see the transition has started, but the
// value isn't the settled "none" until the transition itself has finished;
// wait on the element's running animations rather than a fixed timeout.
const settleTransitions = (page, selector) => page.evaluate((s) => Promise.all(document.querySelector(s).getAnimations().map((a) => a.finished)), selector);

const open = async (page, width = 1000) => {
	await page.addInitScript(PAGE_HELPERS);
	const response = await page.goto('/test/browser/fixtures/components/field.html');
	expect(response.status()).toBe(200);
	await stage(page, width);
};

test.describe('field', () => {
	test('controls meet the control size and scale with data-size', async ({ page }) => {
		await open(page);
		const size = await token(page, '--yeti-control-size');
		for (const id of ['email', 'name', 'colour', 'code']) expect((await rect(page, `#${id}`)).height, id).toBeGreaterThanOrEqual(size - 0.5);
		expect((await rect(page, '#notes')).height).toBeGreaterThan(size);
		expect(await px(page, '#code', 'font-size')).toBeLessThan(await px(page, '#email', 'font-size'));
		expect(await style(page, '#colour', 'background-image')).not.toBe('none');
	});

	test('the error shows after the visitor leaves an invalid value, and at once with aria-invalid', async ({ page }) => {
		await open(page);
		expect(await style(page, '#email-error', 'display')).toBe('none');
		const rest = await style(page, '#email', 'border-top-color');
		await page.fill('#email', 'nope');
		await page.locator('#email').blur();
		expect(await style(page, '#email-error', 'display')).toBe('block');
		expect(await style(page, '#email', 'border-top-color')).not.toBe(rest);
		expect(await style(page, '#name-error', 'display')).toBe('block');
		await expectAA(page, '#email-error', { label: 'error text' });
	});

	test('required marks the label; checkboxes are inline and coloured when checked', async ({ page }) => {
		await open(page);
		expect(await page.evaluate(() => getComputedStyle(document.getElementById('email-label'), '::after').content)).toContain('*');
		const [box, label] = await Promise.all([rect(page, '#agree'), rect(page, '#agree-label')]);
		expect(label.left).toBeGreaterThan(box.right);
		expect(Math.abs((box.top + box.bottom) / 2 - (label.top + label.bottom) / 2)).toBeLessThan(2);
		const checked = await style(page, '#agree', 'box-shadow');
		expect(checked).not.toBe('none');
		// getPropertyValue returns the token's raw text (a light-dark() call the
		// canvas helper cannot parse), so resolve it the same way token() does:
		// give a probe element that value and read its used color back.
		const [bg, variant] = await page.evaluate(() => {
			const el = document.getElementById('agree');
			const probe = document.createElement('div');
			probe.style.color = getComputedStyle(el).getPropertyValue('--_yeti-variant');
			document.body.append(probe);
			const variantColor = getComputedStyle(probe).color;
			probe.remove();
			return [window.__yeti.rgb(getComputedStyle(el).backgroundColor), window.__yeti.rgb(variantColor)];
		});
		expect(bg).toEqual(variant);
		await page.uncheck('#agree');
		await settle(page);
		await settleTransitions(page, '#agree');
		expect(await style(page, '#agree', 'box-shadow')).toBe('none');
		const [uncheckedBg, surface] = await page.evaluate(() => {
			const el = document.getElementById('agree');
			const probe = document.createElement('div');
			probe.style.color = getComputedStyle(el).getPropertyValue('--yeti-control-surface');
			document.body.append(probe);
			const surfaceColor = getComputedStyle(probe).color;
			probe.remove();
			return [window.__yeti.rgb(getComputedStyle(el).backgroundColor), window.__yeti.rgb(surfaceColor)];
		});
		expect(uncheckedBg).toEqual(surface);
	});

	test('an invalid control only reddens its own control', async ({ page }) => {
		await open(page);
		const rest = await style(page, '#p-b', 'border-top-color');
		await page.evaluate(() => document.getElementById('p-a').setAttribute('aria-invalid', 'true'));
		expect(await style(page, '#p-b', 'border-top-color')).toBe(rest);
		expect(await style(page, '#p-a', 'border-top-color')).not.toBe(rest);
	});

	test('a fieldset field groups inline fields under a legend', async ({ page }) => {
		await open(page);
		const [a, b] = await Promise.all([rect(page, '#p-a'), rect(page, '#p-b')]);
		expect(b.top).toBeGreaterThanOrEqual(a.bottom);
		expect(await style(page, '#p-a', 'border-top-left-radius')).not.toBe('0px');
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
