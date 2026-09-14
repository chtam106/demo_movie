import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { useFavourites } from '@/context/favourites'
import { usePlaylists } from '@/context/playlists'
import type { Movie } from '@/types/movie'
import { getPosterUrl } from '@/types/movie'
import AddToPlaylistMenu from './AddToPlaylistMenu'

interface MovieCardProps {
  movie: Movie
  playlistId?: string
}

function MovieCard({ movie, playlistId }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavourites()
  const { removeMovieFromPlaylist } = usePlaylists()
  const favorited = isFavorite(movie.id)
  const posterUrl = getPosterUrl(movie.poster_path)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        height="360"
        image={
          posterUrl ??
          'https://via.placeholder.com/500x750?text=No+Poster'
        }
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {movie.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`⭐ ${movie.vote_average.toFixed(1)}`}
              size="small"
              color="primary"
              variant="outlined"
            />
            {movie.release_date && (
              <Chip label={movie.release_date.slice(0, 4)} size="small" />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <IconButton
              size="small"
              color="error"
              aria-label={favorited ? 'Bỏ yêu thích' : 'Yêu thích'}
              onClick={() => toggleFavorite(movie)}
            >
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            {playlistId ? (
              <IconButton
                size="small"
                color="error"
                aria-label="Xóa khỏi playlist"
                onClick={() => removeMovieFromPlaylist(playlistId, movie.id)}
              >
                <PlaylistRemoveIcon />
              </IconButton>
            ) : (
              <AddToPlaylistMenu movie={movie} />
            )}
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {movie.overview || 'Chưa có mô tả.'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MovieCard
