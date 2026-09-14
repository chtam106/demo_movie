import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import MovieCard from '@/components/MovieCard'
import { usePlaylists } from '@/context/playlists'
import type { Playlist } from '@/types/playlist'

interface PlaylistCardProps {
  playlist: Playlist
  onEdit: (playlistId: string, currentName: string) => void
}

function PlaylistCard({ playlist, onEdit }: PlaylistCardProps) {
  const { removePlaylist, isDefaultPlaylist } = usePlaylists()

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" component="h2">
            {playlist.name}
          </Typography>
          <Typography color="text.secondary">
            {playlist.movies.length} phim
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isDefaultPlaylist(playlist.id) && (
            <IconButton
              aria-label={`Sửa tên playlist ${playlist.name}`}
              onClick={() => onEdit(playlist.id, playlist.name)}
            >
              <EditIcon />
            </IconButton>
          )}

          {!isDefaultPlaylist(playlist.id) && (
            <IconButton
              color="error"
              aria-label={`Xóa playlist ${playlist.name}`}
              onClick={() => removePlaylist(playlist.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {playlist.movies.length === 0 ? (
        <Typography color="text.secondary">
          Chưa có phim trong playlist này.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {playlist.movies.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MovieCard movie={movie} playlistId={playlist.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  )
}

export default PlaylistCard
