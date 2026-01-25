import { authContext } from "../../context/AuthContext"
import { useGenericContext } from "../../hooks/useGenericContext"
import { useStatistics } from '../../hooks/useStatistics';
import { movieContext } from '../../context/MovieContext';
import { Container, Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { MovieFilter, Visibility, VisibilityOff, CalendarToday, Category, Star, DateRange, TodayOutlined } from '@mui/icons-material';
import { Carousel } from "react-bootstrap";

function ProfilePage() {

    const { userData } = useGenericContext(authContext);
    const { listMovies } = useGenericContext(movieContext)
    const { moviesWatched, moviesToWatch, moviesPerYear, moviesByGenre, moviesByRating, moviesByDecade, moviesByMonth, currentYearOfMonth } = useStatistics(listMovies)

    return (
        <Container maxWidth="xl" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '3rem' },
                        mb: 2,
                    }}
                >
                    {userData?.username}
                </Typography>
                
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                border: '1px solid',
                                borderColor: 'primary.main',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                    <Visibility sx={{ color: 'success.main' }} />
                                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                                        Movies Watched
                                    </Typography>
                                </Box>
                                <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    {moviesWatched}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(253, 224, 211, 0.1)',
                                border: '1px solid',
                                borderColor: 'primary.main',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                    <VisibilityOff sx={{ color: 'warning.main' }} />
                                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                                        To Watch
                                    </Typography>
                                </Box>
                                <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                    {moviesToWatch}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'rgba(253, 224, 211, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <CalendarToday sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                Movies Seen Per Year
                            </Typography>
                        </Box>
                        <Carousel>
                            {moviesPerYear.map(([year, count]: [string, number]) => (
                                <Carousel.Item key={year} interval={3000}>
                                    <Box
                                        sx={{
                                            minHeight: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                            {year}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 1 }}>
                                            {count} movie(s)
                                        </Typography>
                                    </Box>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'rgba(253, 224, 211, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Category sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                Movies By Genre
                            </Typography>
                        </Box>
                        <Carousel>
                            {Object.entries(moviesByGenre as Record<string, number>).map(([genre, count]) => (
                                <Carousel.Item key={genre} interval={3000}>
                                    <Box
                                        sx={{
                                            minHeight: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                            {genre}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 1 }}>
                                            {count} movie(s)
                                        </Typography>
                                    </Box>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'rgba(253, 224, 211, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Star sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                Movies By Rating
                            </Typography>
                        </Box>
                        <Carousel>
                            {moviesByRating.map(({ rating, count }: { rating: number, count: number }) => (
                                <Carousel.Item key={rating} interval={3000}>
                                    <Box
                                        sx={{
                                            minHeight: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                            {rating}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 1 }}>
                                            {count} movie(s)
                                        </Typography>
                                    </Box>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'rgba(253, 224, 211, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <DateRange sx={{ color: 'primary.main' }} />
                            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                Movies By Decade
                            </Typography>
                        </Box>
                        <Carousel>
                            {Object.entries(moviesByDecade as Record<string, number>).map(([decade, count]) => (
                                <Carousel.Item key={decade} interval={3000}>
                                    <Box
                                        sx={{
                                            minHeight: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                            {decade}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 1 }}>
                                            {count} movie(s)
                                        </Typography>
                                    </Box>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'rgba(253, 224, 211, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <TodayOutlined sx={{ color: 'primary.main' }} />
                            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                Movies Per Month ({currentYearOfMonth})
                            </Typography>
                        </Box>
                        <Carousel>
                            {Object.entries(moviesByMonth as Record<string, number>).map(([month, count]) => (
                                <Carousel.Item key={month} interval={3000}>
                                    <Box
                                        sx={{
                                            minHeight: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                            {month}
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: 'text.secondary', mt: 1 }}>
                                            {count} movie(s)
                                        </Typography>
                                    </Box>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage