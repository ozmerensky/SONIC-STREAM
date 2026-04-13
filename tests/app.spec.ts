import { test, expect } from '@playwright/test';

test.describe('Initial Infrastructure Check', () => {
  
  test('should load the home page and display the title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Sonic Stream' })).toBeVisible();
  });

  test('should render the mock tracks from JSON', async ({ page }) => {
    await page.goto('/');
    const trackCards = page.getByTestId('track-card');
    await expect(trackCards).toHaveCount(3);
  });
});
