import { useParams, Navigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Alert, Paper, Chip, IconButton } from '@mui/material';
import { Info, Close, FilterAltOff } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { usePublicProfile } from '../../hooks/usePublicProfile';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import MovieStatsDisplay from '../../components/MovieStatsDisplay/MovieStatsDisplay';
import MovieList from '../MovieListPage/MovieList/MovieList';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import { useGenericContext } from '../../hooks/useGenericContext';
import { authContext } from '../../context/AuthContext';
import { getYearsList } from '../../utilities/getYearList';
import { FilterState } from '../../hooks/useQueryFilter';
import { Movie } from '../../types/interface';
import styles from './PublicProfilePage.module.css';

function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { idSession } = useGenericContext(authContext);
  const { profile, movies, loading, error, statistics } = usePublicProfile(username || '');
  
  // Local state for search and filters
  const [search, setSearch] = useState<string>('');
  const [queryFilter, setQueryFilter] = useState<FilterState>({});

  // Filter management functions
  const manageQuery = (filterType: 'status' | 'year' | 'rating', value: string) => {
    const newFilter = { ...queryFilter };
    if (filterType === 'status' && value === 'all') {
      delete newFilter.status;
    } else {
      newFilter[filterType] = value;
    }
    setQueryFilter(newFilter);
  };

  const removeFilter = (filterType: 'status' | 'year' | 'rating') => {
    const newFilter = { ...queryFilter };
    delete newFilter[filterType];
    setQueryFilter(newFilter);
  };

  const clearAllFilters = () => {
    setQueryFilter({});
  };

  // Filter movies based on search and filters
  const filteredMovies = useMemo(() => {
    if (!movies.length) return [];

    let moviesFiltered: Array<Movie> = [...movies].sort(
      (a: Movie, b: Movie) => 
        new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
    );

    const validYears = getYearsList(2023).map((year) => year.toString());

    // Apply status filter
    if (queryFilter.status) {
      if (queryFilter.status === 'not seen') {
        moviesFiltered = moviesFiltered.filter((movie) => movie.rating === null);
      } else if (queryFilter.status === 'seen') {
        moviesFiltered = moviesFiltered.filter((movie) => movie.rating !== null);
      }
    }

    // Apply year filter
    if (queryFilter.year && validYears.includes(queryFilter.year)) {
      moviesFiltered = moviesFiltered.filter(
        (movie) =>
          movie.created_at?.getFullYear().toString() === queryFilter.year && movie.rating != null
      );
    }

    // Apply rating filter
    if (queryFilter.rating && /^\d{1,2}$/.test(queryFilter.rating)) {
      const rating = parseInt(queryFilter.rating, 10);
      if (rating >= 1 && rating <= 10) {
        moviesFiltered = moviesFiltered.filter(
          (movie) => movie.rating && Math.ceil(movie.rating) === rating
        );
      }
    }

    // Apply search
    if (search) {
      moviesFiltered = moviesFiltered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return moviesFiltered;
  }, [movies, search, queryFilter]);

  const getFilterLabel = (type: 'status' | 'year' | 'rating', value: string): string => {
    if (type === 'status') {
      return value === 'seen' ? 'Watched' : value === 'not seen' ? 'Not Watched' : value;
    }
    if (type === 'year') return `Year: ${value}`;
    if (type === 'rating') return `Rating: ${value}⭐`;
    return value;
  };

  const getFilterColor = (type: 'status' | 'year' | 'rating', value: string) => {
    if (type === 'status') {
      if (value === 'seen') return { bg: 'rgba(38, 255, 62, 0.2)', border: '#26ff3e' };
      if (value === 'not seen') return { bg: 'rgba(255, 62, 38, 0.2)', border: '#ff3e26' };
    }
    if (type === 'rating') {
      const rating = parseInt(value);
      if (rating >= 7) return { bg: 'rgba(38, 255, 62, 0.2)', border: '#26ff3e' };
      if (rating >= 5) return { bg: 'rgba(255, 194, 38, 0.2)', border: '#ffc226' };
      return { bg: 'rgba(255, 62, 38, 0.2)', border: '#ff3e26' };
    }
    return { bg: 'rgba(253, 224, 211, 0.2)', border: 'primary.main' };
  };

  const hasActiveFilters = queryFilter && (queryFilter.status || queryFilter.year || queryFilter.rating);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
        <Typography sx={{ color: 'text.secondary' }}>Loading profile...</Typography>
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert
          severity="error"
          sx={{
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            border: '1px solid rgba(211, 47, 47, 0.3)',
            color: 'text.primary',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            User not found
          </Typography>
          <Typography>
            The user @{username} does not exist or their profile is not available.
          </Typography>
        </Alert>
      </Container>
    );
  }

  // Check if this is the user's own profile
  const isOwnProfile = profile.id === idSession;

  // If viewing own profile via public URL, redirect to /profile
  if (isOwnProfile) {
    return <Navigate to="/profile" replace />;
  }

  const moviesWatched = movies.filter(m => m.rating !== null).length;
  const moviesToWatch = movies.length - moviesWatched;

  return (
    <Box className={styles.pageContainer} sx={{ minHeight: '100vh', py: 6, px: 2 }}>
      <Container maxWidth="xl">
        <ProfileHeader
          profile={profile}
          isOwnProfile={false}
          totalMovies={movies.length}
          moviesWatched={moviesWatched}
          moviesToWatch={moviesToWatch}
        />

        <MovieStatsDisplay statistics={statistics} />

        {movies.length > 0 && (
          <SearchMovie search={search} setSearch={setSearch} />
        )}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mt: 4,
            backgroundColor: 'rgba(6, 13, 23, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(253, 224, 211, 0.2)',
            borderRadius: 3,
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Info sx={{ color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
                Movies ({filteredMovies.length})
              </Typography>
            </Box>

            {movies.length > 0 && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <DropdownFilter handleQuery={manageQuery} currentFilters={queryFilter} />
              </Box>
            )}
          </Box>

          {hasActiveFilters && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 1.5 }, 
              flexWrap: 'wrap',
              pb: 3,
              mb: 3,
              borderBottom: '1px solid rgba(253, 224, 211, 0.1)',
            }}>
              <Typography sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Active:
              </Typography>
              
              {queryFilter.status && (
                <Chip
                  label={getFilterLabel('status', queryFilter.status)}
                  onDelete={() => removeFilter('status')}
                  deleteIcon={<Close />}
                  sx={{
                    backgroundColor: getFilterColor('status', queryFilter.status).bg,
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                    height: { xs: 28, sm: 32, md: 36 },
                    border: '2px solid',
                    borderColor: getFilterColor('status', queryFilter.status).border,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.primary',
                      fontSize: { xs: 16, sm: 18 },
                      '&:hover': {
                        color: getFilterColor('status', queryFilter.status).border,
                      },
                    },
                  }}
                />
              )}
              
              {queryFilter.year && (
                <Chip
                  label={getFilterLabel('year', queryFilter.year)}
                  onDelete={() => removeFilter('year')}
                  deleteIcon={<Close />}
                  sx={{
                    backgroundColor: getFilterColor('year', queryFilter.year).bg,
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                    height: { xs: 28, sm: 32, md: 36 },
                    border: '2px solid',
                    borderColor: getFilterColor('year', queryFilter.year).border,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.primary',
                      fontSize: { xs: 16, sm: 18 },
                      '&:hover': {
                        color: 'primary.main',
                      },
                    },
                  }}
                />
              )}
              
              {queryFilter.rating && (
                <Chip
                  label={getFilterLabel('rating', queryFilter.rating)}
                  onDelete={() => removeFilter('rating')}
                  deleteIcon={<Close />}
                  sx={{
                    backgroundColor: getFilterColor('rating', queryFilter.rating).bg,
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                    height: { xs: 28, sm: 32, md: 36 },
                    border: '2px solid',
                    borderColor: getFilterColor('rating', queryFilter.rating).border,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.primary',
                      fontSize: { xs: 16, sm: 18 },
                      '&:hover': {
                        color: getFilterColor('rating', queryFilter.rating).border,
                      },
                    },
                  }}
                />
              )}
              
              <IconButton
                onClick={clearAllFilters}
                size="small"
                sx={{
                  ml: { xs: 0.5, sm: 1 },
                  color: '#ff3e26',
                  border: '1px solid rgba(255, 62, 38, 0.3)',
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 62, 38, 0.1)',
                    borderColor: '#ff3e26',
                  },
                }}
              >
                <FilterAltOff fontSize="small" />
              </IconButton>
            </Box>
          )}

          <MovieList movieToDisplay={filteredMovies} fromUsername={profile.username} />
        </Paper>
      </Container>
    </Box>
  );
}

export default PublicProfilePage;
