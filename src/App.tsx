import { NavLink, Route, Routes } from 'react-router-dom'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
    </>
  )
}

export default App
