import { test, expect } from '@playwright/test';
import { PlayerPage } from './pages/PlayerPage';

test.describe('Player Bar Interactions', () => {
  let player: PlayerPage;

  test.beforeEach(async ({ page }) => {
    player = new PlayerPage(page);
    await page.goto('/');
  });

  test('should display initial track information', async () => {
    await expect(player.trackTitle).toBeVisible();
    await expect(player.artistName).toBeVisible();
  });

  test('should update seekbar value when dragged', async () => {
    await player.setProgress('75');
    await expect(player.progressSeekBar).toHaveValue('75');
  });

  test('should update volume value when changed', async () => {
    await player.setVolume('20');
    await expect(player.volumeSeekBar).toHaveValue('20');
  });
});
