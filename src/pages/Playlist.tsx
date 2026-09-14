import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import { usePlaylists } from '../context/playlists'

function Playlist() {
  const {
    playlists,
    addPlaylist,
    renamePlaylist,
    removePlaylist,
    isDefaultPlaylist,
  } = usePlaylists()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null)
  const [playlistName, setPlaylistName] = useState('')

  const handleOpenCreateDialog = () => {
    setPlaylistName('')
    setCreateDialogOpen(true)
  }

  const handleOpenEditDialog = (playlistId: string, currentName: string) => {
    setEditingPlaylistId(playlistId)
    setPlaylistName(currentName)
    setEditDialogOpen(true)
  }

  const handleCreatePlaylist = () => {
    addPlaylist(playlistName)
    setPlaylistName('')
    setCreateDialogOpen(false)
  }

  const handleRenamePlaylist = () => {
    if (!editingPlaylistId) {
      return
    }

    const renamed = renamePlaylist(editingPlaylistId, playlistName)
    if (!renamed) {
      return
    }

    setPlaylistName('')
    setEditingPlaylistId(null)
    setEditDialogOpen(false)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Playlist
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Quản lý playlist và phim bên trong
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Tạo playlist
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {playlists.map((playlist) => (
          <Paper key={playlist.id} sx={{ p: 3 }}>
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
                    onClick={() => handleOpenEditDialog(playlist.id, playlist.name)}
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
        ))}
      </Box>

      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Tạo playlist mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Tên playlist"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleCreatePlaylist()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleCreatePlaylist}
            disabled={!playlistName.trim()}
          >
            Tạo
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Sửa tên playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Tên playlist"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleRenamePlaylist()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleRenamePlaylist}
            disabled={!playlistName.trim()}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Playlist
