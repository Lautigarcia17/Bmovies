import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import { authContext } from '../../context/AuthContext';
import { useGenericContext } from '../../hooks/useGenericContext';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { Movie, LocalMovies, Theaters, VideoLibrary } from '@mui/icons-material';


function AuthPage() {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const { reset } = useGenericContext(authContext)

  const handleAuth = () => {
    reset()
    setShowLogin(!showLogin)
  }

  const handleTabChange = (_: any, newValue: number) => {
    if ((newValue === 0 && !showLogin) || (newValue === 1 && showLogin)) {
      handleAuth();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
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
          background: 'radial-gradient(circle at 20% 50%, rgba(253, 224, 211, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(253, 224, 211, 0.1) 0%, transparent 40%)',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flex: '0 0 50%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          p: 8,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              left: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253, 224, 211, 0.3) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
                '50%': { transform: 'scale(1.2)', opacity: 0.8 },
              },
            }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Movie sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography
              variant="h1"
              sx={{
                fontSize: '2.5rem',
                fontWeight: 900,
                letterSpacing: -2,
                background: 'linear-gradient(135deg, #FDE0D3 0%, #e2eaec 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BMOVIES
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Your Personal Movie Collection
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Save, rate, and organize the movies that shaped your story. Create your personal cinema archive.
          </Typography>

          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
            {[
              { icon: LocalMovies, text: 'Track Movies' },
              { icon: Theaters, text: 'Rate & Review' },
              { icon: VideoLibrary, text: 'Build Collection' },
            ].map(({ icon: Icon, text }) => (
              <Box
                key={text}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1, sm: 1.5 },
                  px: { xs: 2, sm: 2.5, md: 3 },
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  borderRadius: 2,
                  backgroundColor: 'rgba(253, 224, 211, 0.08)',
                  border: '1px solid rgba(253, 224, 211, 0.2)',
                }}
              >
                <Icon sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 22, md: 24 } }} />
                <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' } }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flex: { xs: '1 1 100%', lg: '0 0 50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 4, md: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            backgroundColor: 'rgba(6, 13, 23, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(253, 224, 211, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(253, 224, 211, 0.1)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderBottom: '1px solid rgba(253, 224, 211, 0.1)',
            }}
          >
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Movie sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    letterSpacing: -1,
                    background: 'linear-gradient(135deg, #FDE0D3 0%, #e2eaec 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  BMOVIES
                </Typography>
              </Box>
            </Box>
            
            <Tabs
              value={showLogin ? 0 : 1}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
                '& .MuiTab-root': {
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  color: 'rgba(255, 255, 255, 0.5)',
                  transition: 'color 0.15s ease',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                  '&:hover': {
                    color: 'primary.light',
                  },
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            {showLogin ? <Login setShowLogin={handleAuth} /> : <Register setShowLogin={handleAuth} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage