import { Page, Locator } from '@playwright/test';

export class LibraryPage {
  readonly page: Page;
  readonly trackCards: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.trackCards = page.getByTestId('track-card');
    this.emptyMessage = page.getByText('Songs you like will appear here');
  }

  async goto() {
    await this.page.goto('/library');
  }
}
