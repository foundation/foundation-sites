import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LAYER_NAMES } from '../../bin/lib/layers.js';

test.describe('unbuilt source tree', () => {
	test.beforeEach(async ({ page }) => {
		const response = await page.goto('/test/browser/smoke.html');
		expect(response.status()).toBe(200);
	});

	test('loads and declares the cascade layers in order', async ({ page }) => {
		const names = await page.evaluate(() => {
			let rule = document.styleSheets[0].cssRules[0];
			while (rule instanceof CSSImportRule) rule = rule.styleSheet.cssRules[0];
			return rule instanceof CSSLayerStatementRule ? Array.from(rule.nameList) : null;
		});
		expect(names).toEqual(LAYER_NAMES);
	});

	test('has no accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
