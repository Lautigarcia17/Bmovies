import { createContext, ReactNode } from 'react';
import { UseProfileReturn } from '../types/type/UseProfileReturn';
import { useProfile } from '../hooks/useProfile';

export const profileContext = createContext<UseProfileReturn | undefined>(undefined);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const { ownProfile, loadingProfile, updateOwnProfile, checkUsername, refreshProfile, error } = useProfile();

  return (
    <profileContext.Provider
      value={{
        ownProfile,
        loadingProfile,
        updateOwnProfile,
        checkUsername,
        refreshProfile,
        error,
      }}
    >
      {children}
    </profileContext.Provider>
  );
}
