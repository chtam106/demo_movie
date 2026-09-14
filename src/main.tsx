import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { FavouritesProvider } from './context/favourites.tsx'
import { PlaylistsProvider } from './context/playlists.tsx'
import { theme } from './theme.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <FavouritesProvider>
          <PlaylistsProvider>
            <App />
          </PlaylistsProvider>
        </FavouritesProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
