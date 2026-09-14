import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { useFavourites } from '../context/favourites'
import type { Movie } from '../types/movie'
import { getPosterUrl } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavourites()
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
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
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
      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <IconButton
          color="error"
          aria-label={favorited ? 'Bỏ yêu thích' : 'Yêu thích'}
          onClick={() => toggleFavorite(movie)}
        >
          {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          startIcon={<PlaylistAddIcon />}
          disabled
        >
          Thêm playlist
        </Button>
      </CardActions>
    </Card>
  )
}

export default MovieCard
