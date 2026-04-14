import { test, expect } from '@playwright/test';
import { SidebarPage } from './pages/SidebarPage';

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
});
