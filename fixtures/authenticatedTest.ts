import { test as base, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

// Test-scoped and lazy: login runs for each test that requests { pages }.
// Playwright owns and closes the underlying page/context after each test.
export const test = base.extend<{ pages: PageManager }>({
  pages: async ({ page }, use) => {
    const pages = new PageManager(page);

    await pages.loginPage.open();
    await pages.loginPage.login(
      process.env.TEST_USERNAME!,
      process.env.TEST_PASSWORD!,
    );
    await expect(pages.dashboardPage.heading).toBeVisible();

    await use(pages);

    await page.waitForTimeout(1000);
  },
});

export { expect };
