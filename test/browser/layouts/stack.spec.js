import { test, expect } from 'playwright/test';
import { open, rect, token, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('stack', () => {
	test('gap between children equals the token', async ({ page }) => {
		await open(page, 'stack');
		const [a, b] = await Promise.all([rect(page, '#a'), rect(page, '#b')]);
		expect(b.top - a.bottom).toBeCloseTo(await token(page, '--yeti-space-md'), 1);
		const [sa, sb] = await Promise.all([rect(page, '#sa'), rect(page, '#sb')]);
		expect(sb.top - sa.bottom).toBeCloseTo(await token(page, '--yeti-space-sm'), 1);
	});

	test('data-split pushes the child to the end', async ({ page }) => {
		await open(page, 'stack');
		const [stack, d] = await Promise.all([rect(page, '#stack'), rect(page, '#d')]);
		expect(d.bottom).toBeCloseTo(stack.bottom, 1);
		const c = await rect(page, '#c');
		expect(d.top - c.bottom).toBeGreaterThan(await token(page, '--yeti-space-md'));
	});

	test('data-align="start" stops children stretching', async ({ page }) => {
		await open(page, 'stack');
		expect((await rect(page, '#sa')).width).toBeLessThan((await rect(page, '#stack-sm')).width);
		expect((await rect(page, '#a')).width).toBeCloseTo((await rect(page, '#stack')).width, 1);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'stack');
		await expectNoChildMargins(page, '.stack');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'stack');
		expect(await axe(page)).toEqual([]);
	});
});
