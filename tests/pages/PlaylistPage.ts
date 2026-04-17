import { Page, Locator } from '@playwright/test';

export class PlaylistPage {
  readonly page: Page;
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly trackCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1[class*="title"]');
    this.nameInput = page.locator('input[class*="nameInput"]');
    this.trackCards = page.getByTestId('track-card');
  }
}
