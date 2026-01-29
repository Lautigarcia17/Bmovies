import { useState, useEffect, useCallback } from 'react';
import { Profile, ProfileUpdateData, UsernameAvailability } from '../types/interface';
import { UseProfileReturn } from '../types/type/UseProfileReturn';
import { getOwnProfile, updateProfile, checkUsernameAvailable } from '../services/database';
import { useGenericContext } from './useGenericContext';
import { authContext } from '../context/AuthContext';

export const useProfile = (): UseProfileReturn => {
  const { idSession } = useGenericContext(authContext);
  const [ownProfile, setOwnProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!idSession) {
      setOwnProfile(null);
      setLoadingProfile(false);
      return;
    }

    try {
      setLoadingProfile(true);
      setError(null);
      const { data, error: profileError } = await getOwnProfile(idSession);

      if (profileError) {
        console.error('Error loading profile:', profileError);
        setError('Failed to load profile');
        setOwnProfile(null);
      } else if (data) {
        setOwnProfile(data);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('An unexpected error occurred');
      setOwnProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  }, [idSession]);

  const updateOwnProfile = async (data: ProfileUpdateData): Promise<void> => {
    if (!idSession) {
      throw new Error('No active session');
    }

    try {
      setError(null);
      const { data: updatedProfile, error: updateError } = await updateProfile(idSession, data);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        throw new Error('Failed to update profile');
      }

      if (updatedProfile) {
        setOwnProfile(updatedProfile);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const checkUsername = async (username: string): Promise<UsernameAvailability> => {
    if (!idSession) {
      return {
        available: false,
        reason: 'invalid',
        message: 'No active session',
      };
    }

    return await checkUsernameAvailable(idSession, username);
  };

  const refreshProfile = async (): Promise<void> => {
    await loadProfile();
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    ownProfile,
    loadingProfile,
    updateOwnProfile,
    checkUsername,
    refreshProfile,
    error,
  };
};
