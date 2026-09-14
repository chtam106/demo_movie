import type { Movie } from '@/types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=vi-VN`,
  )

  if (!res.ok) {
    throw new Error('Không thể tải danh sách phim')
  }

  const data = await res.json()
  return data.results
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const trimmed = query.trim()
  if (!trimmed) {
    return []
  }

  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'vi-VN',
    query: trimmed,
  })

  const res = await fetch(`${BASE_URL}/search/movie?${params}`)

  if (!res.ok) {
    throw new Error('Không thể tìm kiếm phim')
  }

  const data = await res.json()
  return data.results
}
