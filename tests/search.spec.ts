import { test, expect } from './fixtures';

test.describe('Search Functionality', () => {
  
  test.beforeEach(async ({ homePage, sidebar }) => {
    await homePage.goto();
    await sidebar.navigateTo('search');
  });

  test('should filter tracks based on search input', async ({ searchPage }) => {
    await expect(searchPage.trackCards).toHaveCount(3);

    await test.step('Search for existing track', async () => {
      await searchPage.searchFor('Tears');
      await expect(searchPage.trackCards).toHaveCount(1);
      await expect(searchPage.trackCards.first()).toContainText(/Tears Don't Fall/i);
    });

    await test.step('Search for non-existent track', async () => {
      await searchPage.searchFor('NonExistentSong');
      await expect(searchPage.trackCards).toHaveCount(0);
      await expect(searchPage.noResultsMessage).toBeVisible();
    });
  });
});
