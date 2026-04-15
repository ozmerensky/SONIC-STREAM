import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly mainContent: Locator;
  readonly pageTitle: Locator;
  readonly trackGrid: Locator;
  readonly trackCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.getByTestId('main-content');
    
    this.pageTitle = this.mainContent.getByRole('heading', { name: 'Sonic Stream' });
    this.trackGrid = this.mainContent.locator('.trackGrid');
    this.trackCards = this.mainContent.getByTestId('track-card');
  }

  async goto() {
    await this.page.goto('/');
  }
}
