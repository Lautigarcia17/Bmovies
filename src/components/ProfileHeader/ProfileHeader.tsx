import { Box, Typography, Paper, Avatar, Button, Grid, LinearProgress } from '@mui/material';
import { Movie, Edit } from '@mui/icons-material';
import { Profile } from '../../types/interface';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  totalMovies: number;
  moviesWatched: number;
  moviesToWatch: number;
}

const ProfileHeader = ({ profile, isOwnProfile, totalMovies, moviesWatched, moviesToWatch }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const watchedPercentage = totalMovies > 0 ? (moviesWatched / totalMovies) * 100 : 0;

  return (
    <Paper
      elevation={0}
      className={styles.headerContainer}
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              src={profile.avatar_url}
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                bgcolor: 'primary.main',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                color: '#060d17',
              }}
            >
              {!profile.avatar_url && profile.username.charAt(0).toUpperCase()}
            </Avatar>
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 800,
                    fontSize: { xs: '1.25rem', md: '2rem' },
                    letterSpacing: -0.5,
                  }}
                >
                  @{profile.username}
                </Typography>
                <Movie sx={{ fontSize: { xs: 24, md: 30 }, color: 'primary.main' }} />
              </Box>
              
              {profile.display_name && (
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '0.8125rem', md: '0.9375rem' },
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {profile.display_name}
                </Typography>
              )}
              
              {profile.bio && (
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                    maxWidth: '600px',
                  }}
                >
                  {profile.bio}
                </Typography>
              )}
            </Box>
          </Box>
          
          {isOwnProfile && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => navigate('/profile/settings')}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(253, 224, 211, 0.1)',
                },
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            mb: 3,
          }}
        >
          {isOwnProfile ? 'Your personal movie collection statistics' : `${profile.username}'s movie collection`}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.75rem' }, mb: 1 }}>
                Total Movies
              </Typography>
              <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700, fontSize: { xs: '1.375rem', sm: '1.625rem', md: '1.875rem' } }}>
                {totalMovies}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.75rem' }, mb: 1 }}>
                Watched
              </Typography>
              <Typography variant="h3" sx={{ color: '#26ff3e', fontWeight: 700, fontSize: { xs: '1.375rem', sm: '1.625rem', md: '1.875rem' } }}>
                {moviesWatched}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.75rem' }, mb: 1 }}>
                To Watch
              </Typography>
              <Typography variant="h3" sx={{ color: '#ffc226', fontWeight: 700, fontSize: { xs: '1.375rem', sm: '1.625rem', md: '1.875rem' } }}>
                {moviesToWatch}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>
              Progress
            </Typography>
            <Typography sx={{ color: 'primary.main', fontSize: '0.75rem', fontWeight: 600 }}>
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
  );
};

export default ProfileHeader;
