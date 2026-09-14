import AddIcon from '@mui/icons-material/Add'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { usePlaylists } from '@/context/playlists'
import type { Movie } from '@/types/movie'

interface AddToPlaylistMenuProps {
  movie: Movie
}

function AddToPlaylistMenu({ movie }: AddToPlaylistMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const { playlists, toggleMovieInPlaylist, isMovieInPlaylist, createPlaylistWithMovie } =
    usePlaylists()
  const open = Boolean(anchorEl)

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenCreateDialog = () => {
    setNewPlaylistName('')
    setDialogOpen(true)
  }

  const handleCreatePlaylist = () => {
    const created = createPlaylistWithMovie(newPlaylistName, movie)
    if (!created) {
      return
    }

    setNewPlaylistName('')
    setDialogOpen(false)
    handleCloseMenu()
  }

  return (
    <>
      <IconButton
        size="small"
        color="secondary"
        aria-label="Thêm playlist"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <PlaylistAddIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        {playlists.map((playlist) => {
          const checked = isMovieInPlaylist(playlist.id, movie.id)

          return (
            <MenuItem
              key={playlist.id}
              onClick={() => toggleMovieInPlaylist(playlist.id, movie)}
            >
              <Checkbox checked={checked} size="small" sx={{ p: 0.5, mr: 1 }} />
              <ListItemText primary={playlist.name} />
            </MenuItem>
          )
        })}

        <Divider />

        <MenuItem onClick={handleOpenCreateDialog}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tạo playlist mới" />
        </MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
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
            value={newPlaylistName}
            onChange={(event) => setNewPlaylistName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleCreatePlaylist()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleCreatePlaylist}
            disabled={!newPlaylistName.trim()}
          >
            Tạo và thêm phim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddToPlaylistMenu
