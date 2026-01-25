import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import { authContext } from '../../context/AuthContext';
import { useGenericContext } from '../../hooks/useGenericContext';
import { Container, Box, Typography, Paper } from '@mui/material';
import { Movie as MovieIcon } from '@mui/icons-material';


function AuthPage() {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const { reset } = useGenericContext(authContext)

  const handleAuth = () => {
    reset()
    setShowLogin(!showLogin)
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          <MovieIcon sx={{ fontSize: { xs: 40, md: 60 }, color: 'primary.main' }} />
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 400,
            }}
          >
            Welcome to Bmovies
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
            fontWeight: 200,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Save, rate and review the movies that shaped your story.
        </Typography>
      </Box>

      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 600,
          p: { xs: 3, sm: 4, md: 5 },
          backgroundColor: 'background.paper',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 4,
        }}
      >
        {showLogin ? <Login setShowLogin={handleAuth} /> : <Register setShowLogin={handleAuth} />}
      </Paper>
    </Container>
  );
};

export default AuthPage