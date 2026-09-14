import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import MovieSearch from '@/components/MovieSearch'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { getPopularMovies, searchMovies } from '@/services/movies'
import type { Movie } from '@/types/movie'

function Home() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query.trim(), 400)
  const [movies, setMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSearching = debouncedQuery.length > 0

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setPopularMovies(data)
        setMovies(data)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setInitialLoading(false))
  }, [])

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies(popularMovies)
      setSearching(false)
      return
    }

    let ignore = false
    setSearching(true)
    setError(null)

    searchMovies(debouncedQuery)
      .then((data) => {
        if (!ignore) {
          setMovies(data)
        }
      })
      .catch((err: Error) => {
        if (!ignore) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!ignore) {
          setSearching(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [debouncedQuery, popularMovies])

  if (initialLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {isSearching ? 'Kết quả tìm kiếm' : 'Phim phổ biến'}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {isSearching
          ? `Tìm thấy ${movies.length} phim cho "${debouncedQuery}"`
          : 'Danh sách phim đang được xem nhiều nhất từ TMDB'}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <MovieSearch value={query} loading={searching} onChange={setQuery} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!error && movies.length === 0 ? (
        <Typography color="text.secondary">
          {isSearching ? 'Không tìm thấy phim nào.' : 'Không có phim để hiển thị.'}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Home
