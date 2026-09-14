import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Movie } from '@/types/movie'

const FAVOURITES_KEY = 'DEMO_MOVIE_FAVORITES'

const loadFavourites = (): Movie[] => {
  try {
    const stored = localStorage.getItem(FAVOURITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

interface FavouritesContextValue {
  favorites: Movie[]
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (movieId: number) => void
  toggleFavorite: (movie: Movie) => void
  isFavorite: (movieId: number) => boolean
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null)

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(() => loadFavourites())

  const persist = useCallback((movies: Movie[]) => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(movies))
  }, [])

  const addToFavorites = useCallback(
    (movie: Movie) => {
      setFavorites((prev) => {
        if (prev.some((item) => item.id === movie.id)) {
          return prev
        }
        const next = [...prev, movie]
        persist(next)
        return next
      })
    },
    [persist],
  )

  const removeFromFavorites = useCallback(
    (movieId: number) => {
      setFavorites((prev) => {
        const next = prev.filter((movie) => movie.id !== movieId)
        persist(next)
        return next
      })
    },
    [persist],
  )

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      setFavorites((prev) => {
        const exists = prev.some((item) => item.id === movie.id)
        const next = exists
          ? prev.filter((item) => item.id !== movie.id)
          : [...prev, movie]
        persist(next)
        return next
      })
    },
    [persist],
  )

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((movie) => movie.id === movieId),
    [favorites],
  )

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
    }),
    [
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
    ],
  )

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider')
  }
  return context
}
