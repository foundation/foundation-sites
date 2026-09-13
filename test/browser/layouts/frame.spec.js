import { test, expect } from 'playwright/test';
import { open, rect, axe } from '../lib/layout.js';

test.describe('frame', () => {
	test('keeps its ratio and the image fills it', async ({ page }) => {
		await open(page, 'frame', 800);
		const [frame, img] = await Promise.all([rect(page, '#frame'), rect(page, '#img')]);
		expect(frame.height).toBeCloseTo(frame.width * 9 / 16, 0);
		expect(img.width).toBeCloseTo(frame.width, 1);
		expect(img.height).toBeCloseTo(frame.height, 1);
	});

	test('data-ratio="1/1" is square and centers a non-media child', async ({ page }) => {
		await open(page, 'frame');
		const [square, p] = await Promise.all([rect(page, '#square'), rect(page, '#placeholder')]);
		expect(square.height).toBeCloseTo(square.width, 0);
		expect((p.top + p.bottom) / 2).toBeCloseTo((square.top + square.bottom) / 2, 0);
	});

	test('has no accessibility violations', async ({ page }) => {
		await open(page, 'frame');
		expect(await axe(page)).toEqual([]);
	});
});
