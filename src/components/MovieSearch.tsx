import SearchIcon from '@mui/icons-material/Search'
import { CircularProgress, InputAdornment, TextField } from '@mui/material'

interface MovieSearchProps {
  value: string
  loading?: boolean
  onChange: (value: string) => void
}

function MovieSearch({ value, loading = false, onChange }: MovieSearchProps) {
  return (
    <TextField
      fullWidth
      placeholder="Tìm kiếm phim..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  )
}

export default MovieSearch
