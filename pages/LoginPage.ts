import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly heading: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentials: Locator;
  readonly requiredMessages: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Login', exact: true });
    this.username = page.getByRole('textbox', { name: 'Username', exact: true });
    this.password = page.getByRole('textbox', { name: 'Password', exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.invalidCredentials = page.getByText('Invalid credentials', { exact: true });
    this.requiredMessages = page.getByText('Required', { exact: true });
  }

  async open() {
    await this.navigate('auth/login');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
