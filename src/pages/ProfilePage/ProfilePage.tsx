import { useGenericContext } from "../../hooks/useGenericContext"
import { useStatistics } from '../../hooks/useStatistics';
import { movieContext } from '../../context/MovieContext';
import { profileContext } from '../../context/ProfileContext';
import { Container, Box, CircularProgress } from '@mui/material';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import MovieStatsDisplay from '../../components/MovieStatsDisplay/MovieStatsDisplay';

function ProfilePage() {
    const { ownProfile, loadingProfile } = useGenericContext(profileContext);
    const { listMovies } = useGenericContext(movieContext)
    const { moviesWatched, moviesToWatch } = useStatistics(listMovies)

    const totalMovies = moviesWatched + moviesToWatch;
    const statistics = useStatistics(listMovies);

    if (loadingProfile || !ownProfile) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress size={60} sx={{ color: 'primary.main' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 6, px: 2 }}>
            <Container maxWidth="xl">
                <ProfileHeader
                    profile={ownProfile}
                    isOwnProfile={true}
                    totalMovies={totalMovies}
                    moviesWatched={moviesWatched}
                    moviesToWatch={moviesToWatch}
                />

                <MovieStatsDisplay statistics={statistics} />
            </Container>
        </Box>
    )
}

export default ProfilePage