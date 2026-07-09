import { Page, Locator } from '@playwright/test';

export class LibraryPage {
  readonly page: Page;
  readonly trackCards: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.trackCards = page.getByTestId('track-card');
    this.emptyMessage = page.getByText(/songs you like will appear here/i);
  }
}