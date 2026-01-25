import { useState } from 'react';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import ModalMovie from '../../components/ModalMovie/ModalMovie';
import MovieList from './MovieList/MovieList';
import { movieContext } from '../../context/MovieContext';
import { useGenericContext } from '../../hooks/useGenericContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Container, Box, Typography, Fab, Chip, IconButton } from '@mui/material';
import { Add, TrendingUp, Close, FilterAltOff } from '@mui/icons-material';


function MovieListPage() {
    const [show, setShow] = useState<boolean>(false);
    const { listMovies, movieToDisplay, loading, queryFilter, setSearch, manageQuery, search, removeFilter, clearAllFilters } = useGenericContext(movieContext)
    const handleModal = () => setShow(!show);

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

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(180deg, rgba(6,13,23,1) 0%, rgba(15,25,40,1) 100%)',
        }}>
            <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 8 }}>
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: { xs: 4, md: 6 },
                    position: 'relative',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: -40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(253,224,211,0.15) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }} />
                    
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #FDE0D3 0%, #ffffff 50%, #FDE0D3 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textTransform: 'uppercase',
                            letterSpacing: { xs: '2px', md: '4px' },
                            mb: 2,
                            position: 'relative',
                            textShadow: '0 0 80px rgba(253, 224, 211, 0.3)',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -10,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: { xs: '150px', md: '250px' },
                                height: '4px',
                                background: 'linear-gradient(90deg, transparent, #FDE0D3, transparent)',
                                borderRadius: '2px',
                            }
                        }}
                    >
                        My Collection
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(253, 224, 211, 0.7)',
                            fontSize: { xs: '0.875rem', md: '1.125rem' },
                            fontWeight: 400,
                            mb: 4,
                            letterSpacing: '1px',
                        }}
                    >
                        Discover, Track & Enjoy Your Favorite Movies
                    </Typography>

                    <Fab
                        color="primary"
                        onClick={handleModal}
                        sx={{
                            width: { xs: 56, md: 72 },
                            height: { xs: 56, md: 72 },
                            boxShadow: '0 8px 32px rgba(253, 224, 211, 0.4)',
                            border: '3px solid',
                            borderColor: 'background.default',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'scale(1.15) rotate(90deg)',
                                boxShadow: '0 12px 48px rgba(253, 224, 211, 0.6)',
                            },
                        }}
                    >
                        <Add sx={{ fontSize: { xs: 28, md: 36 } }} />
                    </Fab>
                </Box>

                <ModalMovie show={show} handleModal={handleModal} />

                {loading && listMovies.length === 0 ? (
                    <LoadingSpinner />
                ) : listMovies.length > 0 ? (
                    <>
                        <SearchMovie search={search} setSearch={setSearch} />

                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: 3, 
                            mb: { xs: 4, md: 6 },
                            px: { xs: 2, sm: 4, md: 6 },
                            py: 3,
                            backgroundColor: 'rgba(25, 31, 43, 0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 4,
                            border: '1px solid rgba(253, 224, 211, 0.1)',
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'stretch', sm: 'center' },
                                justifyContent: 'space-between',
                                gap: 2,
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                    <Typography sx={{
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        color: 'text.secondary',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                    }}>
                                        Filters:
                                    </Typography>
                                    <DropdownFilter handleQuery={manageQuery} currentFilters={queryFilter} />
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography sx={{
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                    }}>
                                        {movieToDisplay.length} {movieToDisplay.length === 1 ? 'movie' : 'movies'}
                                    </Typography>
                                </Box>
                            </Box>

                            {hasActiveFilters && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: { xs: 1, sm: 1.5 }, 
                                    flexWrap: 'wrap',
                                    pt: 2,
                                    borderTop: '1px solid rgba(253, 224, 211, 0.1)',
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
                        </Box>

                        <MovieList movieToDisplay={movieToDisplay} />
                    </>
                ) : (
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: 3,
                        mt: 10,
                        p: 6,
                        backgroundColor: 'rgba(25, 31, 43, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 4,
                        border: '2px dashed rgba(253, 224, 211, 0.3)',
                    }}>
                        <Box sx={{
                            width: { xs: 80, md: 100 },
                            height: { xs: 80, md: 100 },
                            borderRadius: '50%',
                            backgroundColor: 'rgba(253, 224, 211, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '3px solid',
                            borderColor: 'primary.main',
                        }}>
                            <TrendingUp sx={{ fontSize: { xs: 40, md: 60 }, color: 'primary.main' }} />
                        </Box>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                color: 'primary.main', 
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                fontSize: { xs: '1.5rem', md: '2rem' },
                                textAlign: 'center',
                            }}
                        >
                            Start Your Collection
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                textAlign: 'center',
                                maxWidth: '500px',
                            }}
                        >
                            Click the + button above to add your first movie and begin tracking your favorites!
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default MovieListPage