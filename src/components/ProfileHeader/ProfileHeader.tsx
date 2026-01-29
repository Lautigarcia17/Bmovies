import { Box, Typography, Paper, Avatar, Button, Grid, LinearProgress } from '@mui/material';
import { Movie, Edit, Person } from '@mui/icons-material';
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
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {!profile.avatar_url && <Person sx={{ fontSize: { xs: 40, md: 50 } }} />}
            </Avatar>
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', md: '3rem' },
                    letterSpacing: -0.5,
                  }}
                >
                  @{profile.username}
                </Typography>
                <Movie sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main' }} />
              </Box>
              
              {profile.display_name && (
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '1rem', md: '1.25rem' },
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
                    fontSize: { xs: '0.875rem', md: '1rem' },
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
            fontSize: { xs: '0.875rem', sm: '1rem' },
            mb: 3,
          }}
        >
          {isOwnProfile ? 'Your personal movie collection statistics' : `${profile.username}'s movie collection`}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }, mb: 1 }}>
                Total Movies
              </Typography>
              <Typography variant="h3" sx={{ color: 'text.primary', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                {totalMovies}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }, mb: 1 }}>
                Watched
              </Typography>
              <Typography variant="h3" sx={{ color: '#26ff3e', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                {moviesWatched}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }, mb: 1 }}>
                To Watch
              </Typography>
              <Typography variant="h3" sx={{ color: '#ffc226', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
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
  );
};

export default ProfileHeader;
