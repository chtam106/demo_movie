import type { Movie } from './movie'

export const WATCH_LATER_ID = 'watch-later'
export const WATCH_LATER_NAME = 'Watch Later'

export interface Playlist {
  id: string
  name: string
  movies: Movie[]
}
