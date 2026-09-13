import { test, expect } from 'playwright/test';
import { open, stage, rect, token, expectNoChildMargins, axe } from '../lib/layout.js';

test.describe('sidebar', () => {
	test('sits side by side at 1000px with the sidebar at its token width', async ({ page }) => {
		await open(page, 'sidebar');
		const [side, content] = await Promise.all([rect(page, '#side'), rect(page, '#content')]);
		expect(side.top).toBeCloseTo(content.top, 1);
		// flex-grow: 1 against the content's 999 leaves the sidebar a fraction of a pixel over its basis.
		expect(Math.abs(side.width - await token(page, '--yeti-width-sm'))).toBeLessThan(2);
		expect(content.left - side.right).toBeCloseTo(await token(page, '--yeti-space-md'), 1);
	});

	test('stacks at 400px, both filling the width', async ({ page }) => {
		await open(page, 'sidebar', 400);
		const [side, content] = await Promise.all([rect(page, '#side'), rect(page, '#content')]);
		expect(content.top).toBeGreaterThanOrEqual(side.bottom);
		expect(side.width).toBeCloseTo(400, 1);
		expect(content.width).toBeCloseTo(400, 1);
	});

	test('data-side="end" makes the last child the sidebar', async ({ page }) => {
		await open(page, 'sidebar');
		const [content, side] = await Promise.all([rect(page, '#e-content'), rect(page, '#e-side')]);
		expect(side.left).toBeGreaterThan(content.right);
		expect(Math.abs(side.width - await token(page, '--yeti-width-xs'))).toBeLessThan(2);
	});

	test('children have no margins', async ({ page }) => {
		await open(page, 'sidebar');
		await expectNoChildMargins(page, '.sidebar');
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'sidebar');
		expect(await axe(page)).toEqual([]);
	});
});
