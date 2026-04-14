import { test, expect } from '@playwright/test';
import { HomePage } from './pages/Home';

test.describe('Initial Infrastructure Check', () => {
  
  test('should load the home page and display the title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    await expect(homePage.pageTitle).toBeVisible();
  });

  test('should render the mock tracks from JSON', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.trackCards).toHaveCount(3);
  });
});
