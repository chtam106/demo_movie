export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export const getPosterUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : undefined
