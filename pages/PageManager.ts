import { type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';

// Register page objects here once; create a manager per test in the fixture or hook.
// All objects use the same page within one test. Never export a global instance.
export class PageManager {
  readonly loginPage: LoginPage;
  readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }
}
