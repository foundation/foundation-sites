// Shared helpers for the layout fixtures. Every fixture wraps its layout in
// #stage; tests size the stage, not the viewport, because layouts respond to
// their container.
import { expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function stage(page, width) {
	await page.evaluate((w) => { document.getElementById('stage').style.inlineSize = `${w}px`; }, width);
}

export async function open(page, name, width = 1000) {
	const response = await page.goto(`/test/browser/fixtures/layouts/${name}.html`);
	expect(response.status()).toBe(200);
	await stage(page, width);
}

export function rect(page, selector) {
	return page.evaluate((s) => {
		const r = document.querySelector(s).getBoundingClientRect();
		return { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, right: r.right, bottom: r.bottom, left: r.left };
	}, selector);
}

export function rects(page, selector) {
	return page.evaluate((s) => [...document.querySelectorAll(s)].map((el) => {
		const r = el.getBoundingClientRect();
		return { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, right: r.right, bottom: r.bottom, left: r.left };
	}), selector);
}

export function style(page, selector, prop) {
	return page.evaluate(([s, p]) => getComputedStyle(document.querySelector(s)).getPropertyValue(p), [selector, prop]);
}

export async function px(page, selector, prop) {
	return parseFloat(await style(page, selector, prop));
}

/** Resolves a token to pixels by giving a probe element that token as its width. */
export function token(page, name) {
	return page.evaluate((n) => {
		const probe = document.createElement('div');
		probe.style.cssText = `position:absolute;inline-size:var(${n});block-size:0;visibility:hidden`;
		document.body.append(probe);
		const value = probe.getBoundingClientRect().width;
		probe.remove();
		return value;
	}, name);
}

/**
 * Every direct child of every match has zero margins. Children a layout pushes
 * with an auto margin by design (data-split, data-center) are skipped, since
 * the computed style reports the used pixel value of that auto margin.
 */
export async function expectNoChildMargins(page, selector, except = '[data-split], [data-center]') {
	const margins = await page.evaluate(([s, x]) => [...document.querySelectorAll(s)].flatMap((el) => [...el.children].filter((child) => !child.matches(x)).map((child) => {
		const cs = getComputedStyle(child);
		return [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].join(' ');
	})), [selector, except]);
	expect(margins.length).toBeGreaterThan(0);
	for (const m of margins) expect(m).toBe('0px 0px 0px 0px');
}

export async function axe(page) {
	return (await new AxeBuilder({ page }).analyze()).violations;
}
