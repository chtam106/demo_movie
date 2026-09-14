import { Box, Container, Grid, Typography } from '@mui/material'
import MovieCard from '../components/MovieCard'
import { useFavourites } from '../context/favourites'

function Favourites() {
  const { favorites } = useFavourites()

  if (favorites.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" component="h1">
          Chưa có phim yêu thích
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Nhấn biểu tượng trái tim trên trang Home để thêm phim.
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Phim yêu thích
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography color="text.secondary">
          {favorites.length} phim trong danh sách yêu thích
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Favourites
