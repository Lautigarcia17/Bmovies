import { Profile, ProfileUpdateData, UsernameAvailability } from '../interface';

export interface UseProfileReturn {
  ownProfile: Profile | null;
  loadingProfile: boolean;
  updateOwnProfile: (data: ProfileUpdateData) => Promise<void>;
  checkUsername: (username: string) => Promise<UsernameAvailability>;
  refreshProfile: () => Promise<void>;
  error: string | null;
}
