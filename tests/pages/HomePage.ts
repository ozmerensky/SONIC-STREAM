import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly mainContent: Locator;
  readonly trackCards: Locator;
  readonly skeletons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.getByTestId('main-content');
    this.pageTitle = this.mainContent.getByRole('heading', { name: /sonic stream/i });
    this.trackCards = this.mainContent.getByTestId('track-card');
    this.skeletons = this.mainContent.getByTestId('track-card-skeleton');
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async waitForLoadingToFinish() {
    if (await this.skeletons.first().isVisible()) {
      await this.skeletons.first().waitFor({ state: 'hidden' });
    }
    await this.trackCards.first().waitFor({ state: 'visible' });
  }

  async playTrackByIndex(index: number) {
    const card = this.trackCards.nth(index);
    await expect(card).toBeVisible();
    await card.getByRole('button', { name: /play/i }).first().click();
  }

  async toggleLikeOnTrack(index: number) {
    const card = this.trackCards.nth(index);
    await card.getByRole('button', { name: /liked|heart/i }).click();
  }
}
