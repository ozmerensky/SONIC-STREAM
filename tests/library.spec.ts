import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { SidebarPage } from './pages/SidebarPage';

test.describe('Library and Favorites', () => {
  test('should add a song to library when heart is clicked', async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new SidebarPage(page);
    const libraryPage = new LibraryPage(page);

    await homePage.goto();
    await homePage.waitForLoadingToFinish();

    const firstCard = homePage.trackCards.first();
    await firstCard.getByRole('button', { name: /add to liked/i }).click();

    await sidebar.libraryLink.click();
    
    await expect(libraryPage.trackCards).toHaveCount(1);
    
    await libraryPage.trackCards.first().getByRole('button', { name: /remove from liked|liked/i }).click();
    await expect(libraryPage.trackCards).toHaveCount(0);
    await expect(libraryPage.emptyMessage).toBeVisible();
  });

  test('should show and dismiss toast notification', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.waitForLoadingToFinish();

    await homePage.trackCards.first().getByRole('button', { name: /add to liked/i }).click();

    const toast = page.getByTestId('toast-notification');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(/Added to Liked Songs/i);

    await toast.click();
    await expect(toast).not.toBeVisible();
  });
});
