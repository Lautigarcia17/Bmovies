import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useMovieApi } from "../../hooks/useMovieApi";
import { useRating } from "../../hooks/useRating";
import { Movie } from "../../types/interface";
import { movieContext } from "../../context/MovieContext";
import { authContext } from "../../context/AuthContext";
import { useGenericContext } from "../../hooks/useGenericContext";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Add, Close, Save, Search } from '@mui/icons-material';

function ModalMovie({ show, handleModal }: { show: boolean, handleModal: () => void }) {

  const { movies, setMovies, findMovies, findMovieById, getMovieDetails } = useMovieApi();
  const { idSession } = useGenericContext(authContext);
  const { rating, setRatingFromValue, handleValidationRating } = useRating();
  const { saveMovie } = useGenericContext(movieContext)

  const [urlTrailer, setUrlTrailer] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [imdbIDOption, setImdbIDOption] = useState<string>('');
  const [showSearchByTitle, setShowSearchByTitle] = useState<boolean>(true);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setMovies([]);
  };

  const handleFindMovie = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    findMovies(e.currentTarget.value)
  }

  const handleFindMovieById = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imdbIDOption) {
      findMovieById(imdbIDOption)
    }
  }

  const handleSave = async () => {
    if (selectedMovie) {
      toast.promise((async () => {
        const movieData = await getMovieDetails(selectedMovie.title, selectedMovie.year ?? null);
        if (movieData) {
          movieData.trailer = urlTrailer;
          movieData.rating = rating;
          movieData.user_id = idSession ?? '';
          movieData.created_at = new Date()

          await saveMovie(movieData);
        }

        setSelectedMovie(null);
        setMovies([]);
        setUrlTrailer(null)
        setRatingFromValue(null);
      })(),
        {
          loading: 'Saving ...',
          success: 'Saved successfully!',
          error: (err) => {
            return err.message
          }
        }
      );
    }
    handleModal();
  };

  const handleViewOption = (state: boolean) => {
    setShowSearchByTitle(state)
    setMovies([]);
    setImdbIDOption('');
    setSelectedMovie(null)
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }

    setMovies([]);
    setRatingFromValue(null);
    setUrlTrailer(null);
    setShowSearchByTitle(true);
    setImdbIDOption('');
  }, [show])

  return (
    <Dialog
      open={show}
      onClose={handleModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          border: '2px solid',
          borderColor: 'primary.main',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'primary.main',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Add />
        Add Movie
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {selectedMovie ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Rating"
              type="number"
              inputProps={{ min: 1, max: 10, step: 0.1 }}
              placeholder="6"
              value={rating === null ? '' : rating}
              onChange={(e) => setRatingFromValue(e.currentTarget.value)}
              onBlur={handleValidationRating}
              variant="outlined"
            />

            <Card
              sx={{
                display: 'flex',
                position: 'relative',
                backgroundColor: 'rgba(253, 224, 211, 0.05)',
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 100, objectFit: 'cover' }}
                image={selectedMovie.poster}
                alt={selectedMovie.title}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  {selectedMovie.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selectedMovie.year}
                </Typography>
              </CardContent>
              <IconButton
                onClick={() => handleViewOption(showSearchByTitle)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              >
                <Close />
              </IconButton>
            </Card>

            <TextField
              fullWidth
              label="Trailer URL"
              type="text"
              value={urlTrailer === null ? '' : urlTrailer}
              placeholder="https://youtube.com/..."
              onChange={(e) => setUrlTrailer(e.target.value)}
              variant="outlined"
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                Select Movie:
              </Typography>
              <ToggleButtonGroup
                value={showSearchByTitle ? 'title' : 'imdb'}
                exclusive
                onChange={(_, value) => {
                  if (value !== null) {
                    handleViewOption(value === 'title');
                  }
                }}
                fullWidth
                sx={{ mb: 2 }}
              >
                <ToggleButton value="title">By Title</ToggleButton>
                <ToggleButton value="imdb">By IMDb ID</ToggleButton>
              </ToggleButtonGroup>

              {showSearchByTitle ? (
                <TextField
                  fullWidth
                  placeholder="Search by title..."
                  autoComplete="off"
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleFindMovie(e)}
                  variant="outlined"
                />
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    value={imdbIDOption ?? ''}
                    onChange={(e) => setImdbIDOption(e.target.value)}
                    placeholder="Enter IMDb ID..."
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    onClick={(e) => handleFindMovieById(e)}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    <Search />
                  </Button>
                </Box>
              )}
            </Box>

            <Divider />

            <Box sx={{ maxHeight: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {movies.map((movie: Movie, index: number) => (
                <Card
                  key={index}
                  onClick={() => handleSelectMovie(movie)}
                  sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(253, 224, 211, 0.1)',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <CardMedia
                    component={LazyLoadImage}
                    sx={{ width: 80, objectFit: 'cover' }}
                    image={movie.poster}
                    alt={movie.title}
                    effect='opacity'
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {movie.year}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          onClick={handleModal}
          startIcon={<Close />}
          variant="outlined"
          color="secondary"
        >
          Close
        </Button>
        <Button
          onClick={handleSave}
          startIcon={<Save />}
          variant="contained"
          color="primary"
          disabled={!selectedMovie}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMovie;
