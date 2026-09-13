import { test, expect } from 'playwright/test';
import { open, px, token, axe } from '../lib/layout.js';

test.describe('box', () => {
	test('padding equals the gap token', async ({ page }) => {
		await open(page, 'box');
		const md = await token(page, '--yeti-space-md');
		for (const side of ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']) {
			expect(await px(page, '#box', side)).toBeCloseTo(md, 1);
		}
		expect(await px(page, '#bordered', 'padding-top')).toBeCloseTo(await token(page, '--yeti-space-lg'), 1);
	});

	test('data-border draws a one-pixel border', async ({ page }) => {
		await open(page, 'box');
		expect(await px(page, '#box', 'border-top-width')).toBe(0);
		expect(await px(page, '#bordered', 'border-top-width')).toBe(1);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'box');
		expect(await axe(page)).toEqual([]);
	});
});
