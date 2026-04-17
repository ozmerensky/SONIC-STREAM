import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SidebarPage } from './pages/SidebarPage';
import { PlaylistPage } from './pages/PlaylistPage';

test.describe('Playlist Flow', () => {
  let homePage: HomePage;
  let sidebar: SidebarPage;
  let playlistPage: PlaylistPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    sidebar = new SidebarPage(page);
    playlistPage = new PlaylistPage(page);
  });

  test('should create, add track, and rename playlist', async ({ page }) => {
    await homePage.goto();
    await homePage.waitForLoadingToFinish();

    await sidebar.createPlaylistBtn.click();
    const playlistLink = page.getByRole('link', { name: 'My Playlist #1', exact: true });
    await expect(playlistLink).toBeVisible();

    await homePage.trackCards.first().getByRole('button', { name: /add to playlist/i }).click();
    await page.getByRole('button', { name: 'My Playlist #1' }).click();

    await playlistLink.click();
    await expect(playlistPage.trackCards).toHaveCount(1);

    await playlistPage.title.click();
    await playlistPage.nameInput.fill('Rock Mix');
    await page.keyboard.press('Enter');
    
    await expect(playlistPage.title).toHaveText(/Rock Mix/i);
    await expect(sidebar.sidebar).toContainText('Rock Mix');
  });

  test('should delete a playlist and redirect to home', async ({ page }) => {
    await homePage.goto();
    
    await sidebar.createPlaylistBtn.click();
    const playlistName = 'My Playlist #1';
    
    const playlistLink = page.getByRole('link', { name: playlistName, exact: true });
    await playlistLink.click();

    page.on('dialog', dialog => dialog.accept());

    await playlistPage.deleteBtn.click();

    await expect(page).toHaveURL('/');
    await expect(page.getByText(playlistName)).not.toBeVisible();
  });
});
