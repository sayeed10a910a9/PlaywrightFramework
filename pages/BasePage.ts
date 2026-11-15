import { type Page } from '@playwright/test';

// Shared UI navigation only. This class does not manage test lifecycle or login state.
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async navigate(relativePath: string) {
    await this.page.goto(relativePath);
  }
}
