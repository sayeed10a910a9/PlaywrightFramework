import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly sidebar: Locator;
  readonly menuSearch: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard', exact: true });
    this.sidebar = page.getByRole('navigation', { name: 'Sidepanel' });
    this.menuSearch = this.sidebar.getByRole('textbox', { name: 'Search', exact: true });
    // OrangeHRM's user dropdown has no accessible button name.
    this.userMenu = page.locator('.oxd-userdropdown-tab');
  }

  async open() {
    await this.navigate('dashboard/index');
  }

  menuItem(name: string) {
    return this.sidebar.getByRole('link', { name, exact: true });
  }

  async searchMenu(text: string) {
    await this.menuSearch.fill(text);
  }

  async logout() {
    await this.userMenu.click();
    await this.page.getByRole('menuitem', { name: 'Logout', exact: true }).click();
  }
}
