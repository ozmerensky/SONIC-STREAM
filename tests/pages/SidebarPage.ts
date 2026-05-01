import { Page, Locator } from '@playwright/test';

export class SidebarPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly searchLink: Locator;
  readonly libraryLink: Locator;
  readonly createPlaylistBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.getByTestId('sidebar');
    this.logo = page.getByTestId('sidebar-logo');
    this.homeLink = page.getByTestId('nav-item-home');
    this.searchLink = page.getByTestId('nav-item-search');
    this.libraryLink = page.getByTestId('nav-item-your library');
    this.createPlaylistBtn = page.getByRole('button', { name: /create playlist/i });
  }

  async navigateTo(item: 'home' | 'search' | 'library') {
    const nav = {
      home: this.homeLink,
      search: this.searchLink,
      library: this.libraryLink
    };
    await nav[item].click();
  }

  getPlaylistLink(name: string) {
    return this.page.getByRole('link', { name: name, exact: true });
  }
}
