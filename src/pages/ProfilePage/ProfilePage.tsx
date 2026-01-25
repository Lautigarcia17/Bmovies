import { authContext } from "../../context/AuthContext"
import { useGenericContext } from "../../hooks/useGenericContext"
import { useStatistics } from '../../hooks/useStatistics';
import { movieContext } from '../../context/MovieContext';
import { Container, Box, Typography, Grid, Paper, LinearProgress, Stack, Chip } from '@mui/material';
import { CalendarToday, Category, Star, DateRange, TodayOutlined, Movie } from '@mui/icons-material';

function ProfilePage() {

    const { userData } = useGenericContext(authContext);
    const { listMovies } = useGenericContext(movieContext)
    const { moviesWatched, moviesToWatch, moviesPerYear, moviesByGenre, moviesByRating, moviesByDecade, moviesByMonth, currentYearOfMonth } = useStatistics(listMovies)

    const totalMovies = moviesWatched + moviesToWatch;
    const watchedPercentage = totalMovies > 0 ? (moviesWatched / totalMovies) * 100 : 0;

    return (
        <Box sx={{ minHeight: '100vh', py: 6, px: 2 }}>
            <Container maxWidth="xl">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 4,
                        background: 'linear-gradient(135deg, rgba(253, 224, 211, 0.15) 0%, rgba(6, 13, 23, 0.95) 100%)',
                        border: '1px solid rgba(253, 224, 211, 0.2)',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(253, 224, 211, 0.2) 0%, transparent 70%)',
                        }}
                    />
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Movie sx={{ fontSize: 40, color: 'primary.main' }} />
                            <Typography
                                variant="h3"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 800,
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    letterSpacing: -0.5,
                                }}
                            >
                                {userData?.username}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '1.1rem',
                                mb: 3,
                            }}
                        >
                            Your personal movie collection statistics
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', mb: 1 }}>
                                        Total Movies
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                        {totalMovies}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', mb: 1 }}>
                                        Watched
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: '#26ff3e', fontWeight: 700 }}>
                                        {moviesWatched}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', mb: 1 }}>
                                        To Watch
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: '#ffc226', fontWeight: 700 }}>
                                        {moviesToWatch}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                                    Progress
                                </Typography>
                                <Typography sx={{ color: 'primary.main', fontSize: '0.85rem', fontWeight: 600 }}>
                                    {watchedPercentage.toFixed(1)}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={watchedPercentage}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: 'primary.main',
                                        borderRadius: 5,
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: 'rgba(6, 13, 23, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(253, 224, 211, 0.2)',
                                borderRadius: 3,
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <CalendarToday sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    Movies Per Year
                                </Typography>
                            </Box>
                            <Stack spacing={2}>
                                {moviesPerYear.slice(0, 5).map(([year, count]: [string, number]) => (
                                    <Box key={year}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>
                                                {year}
                                            </Typography>
                                            <Typography sx={{ color: 'primary.main', fontWeight: 700 }}>
                                                {count}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(count / Math.max(...moviesPerYear.map(([, c]) => c as number))) * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 'primary.main',
                                                    borderRadius: 4,
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: 'rgba(6, 13, 23, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(253, 224, 211, 0.2)',
                                borderRadius: 3,
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Star sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    Movies By Rating
                                </Typography>
                            </Box>
                            <Stack spacing={2}>
                                {moviesByRating.slice(0, 5).map(({ rating, count }: { rating: number, count: number }) => (
                                    <Box key={rating}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>
                                                Rating {rating}
                                            </Typography>
                                            <Typography sx={{ color: 'primary.main', fontWeight: 700 }}>
                                                {count}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(count / Math.max(...moviesByRating.map(r => r.count))) * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 'primary.main',
                                                    borderRadius: 4,
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: 'rgba(6, 13, 23, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(253, 224, 211, 0.2)',
                                borderRadius: 3,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Category sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    Movies By Genre
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {Object.entries(moviesByGenre as Record<string, number>).map(([genre, count]) => (
                                    <Chip
                                        key={genre}
                                        label={`${genre} (${count})`}
                                        sx={{
                                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                            color: 'text.primary',
                                            border: '1px solid rgba(253, 224, 211, 0.3)',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            py: 2.5,
                                            '&:hover': {
                                                backgroundColor: 'rgba(253, 224, 211, 0.25)',
                                                borderColor: 'primary.main',
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: 'rgba(6, 13, 23, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(253, 224, 211, 0.2)',
                                borderRadius: 3,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <DateRange sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    Movies By Decade
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {Object.entries(moviesByDecade as Record<string, number>).map(([decade, count]) => (
                                    <Chip
                                        key={decade}
                                        label={`${decade} (${count})`}
                                        sx={{
                                            backgroundColor: 'rgba(253, 224, 211, 0.15)',
                                            color: 'text.primary',
                                            border: '1px solid rgba(253, 224, 211, 0.3)',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            py: 2.5,
                                            '&:hover': {
                                                backgroundColor: 'rgba(253, 224, 211, 0.25)',
                                                borderColor: 'primary.main',
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: 'rgba(6, 13, 23, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(253, 224, 211, 0.2)',
                                borderRadius: 3,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <TodayOutlined sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    Movies Per Month ({currentYearOfMonth})
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                {Object.entries(moviesByMonth as Record<string, number>).map(([month, count]) => (
                                    <Grid item xs={6} sm={4} md={3} lg={2} key={month}>
                                        <Box
                                            sx={{
                                                textAlign: 'center',
                                                p: 2,
                                                borderRadius: 2,
                                                backgroundColor: 'rgba(253, 224, 211, 0.05)',
                                                border: '1px solid rgba(253, 224, 211, 0.15)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                                    borderColor: 'primary.main',
                                                    transform: 'translateY(-4px)',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'text.primary',
                                                    fontWeight: 600,
                                                    fontSize: '0.9rem',
                                                    mb: 1,
                                                }}
                                            >
                                                {month}
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {count}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ProfilePage