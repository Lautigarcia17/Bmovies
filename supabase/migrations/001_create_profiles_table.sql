-- Migration: Create profiles table and update RLS policies
-- Execute this in Supabase SQL Editor

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  last_username_change TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- 2. Create indexes for efficient searches
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_username_search ON profiles(LOWER(username));

-- 3. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for profiles table
-- Everyone can read all profiles (public by default)
DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON profiles;
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Users can only insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 5. Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- 6. Update RLS policies for movies table to allow viewing public movies
-- First, drop existing policies
DROP POLICY IF EXISTS "Users can select own movies" ON movies;
DROP POLICY IF EXISTS "Users can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
DROP POLICY IF EXISTS "Users can update own movies" ON movies;
DROP POLICY IF EXISTS "Users can delete own movies" ON movies;

-- Allow authenticated users to view movies from any user with a profile
CREATE POLICY "Users can view public movies"
  ON movies FOR SELECT
  TO authenticated
  USING (
    user_id IN (SELECT id FROM profiles)
  );

-- Users can only insert their own movies
CREATE POLICY "Users can insert own movies"
  ON movies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own movies
CREATE POLICY "Users can update own movies"
  ON movies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own movies
CREATE POLICY "Users can delete own movies"
  ON movies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. Migration: Insert profiles from existing users
-- This will take username from user_metadata and create profile entries
INSERT INTO profiles (id, username, created_at)
SELECT 
  id,
  COALESCE(
    raw_user_meta_data->>'username',
    'user_' || SUBSTRING(id::TEXT, 1, 8)
  ) as username,
  created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;

-- 8. Handle potential username duplicates by appending numbers
-- This ensures all users have unique usernames
DO $$
DECLARE
  duplicate_record RECORD;
  new_username TEXT;
  counter INTEGER;
BEGIN
  FOR duplicate_record IN 
    SELECT username, array_agg(id) as user_ids
    FROM profiles
    GROUP BY username
    HAVING count(*) > 1
  LOOP
    counter := 1;
    FOR i IN 2..array_length(duplicate_record.user_ids, 1) LOOP
      new_username := duplicate_record.username || counter::TEXT;
      WHILE EXISTS (SELECT 1 FROM profiles WHERE username = new_username) LOOP
        counter := counter + 1;
        new_username := duplicate_record.username || counter::TEXT;
      END LOOP;
      
      UPDATE profiles 
      SET username = new_username 
      WHERE id = duplicate_record.user_ids[i];
      
      counter := counter + 1;
    END LOOP;
  END LOOP;
END $$;

-- Verification queries (uncomment to run)
-- SELECT COUNT(*) as total_profiles FROM profiles;
-- SELECT username, COUNT(*) FROM profiles GROUP BY username HAVING COUNT(*) > 1;
-- SELECT p.username, COUNT(m.id) as movie_count FROM profiles p LEFT JOIN movies m ON p.id = m.user_id GROUP BY p.username LIMIT 10;
