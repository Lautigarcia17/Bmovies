export interface Profile {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  last_username_change?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicProfile extends Profile {
  movie_count: number;
  watched_count: number;
}

export interface UsernameAvailability {
  available: boolean;
  reason?: 'taken' | 'invalid' | 'recent_change' | 'too_short' | 'too_long' | 'invalid_format';
  message?: string;
}

export interface ProfileUpdateData {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  username?: string;
}
