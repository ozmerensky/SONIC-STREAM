import { test, expect } from '@playwright/test';
import { SidebarPage } from './pages/SidebarPage';
import { HomePage } from './pages/HomePage';
import { PlayerPage } from './pages/PlayerPage';

test.describe('Sidebar Navigation', () => {
  let sidebar: SidebarPage;

  test.beforeEach(async ({ page }) => {
    sidebar = new SidebarPage(page);
    await page.goto('/');
  });

  test('should have consistent branding in sidebar', async () => {
    await expect(sidebar.logo).toBeVisible();
    await expect(sidebar.logo).toHaveText('Sonic Stream');
  });

  test('should be visible on desktop', async () => {
    await expect(sidebar.sidebar).toBeVisible();
    await expect(sidebar.homeLink).toHaveClass(/active/);
  });

  test('should navigate to search page and update active state', async ({ page }) => {
    await sidebar.clickSearch();
    
    await expect(page).toHaveURL(/\/search/);
    
    await expect(sidebar.searchLink).toHaveClass(/active/);
    await expect(sidebar.homeLink).not.toHaveClass(/active/);
  });

  test('should highlight search when hovered', async () => {
    await sidebar.searchLink.hover();
    await expect(sidebar.searchLink).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('should display library and playlist sections', async () => {
    await test.step('Verify Library link', async () => {
      await expect(sidebar.libraryLink).toBeVisible();
    });

    await test.step('Verify Playlist management', async () => {
      await expect(sidebar.playlistSectionTitle).toBeVisible();
      await expect(sidebar.createPlaylistBtn).toBeEnabled();
    });
  });

  test('should keep music playing when navigating between pages', async ({ page }) => {
    const homePage = new HomePage(page);
    const playerPage = new PlayerPage(page);

    await homePage.playTrackByIndex(0);
    const trackTitle = await playerPage.trackTitle.textContent();

    await sidebar.clickSearch();
    await expect(page).toHaveURL(/\/search/);

    await expect(playerPage.trackTitle).toHaveText(trackTitle!);
    await expect(playerPage.playButton).toHaveAttribute('aria-label', 'Pause');
  });
});
