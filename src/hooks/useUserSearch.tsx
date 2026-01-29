import { useState, useEffect, useCallback } from 'react';
import { Profile } from '../types/interface';
import { searchUsersByUsername } from '../services/database';

export interface UseUserSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: Profile[];
  loading: boolean;
  error: string | null;
  searchUsers: () => Promise<void>;
}

export const useUserSearch = (): UseUserSearchReturn => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async () => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery || trimmedQuery.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: searchError } = await searchUsersByUsername(trimmedQuery);

      if (searchError) {
        console.error('Error searching users:', searchError);
        setError('Failed to search users');
        setResults([]);
      } else {
        setResults((data || []) as Profile[]);
      }
    } catch (err) {
      console.error('Error searching users:', err);
      setError('An unexpected error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      searchUsers();
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query, searchUsers]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    searchUsers,
  };
};
