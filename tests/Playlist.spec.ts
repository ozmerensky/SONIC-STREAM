import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SidebarPage } from './pages/SidebarPage';

test.describe('Playlist Flow', () => {
  test('should create, add track, and rename playlist', async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new SidebarPage(page);

    await homePage.goto();
    await homePage.waitForLoadingToFinish();

    await sidebar.createPlaylistBtn.click();
    const playlistLink = page.getByText('My Playlist #1');
    await expect(playlistLink).toBeVisible();

    await homePage.trackCards.first().getByRole('button', { name: /add to playlist/i }).click();
    await page.getByRole('button', { name: 'My Playlist #1' }).click();

    await playlistLink.click();
    await expect(page.getByTestId('track-card')).toHaveCount(1);

    const title = page.locator('h1[class*="title"]');
    await title.click();
    
    const nameInput = page.locator('input[class*="nameInput"]');
    await nameInput.fill('Rock Mix');
    await page.keyboard.press('Enter');
    
    await expect(title).toHaveText(/Rock Mix/i);
    await expect(sidebar.sidebar).toContainText('Rock Mix');
  });
});
