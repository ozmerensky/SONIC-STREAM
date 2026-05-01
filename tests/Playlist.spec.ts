import { test, expect } from './fixtures';

test.describe('Playlist Flow', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForLoadingToFinish();
  });

  test('should create, add track, and rename playlist', async ({ page, sidebar, homePage, playlistPage }) => {
    const defaultName = 'My Playlist #1';
    const newName = 'Rock Mix';

    await test.step('Create playlist', async () => {
      await sidebar.createPlaylistBtn.click();
      await expect(sidebar.getPlaylistLink(defaultName)).toBeVisible();
    });

    await test.step('Add track to playlist', async () => {
      await homePage.trackCards.first().getByRole('button', { name: /add to playlist/i }).click();
      await page.getByRole('button', { name: defaultName }).click();
    });

    await test.step('Rename and verify', async () => {
      await sidebar.getPlaylistLink(defaultName).click();
      await playlistPage.rename(newName);
      
      await expect(playlistPage.title).toHaveText(new RegExp(newName, 'i'));
      await expect(sidebar.sidebar).toContainText(newName);
    });
  });

  test('should delete a playlist', async ({ page, sidebar, playlistPage }) => {
    await sidebar.createPlaylistBtn.click();
    const playlistName = 'My Playlist #1';
    await sidebar.getPlaylistLink(playlistName).click();

    await playlistPage.delete();

    await expect(page).toHaveURL('/');
    await expect(sidebar.sidebar).not.toContainText(playlistName);
  });
});
