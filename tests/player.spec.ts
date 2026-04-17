import { test, expect } from '@playwright/test';
import { PlayerPage } from './pages/PlayerPage';
import { HomePage } from './pages/HomePage';

test.describe('Player Bar Interactions', () => {
  let player: PlayerPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    player = new PlayerPage(page);
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should not show player initially and show it after selecting a track', async () => {
    await expect(player.playerBar).not.toBeVisible();
    await homePage.playTrackByIndex(0);

    await expect(player.playerBar).toBeVisible();
    await expect(player.trackTitle).not.toBeEmpty();
  });

  test('should update volume value when changed', async () => {
    await homePage.playTrackByIndex(0);
    
    await player.setVolume('20');
    await expect(player.volumeSeekBar).toHaveValue('20');
  });

  test('should update player state and interact with progress bar', async () => {
    await homePage.playTrackByIndex(0); 

    await expect(player.playButton).toHaveAttribute('aria-label', /pause/i);

    await expect(player.progressSeekBar).toBeVisible();
    await player.progressSeekBar.fill('50');
  });
});
