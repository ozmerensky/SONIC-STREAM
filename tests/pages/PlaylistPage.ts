import { Page, Locator } from '@playwright/test';

export class PlaylistPage {
  readonly page: Page;
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly trackCards: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1[class*="title"]');
    this.nameInput = page.locator('input[class*="nameInput"]');
    this.trackCards = page.getByTestId('track-card');
    this.deleteBtn = page.getByRole('button', { name: /delete playlist/i });
  }
  async rename(newName: string) {
    await this.title.click();
    await this.nameInput.fill(newName);
    await this.page.keyboard.press('Enter');
  }

  async delete() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.deleteBtn.click();
  }
}
