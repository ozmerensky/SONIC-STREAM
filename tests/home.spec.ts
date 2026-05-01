import { test, expect } from './fixtures';

test.describe('Initial Infrastructure Check', () => {
  
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load the home page and display the title', async ({ homePage }) => {
    await expect(homePage.pageTitle).toBeVisible();
  });

  test('should render the mock tracks from JSON', async ({ homePage }) => {
    await expect(homePage.trackCards).toHaveCount(3);
  });
});
