import { Container, Grid, Typography } from '@mui/material'
import MovieCard from '../components/MovieCard'
import { useFavourites } from '../context/favourites'

function Favourites() {
  const { favorites } = useFavourites()

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Phim yêu thích
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Chưa có phim yêu thích. Nhấn biểu tượng trái tim trên trang Home để thêm phim.
        </Typography>
      ) : (
        <>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {favorites.length} phim trong danh sách yêu thích
          </Typography>

          <Grid container spacing={3}>
            {favorites.map((movie) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  )
}

export default Favourites
