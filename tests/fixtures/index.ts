import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SidebarPage } from '../pages/SidebarPage';
import { LibraryPage } from '../pages/LibraryPage';
import { PlayerPage } from '../pages/PlayerPage';
import { SearchPage } from '../pages/SearchPage';
import { PlaylistPage } from '../pages/PlaylistPage';

type MyFixtures = {
  homePage: HomePage;
  sidebar: SidebarPage;
  libraryPage: LibraryPage;
  playerPage: PlayerPage;
  searchPage: SearchPage;
  playlistPage: PlaylistPage;
};


export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },
  libraryPage: async ({ page }, use) => {
    await use(new LibraryPage(page));
  },
  playerPage: async ({ page }, use) => {
    await use(new PlayerPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  playlistPage: async ({ page }, use) => {
    await use(new PlaylistPage(page));
  },
});

export { expect } from '@playwright/test';
