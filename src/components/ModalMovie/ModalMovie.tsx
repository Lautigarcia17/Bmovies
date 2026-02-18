import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useMovieApi } from "../../hooks/useMovieApi";
import { useRating } from "../../hooks/useRating";
import { Movie as MovieType } from "../../types/interface";
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
} from '@mui/material';
import { Close, Save, Search, Star, Movie } from '@mui/icons-material';

function ModalMovie({ show, handleModal }: { show: boolean, handleModal: () => void }) {

  const { movies, setMovies, findMovies, findMovieById, getMovieDetails } = useMovieApi();
  const { idSession } = useGenericContext(authContext);
  const { rating, setRatingFromValue, handleValidationRating } = useRating();
  const { saveMovie } = useGenericContext(movieContext)

  const [urlTrailer, setUrlTrailer] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [imdbIDOption, setImdbIDOption] = useState<string>('');
  const [showSearchByTitle, setShowSearchByTitle] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelectMovie = (movie: MovieType) => {
    setSelectedMovie(movie);
    setMovies([]);
  };

  const handleFindMovie = async (value: string) => {
    if (value && value.trim().length > 0) {
      findMovies(value);
    }
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
    setSelectedMovie(null);
    setSearchTerm('');
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
    setSearchTerm('');
  }, [show])

  return (
    <Dialog
      open={show}
      onClose={handleModal}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(15, 25, 40, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 4,
          maxHeight: '90vh',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          color: 'primary.main',
          borderBottom: '2px solid',
          borderColor: 'rgba(253, 224, 211, 0.2)',
          py: 3,
          px: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'rgba(253, 224, 211, 0.15)',
            border: '2px solid',
            borderColor: 'primary.main',
          }}>
            <Movie sx={{ fontSize: 22, color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Add New Movie
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Search and add movies to your collection
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleModal}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: '#ff3e26',
              backgroundColor: 'rgba(255, 62, 38, 0.1)',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 4, pb: 3, px: 4 }}>
        {selectedMovie ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{
              p: 3,
              borderRadius: 3,
              border: '2px solid rgba(253, 224, 211, 0.2)',
              backgroundColor: 'rgba(253, 224, 211, 0.05)',
            }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 3, fontWeight: 700 }}>
                Movie Details
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ 
                  width: { xs: '100%', sm: 150 },
                  height: { xs: 200, sm: 225 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '3px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 24px rgba(253, 224, 211, 0.2)',
                }}>
                  <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    image={selectedMovie.poster || '/no-poster.svg'}
                    alt={selectedMovie.title}
                    onError={(e: any) => {
                      e.target.src = '/no-poster.svg';
                    }}
                  />
                </Box>
                
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
                      {selectedMovie.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Year: {selectedMovie.year}
                    </Typography>
                  </Box>
                  
                  <TextField
                    fullWidth
                    label="Rating (1-10)"
                    type="number"
                    inputProps={{ min: 1, max: 10, step: 0.1 }}
                    placeholder="6.0"
                    value={rating === null ? '' : rating}
                    onChange={(e) => setRatingFromValue(e.currentTarget.value)}
                    onBlur={handleValidationRating}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(253, 224, 211, 0.05)',
                      },
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Trailer URL (Optional)"
                    type="text"
                    value={urlTrailer === null ? '' : urlTrailer}
                    placeholder="https://youtube.com/watch?v=..."
                    onChange={(e) => setUrlTrailer(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(253, 224, 211, 0.05)',
                      },
                    }}
                  />
                  
                  <Button
                    onClick={() => handleViewOption(showSearchByTitle)}
                    variant="outlined"
                    startIcon={<Search />}
                    sx={{
                      borderColor: 'rgba(253, 224, 211, 0.3)',
                      color: 'text.secondary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      },
                    }}
                  >
                    Search Another Movie
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{
              p: 3,
              borderRadius: 3,
              border: '2px solid rgba(253, 224, 211, 0.2)',
              backgroundColor: 'rgba(253, 224, 211, 0.03)',
              mt: 3,
            }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontWeight: 700 }}>
                Search Movie
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
                sx={{ 
                  mb: 3,
                  '& .MuiToggleButton-root': {
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    border: '2px solid rgba(253, 224, 211, 0.3)',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'background.default',
                      borderColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="title">
                  <Search sx={{ mr: 1, fontSize: 20 }} />
                  Search by Title
                </ToggleButton>
                <ToggleButton value="imdb">
                  <Star sx={{ mr: 1, fontSize: 20 }} />
                  Search by IMDb ID
                </ToggleButton>
              </ToggleButtonGroup>

              {showSearchByTitle ? (
                <TextField
                  fullWidth
                  placeholder="Type movie title..."
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    handleFindMovie(value);
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(253, 224, 211, 0.05)',
                      borderRadius: 3,
                      fontSize: '0.9375rem',
                      py: 0.5,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex' }}>
                        <Search sx={{ color: 'primary.main', fontSize: 20 }} />
                      </Box>
                    ),
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    value={imdbIDOption ?? ''}
                    onChange={(e) => setImdbIDOption(e.target.value)}
                    placeholder="e.g., tt0111161"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(253, 224, 211, 0.05)',
                        borderRadius: 3,
                        fontSize: '0.9375rem',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={(e) => handleFindMovieById(e)}
                    sx={{ 
                      minWidth: 'auto', 
                      px: 3,
                      borderRadius: 3,
                    }}
                  >
                    <Search sx={{ fontSize: 20 }} />
                  </Button>
                </Box>
              )}
            </Box>

            {movies.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3, fontWeight: 700, px: 1 }}>
                  Search Results ({movies.length})
                </Typography>
                <Box sx={{ 
                  maxHeight: 450, 
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'rgba(253, 224, 211, 0.05)',
                    borderRadius: 4,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'primary.main',
                    borderRadius: 4,
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pr: 1, py: 0.5, pl: 0.5 }}>
                    {movies.map((movie: MovieType, index: number) => (
                      <Card
                        key={index}
                        onClick={() => handleSelectMovie(movie)}
                        sx={{
                          display: 'flex',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          backgroundColor: 'rgba(253, 224, 211, 0.03)',
                          border: '2px solid rgba(253, 224, 211, 0.15)',
                          borderRadius: 3,
                          overflow: 'hidden',
                          '&:hover': {
                            backgroundColor: 'rgba(253, 224, 211, 0.1)',
                            borderColor: 'primary.main',
                            boxShadow: '0 8px 24px rgba(253, 224, 211, 0.3)',
                          },
                        }}
                      >
                        <Box sx={{ 
                          width: { xs: 100, sm: 120 },
                          height: { xs: 140, sm: 180 },
                          flexShrink: 0,
                          position: 'relative',
                          overflow: 'hidden',
                        }}>
                          <LazyLoadImage
                            src={movie.poster || '/no-poster.svg'}
                            alt={movie.title}
                            effect='opacity'
                            onError={(e: any) => {
                              e.target.src = '/no-poster.svg';
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                        <CardContent sx={{ 
                          flex: 1, 
                          display: 'flex', 
                          flexDirection: 'column',
                          justifyContent: 'center',
                          py: { xs: 2, sm: 3 },
                          px: { xs: 2, sm: 3 },
                        }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'primary.main',
                              fontWeight: 700,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              mb: 1,
                              lineHeight: 1.3,
                            }}
                          >
                            {movie.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: 'text.secondary',
                              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box component="span" sx={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 2,
                              backgroundColor: 'rgba(253, 224, 211, 0.15)',
                              border: '1px solid',
                              borderColor: 'primary.main',
                              fontWeight: 600,
                            }}>
                              {movie.year}
                            </Box>
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ 
        p: 3, 
        gap: 2, 
        borderTop: '2px solid', 
        borderColor: 'rgba(253, 224, 211, 0.2)',
        justifyContent: 'space-between',
      }}>
        <Button
          onClick={handleModal}
          startIcon={<Close />}
          variant="outlined"
          sx={{
            px: 3,
            py: 1.25,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 3,
            borderColor: 'rgba(253, 224, 211, 0.3)',
            color: 'text.secondary',
            '&:hover': {
              borderColor: '#ff3e26',
              color: '#ff3e26',
              backgroundColor: 'rgba(255, 62, 38, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          startIcon={<Save />}
          variant="contained"
          disabled={!selectedMovie}
          sx={{
            px: 4,
            py: 1.25,
            fontSize: '0.875rem',
            fontWeight: 700,
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(253, 224, 211, 0.3)',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(253, 224, 211, 0.45)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(253, 224, 211, 0.1)',
              color: 'rgba(253, 224, 211, 0.3)',
            },
          }}
        >
          Save Movie
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMovie;
