import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import PlaylistCard from '@/components/PlaylistCard'
import { usePlaylists } from '@/context/playlists'

function Playlist() {
  const { playlists, addPlaylist, renamePlaylist } = usePlaylists()
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
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Playlist
        </Typography>

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
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onEdit={handleOpenEditDialog}
          />
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
