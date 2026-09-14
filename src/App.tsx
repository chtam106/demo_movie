import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { NavLink, Route, Routes } from 'react-router-dom'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import Playlist from './pages/Playlist'

const navButtonSx = {
  minWidth: 'auto',
  px: 2,
  py: 1,
  borderRadius: 0,
  opacity: 0.75,
  borderBottom: '2px solid transparent',
  '&[aria-current="page"]': {
    opacity: 1,
    fontWeight: 700,
    borderBottomColor: 'secondary.main',
  },
}

function AppNav() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Demo Movie
        </Typography>
        <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            component={NavLink}
            to="/"
            end
            color="inherit"
            sx={navButtonSx}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/favourites"
            color="inherit"
            sx={navButtonSx}
          >
            Favourites
          </Button>
          <Button
            component={NavLink}
            to="/playlist"
            color="inherit"
            sx={navButtonSx}
          >
            Playlist
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppNav />
      <Container maxWidth={false} disableGutters>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
