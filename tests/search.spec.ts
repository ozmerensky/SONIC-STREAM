import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { SidebarPage } from './pages/SidebarPage';

test.describe('Search Functionality', () => {
  test('should filter tracks based on search input', async ({ page }) => {
    const sidebar = new SidebarPage(page);
    const searchPage = new SearchPage(page);

    await page.goto('/');
    await sidebar.clickSearch();

    await expect(searchPage.trackCards).toHaveCount(3);

    await searchPage.searchFor('Tears');
    
    await expect(searchPage.trackCards).toHaveCount(1);
    await expect(searchPage.trackCards.first()).toContainText(/Tears Don't Fall/i);

    await searchPage.searchFor('NonExistentSong');
    await expect(searchPage.trackCards).toHaveCount(0);
    await expect(searchPage.noResultsMessage).toBeVisible();
  });
});
