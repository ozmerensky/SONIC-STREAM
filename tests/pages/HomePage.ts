import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly mainContent: Locator;
  readonly pageTitle: Locator;
  readonly trackGrid: Locator;
  readonly trackCards: Locator;
  readonly skeletons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.getByTestId('main-content');
    
    this.pageTitle = this.mainContent.getByRole('heading', { name: 'Sonic Stream' });
    this.trackGrid = this.mainContent.locator('.trackGrid');
    this.trackCards = this.mainContent.getByTestId('track-card');
    this.skeletons = page.locator('[class*="skeletonCard"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForLoadingToFinish() {
    await this.trackCards.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async playTrackByIndex(index: number) {
    await this.waitForLoadingToFinish();
    const card = this.trackCards.nth(index);
    await card.getByRole('button').click();
  }

}
