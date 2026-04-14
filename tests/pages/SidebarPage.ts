import { Page, Locator } from '@playwright/test';

export class SidebarPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly searchLink: Locator;
  readonly libraryLink: Locator;
  readonly createPlaylistBtn: Locator;
  readonly playlistSectionTitle: Locator;
  readonly mainContent: Locator; 
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.getByTestId('sidebar');
    this.logo = page.getByTestId('sidebar-logo');
    this.homeLink = page.getByTestId('nav-item-home');
    this.searchLink = page.getByTestId('nav-item-search');
    this.libraryLink = page.getByTestId('nav-item-your library');
    this.createPlaylistBtn = page.getByRole('button', { name: /create playlist/i });
    this.playlistSectionTitle = page.getByText('Playlists');
    this.mainContent = page.getByTestId('main-content');
    this.pageTitle = this.mainContent.getByRole('heading', { name: 'Sonic Stream' });
  }

  async clickHome() {
    await this.homeLink.click();
  }

  async clickSearch() {
    await this.searchLink.click();
  }
}
