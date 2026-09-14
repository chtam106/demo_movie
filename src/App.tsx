import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Favourites from './pages/Favourites'
import Home from './pages/Home'

function AppNav() {
  const location = useLocation()

  const currentTab = location.pathname === '/favourites' ? '/favourites' : '/'

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Demo Movie
        </Typography>
        <Tabs
          value={currentTab}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ minHeight: 48 }}
        >
          <Tab
            label="Home"
            value="/"
            component={NavLink}
            to="/"
            sx={{ color: 'inherit' }}
          />
          <Tab
            label="Favourites"
            value="/favourites"
            component={NavLink}
            to="/favourites"
            sx={{ color: 'inherit' }}
          />
        </Tabs>
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
        </Routes>
      </Container>
    </Box>
  )
}

export default App
