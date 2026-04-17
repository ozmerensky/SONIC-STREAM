import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly trackCards: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder(/What do you want to listen to/i);
    this.trackCards = page.getByTestId('track-card');
    this.noResultsMessage = page.locator('p[class*="noResults"]');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
  }
}
