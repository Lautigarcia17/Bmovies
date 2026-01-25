import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useGenericContext } from '../../../hooks/useGenericContext'
import { movieContext } from '../../../context/MovieContext'
import { Movie, MovieEdit } from '../../../types/interface'
import DropdownDetail from '../../../components/DropdownDetail/DropdownDetail'
import ModalEdit from '../../../components/ModalEdit/ModalEdit'
import { Box, Paper, Typography, Chip, Button } from '@mui/material'
import { PlayArrow, CalendarToday, TheaterComedy, Movie as MovieIcon } from '@mui/icons-material'



function MovieDetails({ movie, setMovie }: { movie: Movie, setMovie: React.Dispatch<React.SetStateAction<Movie | null>> }) {

    const { removeMovie, modifyMovie } = useGenericContext(movieContext)
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const getRatingColor = (rating: number) => {
        if (rating < 5) return '#ff3e26';
        if (rating >= 5 && rating < 6) return '#ffc226';
        return '#26ff3e';
    };

    const editData: MovieEdit = {
        rating: movie.rating ?? null,
        trailer: movie.trailer ?? null,
    };

    const handleModalEdit = () => {
        setShowEdit(!showEdit);
    }

    const handleRemove = async () => {
        try {
            if (movie.id != '') {
                const response = await removeMovie(movie.id ?? '')

                if (response && response.error) {
                    toast.error(`Error! the movie was not removed`, { position: 'top-right', duration: 2000 })
                }
                else {
                    toast.success(`Congratulations! removed movie`, { position: 'top-right', duration: 2000 })
                    navigate('/');
                }
            }
        } catch (error: any) {
            console.log(error);
            toast.error(`Error! An unexpected error occurred: ${error.message}`, { position: 'top-right', duration: 2000 });
        }
    }

    const handleEdit = async (rating: number | null, trailer: string, isNewMovie: boolean) => {
        try {
            if (movie.id !== '') {
                const response = await modifyMovie(movie.id ?? '', rating, trailer, isNewMovie);

                if (response && response.data) {
                    toast.success(`Congratulations! Movie updated successfully`, { position: 'top-right', duration: 2000 });
                    setMovie(response.data[0]);
                } else {
                    toast.error(`Error! ${response?.error?.message}`, { position: 'top-right', duration: 2000 });
                }

            }
        } catch (error: any) {
            console.error('Update failed:', error);
            toast.error(`Error! An unexpected error occurred: ${error.message}`, { position: 'top-right', duration: 2000 });
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${movie.poster})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                backgroundSize: '10%',
                py: 4,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.5))',
                    top: 0,
                    left: 0,
                }}
            />

            <Paper
                elevation={8}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    maxWidth: 1000,
                    mx: { xs: 2, sm: 4 },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
            >
                <DropdownDetail handleModalEdit={handleModalEdit} handleRemove={handleRemove} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: { xs: 2, md: 3 },
                    }}
                >
                    <Box
                        component="img"
                        src={movie.poster}
                        alt={movie.title}
                        sx={{
                            maxWidth: { xs: 200, sm: 250 },
                            maxHeight: { xs: 300, sm: 370 },
                            borderRadius: 2,
                            boxShadow: 6,
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 2, md: 3 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        position: 'relative',
                    }}
                >
                    {movie.rating && (
                        <Chip
                            label={movie.rating}
                            sx={{
                                position: 'absolute',
                                top: { xs: -10, md: 16 },
                                right: { xs: 8, md: 60 },
                                backgroundColor: 'transparent',
                                color: getRatingColor(movie.rating),
                                border: `4px solid ${getRatingColor(movie.rating)}`,
                                fontWeight: 600,
                                fontSize: '1.75rem',
                                height: 70,
                                minWidth: 70,
                                borderRadius: '50%',
                                zIndex: 5,
                            }}
                        />
                    )}

                    {movie.title && (
                        <Typography
                            variant="h2"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                                mt: { xs: 4, md: 0 },
                            }}
                        >
                            {movie.title}
                        </Typography>
                    )}

                    {(movie.year || movie.genre) && (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                            {movie.year && (
                                <Chip
                                    icon={<CalendarToday sx={{ fontSize: 16 }} />}
                                    label={movie.year}
                                    size="small"
                                    sx={{ backgroundColor: 'rgba(253, 224, 211, 0.2)', color: 'text.primary' }}
                                />
                            )}
                            {movie.genre && (
                                <Chip
                                    icon={<TheaterComedy sx={{ fontSize: 16 }} />}
                                    label={movie.genre}
                                    size="small"
                                    sx={{ backgroundColor: 'rgba(253, 224, 211, 0.2)', color: 'text.primary' }}
                                />
                            )}
                        </Box>
                    )}

                    {movie.director && (
                        <Typography variant="body1" sx={{ color: 'text.primary' }}>
                            <Box component="span" sx={{ opacity: 0.7 }}>🎬 Directed by:</Box>{' '}
                            <Box component="span" sx={{ fontWeight: 500 }}>{movie.director}</Box>
                        </Typography>
                    )}

                    {movie.actors && (
                        <Typography variant="body1" sx={{ color: 'text.primary' }}>
                            <Box component="span" sx={{ opacity: 0.7 }}>🎭 Cast:</Box>{' '}
                            <Box component="span" sx={{ fontWeight: 500 }}>{movie.actors}</Box>
                        </Typography>
                    )}

                    {movie.plot && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                opacity: 0.9,
                                lineHeight: 1.6,
                            }}
                        >
                            📝 {movie.plot}
                        </Typography>
                    )}

                    {movie.trailer && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<PlayArrow />}
                                href={movie.trailer}
                                target="_blank"
                                sx={{
                                    color: 'secondary.main',
                                    borderColor: 'secondary.main',
                                    borderWidth: 2,
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'background.default',
                                        borderWidth: 2,
                                    },
                                    px: 3,
                                    py: 1,
                                    fontSize: '1rem',
                                }}
                            >
                                Watch Trailer
                            </Button>
                        </Box>
                    )}
                </Box>

                <ModalEdit show={showEdit} handleModalEdit={handleModalEdit} handleEdit={handleEdit} editData={editData} />
            </Paper>
        </Box>
    )
}

export default MovieDetails