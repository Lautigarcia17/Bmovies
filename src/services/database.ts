import { supabase } from "../supabase/client";
import { Movie, MovieEdit, UserLogin, UserRegister, ProfileUpdateData, UsernameAvailability } from "../types/interface";
import { AuthError } from "@supabase/supabase-js";

// Helper to create AuthError-compatible errors
const createAuthError = (message: string, status: number = 400): AuthError => {
    return {
        message,
        name: 'CustomAuthError',
        status,
    } as AuthError;
};

export const getSession = () => {
    return supabase.auth.getSession();
}

export const getMovies = (idUser : string) =>{
    return supabase.from('movies').select()
    .eq('user_id',idUser)
    .order('created_at', { ascending: false });
}

export const getMovieById = (id : string)=>{
    return supabase.from('movies').select().eq('id', id);
}

export const getMovieByTitle = (title : string)=>{
    return supabase.from('movies').select().eq('title', title);
}

export const addMovie = (movie: Movie) => {
    return supabase.from('movies').insert(movie).select()
}

export const deleteMovie = (idMovie: string) => {
    return supabase.from('movies').delete().eq('id', idMovie).select();
}

export const updateMovie = (idMovie: string, updateData: MovieEdit) => {
    return supabase.from('movies').update(updateData).eq('id', idMovie).select();
}


export const signInDatabase = (dataUser : UserLogin) => {
    return supabase.auth.signInWithPassword({
        email: dataUser.email,
        password: dataUser.password,
      });
}

export const signUpDatabase = async (dataUser : UserRegister) =>{
    // First, check if username is available
    const usernameCheck = await checkUsernameAvailable('', dataUser.username);
    if (!usernameCheck.available) {
        return { 
            data: { user: null, session: null }, 
            error: createAuthError(usernameCheck.message || 'Username is not available', 400)
        };
    }

    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: dataUser.email,
        password: dataUser.password,
        options: {
          data: {
            age: dataUser.age
          }
        }
      });
    
    // If signup successful and user exists, create profile
    if (data.user && !error) {
        const profileResult = await createProfile(data.user.id, dataUser.username);
        
        // If profile creation fails, handle the error
        if (profileResult.error) {
            console.error('Profile creation failed:', profileResult.error);
            
            // Check if it's a unique constraint violation (duplicate username)
            // PostgreSQL error code 23505 is for unique_violation
            if (profileResult.error.code === '23505' || 
                profileResult.error.message?.includes('duplicate key') ||
                profileResult.error.message?.includes('unique constraint')) {
                return { 
                    data: { user: null, session: null }, 
                    error: createAuthError('Username is already taken. Please choose a different username.', 409)
                };
            }
            
            // For other errors
            return { 
                data: { user: null, session: null }, 
                error: createAuthError('Failed to create user profile. Please try again.', 500)
            };
        }
    }
    
    return { data, error };
}

export const logOut = ()=>{
    return supabase.auth.signOut()
}

export const checkIfMovieExists = async (title: string) => {
    const { data, error } = await getMovieByTitle(title);
    if (error) {
      console.error('Error checking if movie exists:', error);
      return false;
    }

    return data.length > 0;
  };

// ========== PROFILE OPERATIONS ==========

/**
 * Get profile by username
 */
export const getPublicProfile = (username: string) => {
    return supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
};

/**
 * Get own profile by user ID
 */
export const getOwnProfile = (userId: string) => {
    return supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
};

/**
 * Create a new profile (called during registration)
 */
export const createProfile = (userId: string, username: string) => {
    return supabase
        .from('profiles')
        .insert({
            id: userId,
            username: username,
        })
        .select()
        .single();
};

/**
 * Update profile information
 */
export const updateProfile = (userId: string, profileData: ProfileUpdateData) => {
    const updateData: any = { ...profileData };
    
    // If username is being changed, update the timestamp
    if (profileData.username) {
        updateData.last_username_change = new Date().toISOString();
    }
    
    return supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();
};

/**
 * Check if username is available
 * Returns availability status and reason if not available
 */
export const checkUsernameAvailable = async (
    userId: string,
    username: string
): Promise<UsernameAvailability> => {
    // Validate format
    if (username.length < 3) {
        return {
            available: false,
            reason: 'too_short',
            message: 'Username must be at least 3 characters'
        };
    }
    
    if (username.length > 20) {
        return {
            available: false,
            reason: 'too_long',
            message: 'Username must be 20 characters or less'
        };
    }
    
    // Check format (alphanumeric and underscores only)
    const validFormat = /^[a-zA-Z0-9_]+$/.test(username);
    if (!validFormat) {
        return {
            available: false,
            reason: 'invalid_format',
            message: 'Username can only contain letters, numbers, and underscores'
        };
    }
    
    // Check if username is already taken (excluding current user if userId provided)
    let query = supabase
        .from('profiles')
        .select('id')
        .eq('username', username);
    
    // Only exclude current user if userId is provided (not during registration)
    if (userId) {
        query = query.neq('id', userId);
    }
    
    const { data, error } = await query.maybeSingle();
    
    if (error) {
        console.error('Error checking username availability:', error);
        // Check if it's an RLS permission error
        if (error.code === 'PGRST301' || error.message?.includes('permission')) {
            console.error('⚠️ RLS Policy Error: Anonymous users cannot query profiles table.');
            console.error('Run migration 003_fix_username_check_rls.sql to fix this.');
        }
        return {
            available: false,
            reason: 'invalid',
            message: 'Error checking username availability'
        };
    }
    
    if (data) {
        return {
            available: false,
            reason: 'taken',
            message: 'Username is already taken'
        };
    }
    
    // Check if user recently changed username (30 days limit) - skip if no userId (registration)
    if (userId) {
        const { data: profile } = await getOwnProfile(userId);
        if (profile && profile.last_username_change) {
            const daysSinceChange = Math.floor(
                (Date.now() - new Date(profile.last_username_change).getTime()) / (1000 * 60 * 60 * 24)
            );
            
            if (daysSinceChange < 30) {
                const daysRemaining = 30 - daysSinceChange;
                return {
                    available: false,
                    reason: 'recent_change',
                    message: `You can change your username again in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`
                };
            }
        }
    }
    
    return { available: true };
};

/**
 * Search users by username (partial match, case-insensitive)
 */
export const searchUsersByUsername = (query: string, limit: number = 10) => {
    return supabase
        .from('profiles')
        .select('*')
        .ilike('username', `%${query}%`)
        .limit(limit);
};

/**
 * Get movies for a specific user (for public profile view)
 */
export const getPublicUserMovies = (userId: string) => {
    return supabase
        .from('movies')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
};