import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useMovieById } from '../../hooks/useMovieById'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import MovieDetails from './MovieDetails/MovieDetails';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Container, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function MoviePage() {
    const { idMovie } = useParams<{ idMovie: string }>();
    const { movie, setMovie, loading, processCompleted } = useMovieById(idMovie || '');
    const navigate = useNavigate();
    const location = useLocation();
    const fromUsername = (location.state as any)?.fromUsername;

    useEffect(() => {
        if (processCompleted && !loading && !movie) {
            toast.error(`Error! movie not found`, { position: 'top-right', duration: 2000 })
            navigate('/');
        }
    }, [movie, processCompleted, loading, navigate])

    return (
        <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', position: 'relative' }}>
            {fromUsername && (
                <Box sx={{ 
                    position: 'absolute',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 32 },
                    zIndex: 1000,
                }}>
                    <Button
                        onClick={() => navigate(`/${fromUsername}`)}
                        startIcon={<ArrowBack />}
                        sx={{
                            backgroundColor: 'rgba(6, 13, 23, 0.85)',
                            backdropFilter: 'blur(10px)',
                            color: 'primary.main',
                            border: '2px solid',
                            borderColor: 'rgba(253, 224, 211, 0.4)',
                            px: { xs: 2, md: 3 },
                            py: { xs: 0.75, md: 1 },
                            borderRadius: '50px',
                            fontWeight: 700,
                            textTransform: 'none',
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(253, 224, 211, 0.1) inset',
                            transition: 'background-color 0.15s ease, border-color 0.15s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                borderColor: 'primary.main',
                            },
                        }}
                    >
                        Back to @{fromUsername}
                    </Button>
                </Box>
            )}
            {loading ? (
                <LoadingSpinner />
            ) : (movie &&
                <MovieDetails movie={movie} setMovie={setMovie} />
            )}
        </Container>
    )
}

export default MoviePage