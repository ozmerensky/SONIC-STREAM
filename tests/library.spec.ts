import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { SidebarPage } from './pages/SidebarPage';

test.describe('Library and Favorites', () => {
  test('should add a song to library when heart is clicked', async ({ page }) => {
    const homePage = new HomePage(page);
    const libraryPage = new LibraryPage(page);
    const sidebar = new SidebarPage(page);

    await homePage.goto();
    await homePage.waitForLoadingToFinish();

    const firstTrackTitle = await homePage.trackCards.first().locator('h3').textContent();
    await homePage.toggleLikeOnTrack(0);

    await sidebar.libraryLink.click();
    await expect(page).toHaveURL(/\/library/);

    await expect(libraryPage.trackCards).toHaveCount(1);
    await expect(libraryPage.trackCards.first()).toContainText(firstTrackTitle!);

    await libraryPage.trackCards.first().getByRole('button', { name: /liked/i }).click();
    await expect(libraryPage.trackCards).toHaveCount(0);
    await expect(libraryPage.emptyMessage).toBeVisible();
  });
});
