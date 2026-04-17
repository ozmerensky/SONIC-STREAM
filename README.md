# Sonic Stream

A high-performance music streaming platform inspired by Spotify, built with modern React, robust audio state management, and automated end-to-end testing.

## License

MIT License (see LICENSE in this repository)

## Repository Structure

| Folder / File     | Description                                                                |
|-------------------|----------------------------------------------------------------------------| 
| `src/context/`    | Global state management for audio playback, playlists, and UI state        |
| `src/hooks/`      | Custom hooks for audio engine control and shared UI logic                  |
| `src/pages/`      | Route-based page components for Search, Library, Playlist, and Home        |
| `src/components/` | Reusable UI building blocks like TrackGrid, TrackCard, Player, and Sidebar |
| `tests/`          | Playwright E2E tests and page object abstractions                          |
| `package.json`    | Project dependencies and scripts                                           |
| `vite.config.ts`  | Vite application configuration                                             |

## Technical Decisions & Strategy

- **Context-Driven State Management:** I implemented a centralized `PlayerContext` to coordinate audio playback, favorites, and playlist state. This keeps UI and playback logic synchronized without a backend.
- **Robust Audio Engine:** The `useAudio` hook was designed to handle complex React lifecycle changes, abortable fetches, and ready-state validation so playback transitions stay smooth and reliable.
- **Dynamic Routing & Reusable UI:** The app uses route parameters like `/playlist/:id` for dynamic rendering, while generic components such as `TrackGrid` are reused across multiple views.
- **Strict E2E Reliability:** Playwright tests follow a Page Object Model strategy to isolate UI selectors from flow logic. This reduces flakiness and verifies user journeys end-to-end.
- **Accessibility & Testability:** I used semantic HTML and ARIA labels to make the UI accessible and easier to automate with stable selectors.
- **Feedback-First UX:** A custom Toast system delivers immediate action feedback for playlist edits, favorites, and navigation events.

## Quick Start

Clone the repository:

```bash
git clone https://github.com/ozmerensky/sonic-stream.git
cd sonic-stream
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Run tests:

```bash
npx playwright test
```

## Features

- Priority UI routing for music discovery and playlist management
- Persistent favorites and playlist state across browser sessions
- Responsive TrackGrid layout with rich card interactions
- Global playback control that remains active across pages
- Toast notifications for instant user feedback
- Full Playwright E2E coverage for core user flows

## Testing

This project includes a comprehensive automated testing suite:

- E2E Workflows: Full user journeys from search to library and playlist interactions
- Fast Execution: Optimized Playwright tests for reliable CI runs
- POM Architecture: Page object abstractions keep tests maintainable
- CI-Ready: Designed for automated validation on push and pull request events

## CI (Continuous Integration)

GitHub Actions validate every change with automated tests. The pipeline ensures:

- Playwright validation on Node.js 18
- Regression protection for audio playback and navigation flows
- No merging of broken UI or failing feature branches

## Important Files

- `src/context/PlayerContext.tsx` — application state orchestration for playback and playlists
- `src/hooks/useAudio.ts` — core audio playback lifecycle and control logic
- `src/pages/` — route-driven page components
- `tests/` — Playwright end-to-end test definitions

## Notes

- Built with TypeScript for stronger contract safety
- Uses React 19 and Vite for modern frontend development
- No external backend required for basic UI and audio flow validation
- Focused on maintainable state, test reliability, and responsive user experience
