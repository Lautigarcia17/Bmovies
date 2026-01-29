import { useState, useEffect } from 'react';
import { Profile, Movie } from '../types/interface';
import { getPublicProfile, getPublicUserMovies } from '../services/database';
import { useStatistics } from './useStatistics';
import { UseStatistics } from '../types/type/UseStatistics';

export interface UsePublicProfileReturn {
  profile: Profile | null;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  statistics: UseStatistics;
}

export const usePublicProfile = (username: string): UsePublicProfileReturn => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublicProfile = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch profile by username
        const { data: profileData, error: profileError } = await getPublicProfile(username);

        if (profileError || !profileData) {
          setError('User not found');
          setProfile(null);
          setMovies([]);
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // Fetch user's movies
        const { data: moviesData, error: moviesError } = await getPublicUserMovies(profileData.id);

        if (moviesError) {
          console.error('Error loading user movies:', moviesError);
          setMovies([]);
        } else {
          // Convert created_at strings to Date objects
          const moviesWithDates = (moviesData || []).map(movie => ({
            ...movie,
            created_at: movie.created_at ? new Date(movie.created_at) : undefined,
          }));
          setMovies(moviesWithDates);
        }
      } catch (err) {
        console.error('Error loading public profile:', err);
        setError('An unexpected error occurred');
        setProfile(null);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadPublicProfile();
  }, [username]);

  // Calculate statistics using the same hook as ProfilePage
  const statistics = useStatistics(movies);

  return {
    profile,
    movies,
    loading,
    error,
    statistics,
  };
};
