import { test, expect } from '../fixtures/authenticatedTest';

test('sidebar search filters the navigation links', async ({ pages }) => {
  await pages.dashboardPage.searchMenu('Directory');
  await expect(pages.dashboardPage.menuItem('Directory')).toBeVisible();
  await expect(pages.dashboardPage.menuItem('Admin')).toHaveCount(0);

  await pages.dashboardPage.searchMenu('');
  await expect(pages.dashboardPage.menuItem('Admin')).toBeVisible();
  await expect(pages.dashboardPage.menuItem('Dashboard')).toBeVisible();
});

test('logout removes access to the dashboard', async ({ page, pages }) => {
  await pages.dashboardPage.logout();
  await expect(pages.loginPage.heading).toBeVisible();
  await expect(page).toHaveURL(/\/auth\/login(?:[?#].*)?$/);

  await pages.dashboardPage.open();
  await expect(pages.loginPage.heading).toBeVisible();
  await expect(page).toHaveURL(/\/auth\/login(?:[?#].*)?$/);
});
