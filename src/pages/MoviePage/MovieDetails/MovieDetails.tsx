import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useGenericContext } from '../../../hooks/useGenericContext'
import { movieContext } from '../../../context/MovieContext'
import { Movie, MovieEdit } from '../../../types/interface'
import DropdownDetail from '../../../components/DropdownDetail/DropdownDetail'
import ModalEdit from '../../../components/ModalEdit/ModalEdit'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import { Box, Typography, Chip, Button } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'



function MovieDetails({ movie, setMovie }: { movie: Movie, setMovie: React.Dispatch<React.SetStateAction<Movie | null>> }) {

    const { removeMovie, modifyMovie } = useGenericContext(movieContext)
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

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

    const handleRemoveClick = () => {
        setShowConfirmDelete(true);
    }

    const handleCancelDelete = () => {
        setShowConfirmDelete(false);
    }

    const handleRemove = async () => {
        setShowConfirmDelete(false);
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
                py: 4,
                backgroundColor: '#060d17',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${movie.poster})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    filter: 'blur(80px) brightness(0.2)',
                    transform: 'scale(1.2)',
                    zIndex: 0,
                }}
            />
            
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(6, 13, 23, 0.9) 0%, rgba(6, 13, 23, 0.7) 100%)',
                    zIndex: 1,
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: 1400,
                    width: '100%',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 4, md: 6 },
                        alignItems: { xs: 'center', md: 'flex-start' },
                    }}
                >
                    <Box
                        sx={{
                            flexShrink: 0,
                            width: { xs: '100%', sm: 350, md: 380 },
                            maxWidth: { xs: 350, sm: 'none' },
                        }}
                    >
                        <Box
                            component="img"
                            src={movie.poster}
                            alt={movie.title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 3,
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(253, 224, 211, 0.1)',
                                border: '1px solid rgba(253, 224, 211, 0.2)',
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                alignItems: 'flex-start',
                                flexDirection: { xs: 'column', sm: 'row' },
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                {movie.title && (
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 800,
                                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                                            lineHeight: 1.1,
                                            letterSpacing: { xs: -0.5, md: -1 },
                                            mb: 2,
                                        }}
                                    >
                                        {movie.title}
                                    </Typography>
                                )}
                                {(movie.year || movie.genre) && (
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                                        {movie.year && (
                                            <Chip
                                                label={movie.year}
                                                sx={{
                                                    backgroundColor: 'transparent',
                                                    color: 'primary.main',
                                                    border: '2px solid',
                                                    borderColor: 'primary.main',
                                                    fontWeight: 700,
                                                    fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                                                    height: { xs: 32, sm: 36, md: 38 },
                                                    px: { xs: 0.5, sm: 1 },
                                                }}
                                            />
                                        )}
                                        {movie.genre && (
                                            <Typography
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1.1rem' },
                                                    fontWeight: 500,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: { xs: 1, md: 2 },
                                                }}
                                            >
                                                {movie.genre}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            {movie.rating && (
                                <Box
                                    sx={{
                                        flexShrink: 0,
                                        width: { xs: 100, sm: 120, md: 140 },
                                        height: { xs: 100, sm: 120, md: 140 },
                                        borderRadius: '50%',
                                        background: `conic-gradient(${getRatingColor(movie.rating)} ${movie.rating * 10}%, rgba(255, 255, 255, 0.1) 0)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 15px 50px ${getRatingColor(movie.rating)}50, 0 0 80px ${getRatingColor(movie.rating)}25`,
                                        alignSelf: { xs: 'center', sm: 'flex-start' },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 80, sm: 100, md: 116 },
                                            height: { xs: 80, sm: 100, md: 116 },
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(6, 13, 23, 0.95)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '3px solid rgba(6, 13, 23, 0.6)',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: getRatingColor(movie.rating),
                                                fontWeight: 900,
                                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                                lineHeight: 1,
                                                textShadow: `0 0 25px ${getRatingColor(movie.rating)}90`,
                                            }}
                                        >
                                            {movie.rating}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                letterSpacing: 2.5,
                                                mt: 0.75,
                                            }}
                                        >
                                            RATING
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        {movie.plot && (
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(253, 224, 211, 0.05)',
                                    border: '1px solid rgba(253, 224, 211, 0.1)',
                                    borderRadius: 2,
                                    p: 3,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontSize: { xs: '1rem', md: '1.15rem' },
                                        lineHeight: 1.8,
                                        fontWeight: 400,
                                    }}
                                >
                                    {movie.plot}
                                </Typography>
                            </Box>
                        )}

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 3,
                                pt: 1,
                            }}
                        >
                            {movie.director && (
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: { xs: 1, md: 2 },
                                            mb: 1,
                                        }}
                                    >
                                        Director
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'text.primary',
                                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
                                            fontWeight: 600,
                                        }}
                                    >
                                        {movie.director}
                                    </Typography>
                                </Box>
                            )}

                            {movie.actors && (
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: { xs: 1, md: 2 },
                                            mb: 1,
                                        }}
                                    >
                                        Cast
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'text.primary',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {movie.actors}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                pt: 2,
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'stretch', sm: 'center' },
                            }}
                        >
                            {movie.trailer && (
                                <Button
                                    variant="contained"
                                    startIcon={<PlayArrow sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />}
                                    href={movie.trailer}
                                    target="_blank"
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: '#060d17',
                                        borderRadius: 2,
                                        px: { xs: 3, sm: 4, md: 5 },
                                        py: { xs: 1.5, sm: 1.75, md: 2 },
                                        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.15rem' },
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: { xs: 1, md: 1.5 },
                                        boxShadow: '0 10px 30px rgba(253, 224, 211, 0.4)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 15px 40px rgba(253, 224, 211, 0.5)',
                                        },
                                    }}
                                >
                                    Watch Trailer
                                </Button>
                            )}
                        </Box>

                        <Box
                            sx={{
                                pt: 3,
                                mt: 2,
                                borderTop: '1px solid rgba(253, 224, 211, 0.1)',
                            }}
                        >
                            <DropdownDetail handleModalEdit={handleModalEdit} handleRemove={handleRemoveClick} />
                        </Box>
                    </Box>
                </Box>

                <ModalEdit show={showEdit} handleModalEdit={handleModalEdit} handleEdit={handleEdit} editData={editData} />
                <ConfirmDialog
                    open={showConfirmDelete}
                    title="Remove Movie?"
                    message={`Are you sure you want to permanently delete "${movie.title}" from your collection?`}
                    onConfirm={handleRemove}
                    onCancel={handleCancelDelete}
                />
            </Box>
        </Box>
    )
}

export default MovieDetails