import { Link } from 'react-router-dom'
import { Movie } from '../../../types/interface'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Grid, Card, Typography, Chip } from '@mui/material';
import { memo } from 'react';

interface MovieListProps {
    movieToDisplay: Array<Movie>;
    fromUsername?: string; // Optional: username to pass in navigation state
}

const MovieList = memo(({ movieToDisplay, fromUsername }: MovieListProps) => {

    const getRatingColor = (rating: number) => {
        if (rating < 5) return '#ff3e26';
        if (rating >= 5 && rating < 6) return '#ffc226';
        return '#26ff3e';
    }
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {movieToDisplay.length !== 0 ? (
                <Grid 
                    container 
                    spacing={{ xs: 2, sm: 3, md: 4 }} 
                    sx={{ 
                        width: '100%',
                        maxWidth: '1800px',
                        px: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    {movieToDisplay.map((movie: Movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={movie.id}>
                            <Card
                                component={Link}
                                to={`/details/${movie.id}`}
                                state={fromUsername ? { fromUsername } : undefined}
                                sx={{
                                    height: { xs: 360, sm: 380, md: 420 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textDecoration: 'none',
                                    position: 'relative',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: '2px solid',
                                    borderColor: 'rgba(253, 224, 211, 0.15)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                                    '&:hover': {
                                        transform: 'translateY(-12px) scale(1.02)',
                                        boxShadow: '0 24px 48px rgba(253, 224, 211, 0.3)',
                                        borderColor: 'primary.main',
                                        zIndex: 10,
                                        '& .movie-overlay': {
                                            background: 'linear-gradient(180deg, rgba(6,13,23,0.2) 0%, rgba(6,13,23,0.8) 50%, rgba(6,13,23,0.98) 100%)',
                                        },
                                        '& .movie-info': {
                                            transform: 'translateY(0)',
                                            opacity: 1,
                                        },
                                        '& .movie-title': {
                                            transform: 'translateY(-8px)',
                                        },
                                        '& .movie-genre': {
                                            opacity: 1,
                                        }
                                    },
                                }}
                            >
                                <LazyLoadImage
                                    src={movie.poster || '/no-poster.svg'}
                                    alt={movie.title}
                                    effect="opacity"
                                    onError={(e: any) => {
                                        e.target.src = '/no-poster.svg';
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        zIndex: 0,
                                    }}
                                />
                                
                                <Box
                                    className="movie-overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(180deg, rgba(6,13,23,0.1) 0%, rgba(6,13,23,0.7) 60%, rgba(6,13,23,0.95) 100%)',
                                        transition: 'background 0.5s ease',
                                        zIndex: 1,
                                    }}
                                />

                                {movie.rating && (
                                    <Chip
                                        label={movie.rating}
                                        sx={{
                                            position: 'absolute',
                                            top: { xs: 12, sm: 16 },
                                            right: { xs: 12, sm: 16 },
                                            backgroundColor: 'rgba(6, 13, 23, 0.95)',
                                            backdropFilter: 'blur(10px)',
                                            color: getRatingColor(movie.rating),
                                            border: `3px solid ${getRatingColor(movie.rating)}`,
                                            fontWeight: 800,
                                            fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.9375rem' },
                                            height: { xs: 34, sm: 38, md: 42 },
                                            minWidth: { xs: 34, sm: 38, md: 42 },
                                            borderRadius: '50%',
                                            zIndex: 3,
                                            boxShadow: `0 0 20px ${getRatingColor(movie.rating)}60, 0 4px 16px rgba(0,0,0,0.5)`,
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                )}

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        zIndex: 2,
                                        p: { xs: 2.5, md: 3 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1.5,
                                    }}
                                >
                                    <Typography 
                                        className="movie-title"
                                        variant="h6" 
                                        component="h2"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 700,
                                            fontSize: { xs: '0.9375rem', md: '1.125rem' },
                                            lineHeight: 1.2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            textShadow: '2px 2px 12px rgba(0,0,0,0.9)',
                                            transition: 'transform 0.4s ease',
                                            mb: 0.5,
                                        }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    
                                    <Box
                                        className="movie-info"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            transform: 'translateY(15px)',
                                            opacity: 0,
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        {movie.genre && (
                                            <Box
                                                className="movie-genre"
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 0.75,
                                                    opacity: 0,
                                                    transition: 'opacity 0.4s ease 0.1s',
                                                }}
                                            >
                                                {movie.genre.split(',').slice(0, 3).map((genre, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={genre.trim()}
                                                        size="small"
                                                        sx={{
                                                        backgroundColor: 'rgba(253, 224, 211, 0.2)',
                                                        color: 'primary.main',
                                                        border: '1px solid',
                                                        borderColor: 'primary.main',
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 600,
                                                        height: 22,
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                        )}
                                        {movie.created_at && (
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    color: 'rgba(226, 234, 236, 0.8)',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                    textShadow: '1px 1px 6px rgba(0,0,0,0.9)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <Box component="span" sx={{ opacity: 0.6 }}>Added:</Box> 
                                                {movie.created_at.getFullYear()}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ 
                    width: '100%', 
                    textAlign: 'center', 
                    py: 10,
                    px: 4,
                }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            color: 'rgba(253, 224, 211, 0.5)',
                            fontWeight: 800,
                            fontSize: { xs: '1.25rem', md: '1.75rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}
                    >
                        No Results Found
                    </Typography>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            mt: 2,
                            fontSize: { xs: '0.8125rem', md: '0.9375rem' },
                        }}
                    >
                        Try adjusting your search or filter criteria
                    </Typography>
                </Box>
            )}
        </Box>
    )
});

export default MovieList;