import { test, expect } from './fixtures';

test.describe('Player Bar Interactions', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should not show player initially and show it after selecting a track', async ({ homePage, playerPage }) => {
    await expect(playerPage.playerBar).not.toBeVisible();
    await homePage.playTrackByIndex(0);
    await expect(playerPage.playerBar).toBeVisible();
    await expect(playerPage.trackTitle).not.toBeEmpty();
  });

  test('should update volume value when changed', async ({ homePage, playerPage }) => {
    await homePage.playTrackByIndex(0);
    await playerPage.setVolume('20');
    await expect(playerPage.volumeSeekBar).toHaveValue('20');
  });

  test('should update player state and interact with progress bar', async ({ homePage, playerPage }) => {
    await test.step('Start playing a track', async () => {
      await homePage.playTrackByIndex(0);
      await expect(playerPage.playButton).toHaveAttribute('aria-label', /pause/i);
    });

    await test.step('Interact with progress bar', async () => {
      await playerPage.playButton.click();
      await playerPage.setProgress('50');

      await expect.poll(async () => {
        const value = await playerPage.progressSeekBar.inputValue();
        return Number(value);
      }).toBeCloseTo(50, 1);
    });
  });
});
