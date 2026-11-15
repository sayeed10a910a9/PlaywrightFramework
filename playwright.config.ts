import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(__dirname, '.env') });
for (const key of ['BASE_URL', 'TEST_USERNAME', 'TEST_PASSWORD']) {
  if (!process.env[key]) throw new Error(`Set ${key} in .env or the process environment`);
}
const url = new URL(process.env.BASE_URL!);
if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
  throw new Error('BASE_URL must be an HTTP(S) URL without embedded credentials');
}
if (!url.pathname.endsWith('/')) {
  throw new Error('BASE_URL must end with / so page paths resolve correctly');
}
const ci = ['true', '1'].includes(process.env.CI || '');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 1:undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  failOnFlakyTests: ci,
  reporter: [
    //['list'],
    ['html'],
    //['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'msedge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
  ],
  use: {
    baseURL: url.href,
    headless: false,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
});
