import { Page, Locator } from '@playwright/test';

export class PlayerPage {
  readonly page: Page;
  readonly playerBar: Locator;
  readonly playButton: Locator;
  readonly trackTitle: Locator;
  readonly artistName: Locator;
  readonly progressSeekBar: Locator;
  readonly volumeSeekBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playerBar = page.getByTestId('player-bar');
    this.playButton = this.playerBar.getByTestId('main-play-btn');
    this.trackTitle = this.playerBar.locator('div[class*="title"]'); 
    this.artistName = this.playerBar.locator('div[class*="artist"]');
    
    this.progressSeekBar = this.playerBar.getByLabel('Music progress');
    this.volumeSeekBar = this.playerBar.getByLabel('Volume control');
  }

  async setProgress(value: string) {
    await this.progressSeekBar.fill(value);
  }

  async setVolume(value: string) {
    await this.volumeSeekBar.fill(value);
  }
}
