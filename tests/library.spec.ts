import { test, expect } from './fixtures';

test.describe('Library and Favorites', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.waitForLoadingToFinish();
  });

  test('should add and remove a song from library', async ({ homePage, sidebar, libraryPage }) => {
    await homePage.toggleLikeOnTrack(0);
    await sidebar.navigateTo('library');
    
    await expect(libraryPage.trackCards).toHaveCount(1);
    
    // הסרה מהלייקים
    await libraryPage.trackCards.first().getByRole('button', { name: /liked/i }).click();
    
    await expect(libraryPage.trackCards).toHaveCount(0);
    await expect(libraryPage.emptyMessage).toBeVisible();
  });

  test('should show and dismiss toast notification', async ({ page, homePage }) => {
    await homePage.toggleLikeOnTrack(0);
    
    const toast = page.getByTestId('toast-notification'); 
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/Added to Liked Songs/i);
    
    await toast.click();
    await expect(toast).not.toBeVisible();
  });
});
