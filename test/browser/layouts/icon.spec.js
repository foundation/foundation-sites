import { test, expect } from 'playwright/test';
import { open, rect, px, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('icon', () => {
	test('the svg is one em square', async ({ page }) => {
		await open(page, 'icon');
		const em = await px(page, '#icon', 'font-size');
		const svg = await rect(page, '#svg');
		expect(svg.width).toBeCloseTo(em, 1);
		expect(svg.height).toBeCloseTo(em, 1);
	});

	test('is centered on the text by default', async ({ page }) => {
		await open(page, 'icon');
		const [svg, label] = await Promise.all([rect(page, '#svg'), rect(page, '#label')]);
		expect((svg.top + svg.bottom) / 2).toBeCloseTo((label.top + label.bottom) / 2, 0);
	});

	test('data-align="baseline" sets the svg on the baseline with the nudge', async ({ page }) => {
		await open(page, 'icon');
		const em = await px(page, '#base', 'font-size');
		const [svg, probe] = await Promise.all([rect(page, '#base-svg'), rect(page, '#probe')]);
		expect(Math.abs((svg.bottom - probe.bottom) - 0.125 * em)).toBeLessThan(1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'icon');
		await expectNoChildMargins(page, '.icon');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'icon');
		expect(await axe(page)).toEqual([]);
	});
});
