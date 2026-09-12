import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
	testDir: 'test/browser',
	testMatch: '**/*.spec.js',
	fullyParallel: true,
	reporter: process.env.CI ? 'github' : 'list',
	webServer: {
		command: 'node test/browser/serve.js',
		url: 'http://localhost:4173/test/browser/smoke.html',
		reuseExistingServer: !process.env.CI,
	},
	use: { baseURL: 'http://localhost:4173' },
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
	],
});
