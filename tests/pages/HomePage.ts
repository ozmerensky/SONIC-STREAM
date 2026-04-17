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
    this.trackGrid = this.mainContent.locator('[class*="trackGrid"]');
    this.trackCards = this.mainContent.getByTestId('track-card');
    this.skeletons = page.locator('[class*="skeletonCard"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForLoadingToFinish() {
    await this.page.waitForSelector('[data-testid="track-card"]');
  }

  async playTrackByIndex(index: number) {
    const card = this.trackCards.nth(index);
    await card.getByRole('button', { name: /play/i }).first().click();
  }

  async toggleLikeOnTrack(index: number) {
    const card = this.trackCards.nth(index);
    await card.waitFor({ state: 'visible' });
    await card.getByRole('button', { name: /liked/i }).click();
  }
}
