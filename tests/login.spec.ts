import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

let pages: PageManager;

test.beforeEach(async ({ page }) => {
  pages = new PageManager(page);
  await pages.loginPage.open();
});

test('valid user can log in to OrangeHRM', async ({ page }) => {
  await pages.loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

  await expect(pages.dashboardPage.heading).toBeVisible();
  await expect(page).toHaveURL(/\/dashboard\/index(?:[?#].*)?$/);
  await expect(pages.dashboardPage.menuItem('Dashboard')).toBeVisible();
});

test('invalid credentials are rejected', async () => {
  await pages.loginPage.login('nonexistent-automation-user', 'incorrect-password');

  await expect(pages.loginPage.invalidCredentials).toBeVisible();
  await expect(pages.loginPage.heading).toBeVisible();
  await expect(pages.dashboardPage.heading).not.toBeVisible();
});

test('empty username and password are required', async () => {
  await pages.loginPage.login('', '');

  await expect(pages.loginPage.requiredMessages).toHaveCount(2);
  await expect(pages.loginPage.requiredMessages.nth(0)).toBeVisible();
  await expect(pages.loginPage.requiredMessages.nth(1)).toBeVisible();
  await expect(pages.loginPage.heading).toBeVisible();
});

test('username is required when password is supplied', async () => {
  await pages.loginPage.login('', process.env.TEST_PASSWORD!);

  await expect(pages.loginPage.requiredMessages).toHaveCount(1);
  await expect(pages.loginPage.requiredMessages).toBeVisible();
  await expect(pages.loginPage.username).toBeEmpty();
  await expect(pages.loginPage.heading).toBeVisible();
});

test('password is required when username is supplied', async () => {
  await pages.loginPage.login(process.env.TEST_USERNAME!, '');

  await expect(pages.loginPage.requiredMessages).toHaveCount(1);
  await expect(pages.loginPage.requiredMessages).toBeVisible();
  await expect(pages.loginPage.password).toBeEmpty();
  await expect(pages.loginPage.heading).toBeVisible();
});
