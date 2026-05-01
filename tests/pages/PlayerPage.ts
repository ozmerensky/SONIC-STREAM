import { Page, Locator } from '@playwright/test';

export class PlayerPage {
  readonly page: Page;
  readonly playerBar: Locator;
  readonly playButton: Locator;
  readonly trackTitle: Locator;
  readonly progressSeekBar: Locator;
  readonly volumeSeekBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playerBar = page.getByTestId('player-bar');
    this.trackTitle = this.playerBar.locator('[class*="title"]').first();
    
    this.playButton = this.playerBar.getByTestId('main-play-btn');
    this.progressSeekBar = this.playerBar.getByLabel(/music progress/i);
    this.volumeSeekBar = this.playerBar.getByLabel(/volume control/i);
  }

  async setProgress(value: string) {
    await this.progressSeekBar.waitFor({ state: 'visible' });
    await this.progressSeekBar.fill(value);
  }

  async setVolume(value: string) {
    await this.volumeSeekBar.fill(value);
  }
}
