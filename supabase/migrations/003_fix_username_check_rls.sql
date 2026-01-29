-- Migration: Fix username availability check for unauthenticated users
-- Execute this in Supabase SQL Editor AFTER running 001_create_profiles_table.sql

-- Problem: During registration, users are not yet authenticated, 
-- so they cannot query the profiles table to check username availability.
-- This causes the system to allow duplicate usernames.

-- Solution: Add an RLS policy that allows anonymous users to read profiles
-- This is safe because profiles are already public by design.

-- Allow anonymous (non-authenticated) users to check username availability
DROP POLICY IF EXISTS "Anyone can view public profiles" ON profiles;
CREATE POLICY "Anyone can view public profiles"
  ON profiles FOR SELECT
  TO anon
  USING (true);

-- Verification: Test that anonymous users can now query profiles
-- You can test this by running checkUsernameAvailable before login

-- Success message
DO $$
BEGIN
  RAISE NOTICE '======================================';
  RAISE NOTICE 'RLS fix applied successfully!';
  RAISE NOTICE 'Anonymous users can now check username availability.';
  RAISE NOTICE '======================================';
END $$;
