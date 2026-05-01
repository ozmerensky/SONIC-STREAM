import { test, expect } from './fixtures';

test.describe('Sidebar Navigation', () => {
  
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should have consistent branding in sidebar', async ({ sidebar }) => {
    await expect(sidebar.logo).toBeVisible();
    await expect(sidebar.logo).toHaveText('Sonic Stream');
  });

  test('should be visible on desktop', async ({ sidebar }) => {
    await expect(sidebar.sidebar).toBeVisible();
    await expect(sidebar.homeLink).toHaveClass(/active/);
  });

  test('should navigate to search page and update active state', async ({ page, sidebar }) => {
    await sidebar.navigateTo('search');
    await expect(page).toHaveURL(/\/search/);
    await expect(sidebar.searchLink).toHaveClass(/active/);
    await expect(sidebar.homeLink).not.toHaveClass(/active/);
  });

  test('should highlight search when hovered', async ({ sidebar }) => {
    await sidebar.searchLink.hover();
    await expect(sidebar.searchLink).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('should display library and playlist sections', async ({ sidebar }) => {
    await test.step('Verify Library link', async () => {
      await expect(sidebar.libraryLink).toBeVisible();
    });

    await test.step('Verify Playlist management', async () => {
      await expect(sidebar.createPlaylistBtn).toBeEnabled();
    });
  });

  test('should keep music playing when navigating between pages', async ({ page, homePage, sidebar, playerPage }) => {
    await homePage.playTrackByIndex(0);
    
    await expect(playerPage.playerBar).toBeVisible();
    await expect(playerPage.trackTitle).not.toBeEmpty();
    
    const trackTitle = await playerPage.trackTitle.innerText();
    
    await sidebar.navigateTo('search');
    
    await expect(page).toHaveURL(/\/search/);
    await expect(playerPage.trackTitle).toHaveText(trackTitle);
    await expect(playerPage.playButton).toHaveAttribute('aria-label', /pause/i);
  });
});
