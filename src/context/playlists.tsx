import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Movie } from '../types/movie'
import {
  WATCH_LATER_ID,
  WATCH_LATER_NAME,
  type Playlist,
} from '../types/playlist'

const PLAYLISTS_KEY = 'demo_movie_playlists'

const createWatchLater = (): Playlist => ({
  id: WATCH_LATER_ID,
  name: WATCH_LATER_NAME,
  movies: [],
})

const normalizePlaylists = (playlists: Playlist[]): Playlist[] => {
  const watchLater = playlists.find((playlist) => playlist.id === WATCH_LATER_ID)

  const others = playlists.filter((playlist) => playlist.id !== WATCH_LATER_ID)

  return [
    watchLater
      ? { ...watchLater, name: WATCH_LATER_NAME }
      : createWatchLater(),
    ...others,
  ]
}

const loadPlaylists = (): Playlist[] => {
  try {
    const stored = localStorage.getItem(PLAYLISTS_KEY)
    if (!stored) {
      return [createWatchLater()]
    }

    return normalizePlaylists(JSON.parse(stored))
  } catch {
    return [createWatchLater()]
  }
}

interface PlaylistsContextValue {
  playlists: Playlist[]
  addPlaylist: (name: string) => void
  createPlaylistWithMovie: (name: string, movie: Movie) => boolean
  renamePlaylist: (playlistId: string, name: string) => boolean
  removePlaylist: (playlistId: string) => void
  addMovieToPlaylist: (playlistId: string, movie: Movie) => void
  removeMovieFromPlaylist: (playlistId: string, movieId: number) => void
  toggleMovieInPlaylist: (playlistId: string, movie: Movie) => void
  isMovieInPlaylist: (playlistId: string, movieId: number) => boolean
  isDefaultPlaylist: (playlistId: string) => boolean
}

const PlaylistsContext = createContext<PlaylistsContextValue | null>(null)

export function PlaylistsProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => loadPlaylists())

  const persist = useCallback((next: Playlist[]) => {
    const normalized = normalizePlaylists(next)
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(normalized))
    return normalized
  }, [])

  const addPlaylist = useCallback(
    (name: string) => {
      const trimmed = name.trim()
      if (!trimmed) {
        return
      }

      setPlaylists((prev) => {
        const exists = prev.some(
          (playlist) => playlist.name.toLowerCase() === trimmed.toLowerCase(),
        )
        if (exists) {
          return prev
        }

        const next = persist([
          ...prev,
          {
            id: crypto.randomUUID(),
            name: trimmed,
            movies: [],
          },
        ])
        return next
      })
    },
    [persist],
  )

  const createPlaylistWithMovie = useCallback(
    (name: string, movie: Movie) => {
      const trimmed = name.trim()
      if (!trimmed) {
        return false
      }

      let created = false

      setPlaylists((prev) => {
        const exists = prev.some(
          (playlist) => playlist.name.toLowerCase() === trimmed.toLowerCase(),
        )
        if (exists) {
          return prev
        }

        created = true
        const next = persist([
          ...prev,
          {
            id: crypto.randomUUID(),
            name: trimmed,
            movies: [movie],
          },
        ])
        return next
      })

      return created
    },
    [persist],
  )

  const renamePlaylist = useCallback(
    (playlistId: string, name: string) => {
      if (playlistId === WATCH_LATER_ID) {
        return false
      }

      const trimmed = name.trim()
      if (!trimmed) {
        return false
      }

      let renamed = false

      setPlaylists((prev) => {
        const current = prev.find((playlist) => playlist.id === playlistId)
        if (!current || current.name === trimmed) {
          return prev
        }

        const exists = prev.some(
          (playlist) =>
            playlist.id !== playlistId &&
            playlist.name.toLowerCase() === trimmed.toLowerCase(),
        )
        if (exists) {
          return prev
        }

        renamed = true
        const next = persist(
          prev.map((playlist) =>
            playlist.id === playlistId ? { ...playlist, name: trimmed } : playlist,
          ),
        )
        return next
      })

      return renamed
    },
    [persist],
  )

  const removePlaylist = useCallback(
    (playlistId: string) => {
      if (playlistId === WATCH_LATER_ID) {
        return
      }

      setPlaylists((prev) => {
        const next = persist(prev.filter((playlist) => playlist.id !== playlistId))
        return next
      })
    },
    [persist],
  )

  const addMovieToPlaylist = useCallback(
    (playlistId: string, movie: Movie) => {
      setPlaylists((prev) => {
        const next = persist(
          prev.map((playlist) => {
            if (playlist.id !== playlistId) {
              return playlist
            }

            if (playlist.movies.some((item) => item.id === movie.id)) {
              return playlist
            }

            return {
              ...playlist,
              movies: [...playlist.movies, movie],
            }
          }),
        )
        return next
      })
    },
    [persist],
  )

  const removeMovieFromPlaylist = useCallback(
    (playlistId: string, movieId: number) => {
      setPlaylists((prev) => {
        const next = persist(
          prev.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  movies: playlist.movies.filter((movie) => movie.id !== movieId),
                }
              : playlist,
          ),
        )
        return next
      })
    },
    [persist],
  )

  const toggleMovieInPlaylist = useCallback(
    (playlistId: string, movie: Movie) => {
      setPlaylists((prev) => {
        const next = persist(
          prev.map((playlist) => {
            if (playlist.id !== playlistId) {
              return playlist
            }

            const exists = playlist.movies.some((item) => item.id === movie.id)
            return {
              ...playlist,
              movies: exists
                ? playlist.movies.filter((item) => item.id !== movie.id)
                : [...playlist.movies, movie],
            }
          }),
        )
        return next
      })
    },
    [persist],
  )

  const isMovieInPlaylist = useCallback(
    (playlistId: string, movieId: number) =>
      playlists
        .find((playlist) => playlist.id === playlistId)
        ?.movies.some((movie) => movie.id === movieId) ?? false,
    [playlists],
  )

  const isDefaultPlaylist = useCallback(
    (playlistId: string) => playlistId === WATCH_LATER_ID,
    [],
  )

  const value = useMemo(
    () => ({
      playlists,
      addPlaylist,
      createPlaylistWithMovie,
      renamePlaylist,
      removePlaylist,
      addMovieToPlaylist,
      removeMovieFromPlaylist,
      toggleMovieInPlaylist,
      isMovieInPlaylist,
      isDefaultPlaylist,
    }),
    [
      playlists,
      addPlaylist,
      createPlaylistWithMovie,
      renamePlaylist,
      removePlaylist,
      addMovieToPlaylist,
      removeMovieFromPlaylist,
      toggleMovieInPlaylist,
      isMovieInPlaylist,
      isDefaultPlaylist,
    ],
  )

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  )
}

export function usePlaylists() {
  const context = useContext(PlaylistsContext)
  if (!context) {
    throw new Error('usePlaylists must be used within PlaylistsProvider')
  }
  return context
}
