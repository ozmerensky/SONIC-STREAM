import { test, expect } from '@playwright/test';
import { PlayerPage } from './pages/PlayerPage';
import { HomePage } from './pages/HomePage';

test.describe('Player Bar Interactions', () => {
  let player: PlayerPage;

  test.beforeEach(async ({ page }) => {
    player = new PlayerPage(page);
    await page.goto('/');
  });

  test('should display initial track information', async () => {
    await expect(player.trackTitle).toHaveText(/Select a track/i);
    await expect(player.artistName).toHaveText(/to start listening/i);
  });

  test('should update volume value when changed', async () => {
    await player.setVolume('20');
    await expect(player.volumeSeekBar).toHaveValue('20');
  });

  test('should update player and interact with progress bar when a track is clicked', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.playTrackByIndex(0); 

    await expect(player.trackTitle).not.toHaveText(/Select a track/i);
    await expect(player.playButton).toHaveAttribute('aria-label', 'Pause');

    await expect(player.progressSeekBar).toBeVisible();
    await player.progressSeekBar.fill('50');
  });
});
