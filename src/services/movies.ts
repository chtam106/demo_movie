import type { Movie } from '@/types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'

export interface MoviesPage {
  results: Movie[]
  page: number
  totalPages: number
}

const fetchMoviesPage = async (
  endpoint: string,
  params: Record<string, string>,
  errorMessage: string,
): Promise<MoviesPage> => {
  const searchParams = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'vi-VN',
    ...params,
  })

  const res = await fetch(`${BASE_URL}/${endpoint}?${searchParams}`)

  if (!res.ok) {
    throw new Error(errorMessage)
  }

  const data = await res.json()

  return {
    results: data.results,
    page: data.page,
    totalPages: data.total_pages,
  }
}

export const getPopularMovies = async (page = 1): Promise<MoviesPage> =>
  fetchMoviesPage(
    'movie/popular',
    { page: String(page) },
    'Không thể tải danh sách phim',
  )

export const searchMovies = async (
  query: string,
  page = 1,
): Promise<MoviesPage> => {
  const trimmed = query.trim()
  if (!trimmed) {
    return { results: [], page: 1, totalPages: 0 }
  }

  return fetchMoviesPage(
    'search/movie',
    { query: trimmed, page: String(page) },
    'Không thể tìm kiếm phim',
  )
}
