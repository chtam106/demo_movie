# Demo Movie

A small movie browsing app built with React and TypeScript. Browse popular movies from [TMDB](https://www.themoviedb.org/), search by title, save favourites, and organise movies into playlists — all persisted in the browser via `localStorage`.

## Running locally

### Prerequisites

- **Node.js 20+** (recommended; required by Vite 8)
- **pnpm** ([install guide](https://pnpm.io/installation))
- A [TMDB API key](https://www.themoviedb.org/settings/api) (free)

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/chtam106/demo_movie.git
   cd demo_movie
   pnpm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

   Open the URL shown in the terminal (typically `http://localhost:5173`).

### Other scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm build`     | Type-check and build for production  |
| `pnpm preview`   | Serve the production build locally   |
| `pnpm lint`      | Run Oxlint                           |

## Architecture & decisions

### Stack

| Layer        | Choice              | Why |
| ------------ | ------------------- | --- |
| Framework    | **React 19**        | Familiar, fast to iterate, strong TypeScript support |
| Build tool   | **Vite 8**          | Instant dev server and HMR with minimal config |
| UI           | **Material UI 9**   | Pre-built dark theme, grid, and accessible components — saves time vs custom CSS |
| Routing      | **React Router 7**  | Simple client-side routing for three pages |
| Data fetching| **Native `fetch`**  | No extra dependency; TMDB responses are straightforward JSON |
| State        | **React Context**   | Favourites and playlists are global but small; Context avoids Redux boilerplate |
| Persistence  | **`localStorage`**  | Simple, instant persistence for favourites and playlists without extra infrastructure |

### Project structure

```
src/
  components/     # MovieCard, MovieSearch, AddToPlaylistMenu, PlaylistCard
  context/        # FavouritesProvider, PlaylistsProvider
  hooks/          # useDebouncedValue
  pages/          # Home, Favourites, Playlist
  services/       # TMDB API calls (movies.ts)
  types/          # Movie, Playlist
  theme.ts        # Global MUI theme
```

Cross-folder imports use the `@/` path alias (configured in `vite.config.ts`).

### Key decisions & trade-offs (2-hour limit)

- **Context + localStorage** — Favourites and playlists persist across page reloads with minimal code. Trade-off: data is scoped to the current browser and device.

- **MUI over a custom design system** — Delivers a polished dark UI quickly. Trade-off: larger bundle size and some styling overrides (e.g. removing the default red focus ring on inputs in `theme.ts`).

- **Manual fetch in components/services over React Query / SWR** — Keeps dependencies minimal and logic easy to follow. Trade-off: no request caching, deduplication, or stale-while-revalidate; pagination and search state are managed locally in `Home.tsx`.

- **Debounced search (400 ms) via a small custom hook** — Reduces TMDB API calls while typing without adding a library.

- **"Load more" pagination instead of infinite scroll** — Simpler to implement and test. TMDB returns 20 results per page; the Home page appends the next page on button click for both popular and search results.

- **NavLink buttons instead of MUI Tabs** — Better keyboard tab order and simpler active-state styling.


### Features implemented

- Home: popular movies from TMDB with search and paginated "Load more"
- Favourites: add/remove movies, persisted in `localStorage`
- Playlists: default "Watch Later" playlist, create/rename/delete custom playlists, add/remove movies via a context menu
- Responsive movie grid with poster, rating, year, and action buttons

## If I had more time

**Features**

- Movie detail page (overview, cast, trailer, similar titles)
- Hover effects on movie cards
- Playlist detail page
- Infinite scroll or virtualised list for large result sets

**Refactors & quality**

- **React Query (TanStack Query)** for caching, loading/error states, and pagination helpers
- **Error boundaries** and skeleton loaders for a smoother loading experience
- **Accessibility pass** — focus management in menus, live regions for search results, reduced-motion support
