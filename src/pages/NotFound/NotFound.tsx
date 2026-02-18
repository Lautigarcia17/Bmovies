import { Link } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material';
import { ErrorOutline, Home } from '@mui/icons-material';


function NotFound() {

    return (
        <Container
            maxWidth="md"
            sx={{
                minHeight: 'calc(100vh - 100px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                <ErrorOutline sx={{ fontSize: { xs: 60, md: 80 }, color: 'primary.main' }} />
                
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '2rem', md: '3rem' },
                        fontWeight: 700,
                        color: 'primary.main',
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontSize: { xs: '1.125rem', md: '1.375rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2,
                    }}
                >
                    This page is not available.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: '0.8125rem', md: '0.9375rem' },
                        color: 'text.secondary',
                        maxWidth: 600,
                        mb: 3,
                    }}
                >
                    The link you selected may not work or the page may have been removed.
                </Typography>

                <Button
                    component={Link}
                    to='/'
                    variant="contained"
                    size="large"
                    startIcon={<Home />}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                    }}
                >
                    Back to BMOVIES
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound