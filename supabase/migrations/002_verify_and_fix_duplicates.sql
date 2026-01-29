-- Verification and cleanup script for profiles table
-- Execute this in Supabase SQL Editor to verify the migration and fix any issues

-- 1. Verify profiles table exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
    RAISE EXCEPTION 'profiles table does not exist! Please run migration 001_create_profiles_table.sql first';
  END IF;
  
  RAISE NOTICE 'profiles table exists ✓';
END $$;

-- 2. Verify UNIQUE constraint on username
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'profiles' 
    AND constraint_type = 'UNIQUE' 
    AND constraint_name LIKE '%username%'
  ) THEN
    RAISE EXCEPTION 'UNIQUE constraint on username does not exist!';
  END IF;
  
  RAISE NOTICE 'UNIQUE constraint on username exists ✓';
END $$;

-- 3. Find and report duplicate usernames
DO $$
DECLARE
  duplicate_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO duplicate_count
  FROM (
    SELECT username 
    FROM profiles 
    GROUP BY username 
    HAVING COUNT(*) > 1
  ) duplicates;
  
  IF duplicate_count > 0 THEN
    RAISE NOTICE 'Found % duplicate username(s)', duplicate_count;
    
    -- Show the duplicates
    RAISE NOTICE 'Duplicate usernames:';
    FOR duplicate_username IN 
      SELECT username, COUNT(*) as count
      FROM profiles
      GROUP BY username
      HAVING COUNT(*) > 1
    LOOP
      RAISE NOTICE '  - % (% occurrences)', duplicate_username.username, duplicate_username.count;
    END LOOP;
  ELSE
    RAISE NOTICE 'No duplicate usernames found ✓';
  END IF;
END $$;

-- 4. Fix duplicates by appending numbers
DO $$
DECLARE
  duplicate_record RECORD;
  user_record RECORD;
  new_username TEXT;
  counter INTEGER;
BEGIN
  FOR duplicate_record IN 
    SELECT username, array_agg(id ORDER BY created_at) as user_ids
    FROM profiles
    GROUP BY username
    HAVING count(*) > 1
  LOOP
    RAISE NOTICE 'Fixing duplicates for username: %', duplicate_record.username;
    counter := 1;
    
    -- Keep the first user's username unchanged, modify the others
    FOR i IN 2..array_length(duplicate_record.user_ids, 1) LOOP
      new_username := duplicate_record.username || counter::TEXT;
      
      -- Find an available username
      WHILE EXISTS (SELECT 1 FROM profiles WHERE username = new_username) LOOP
        counter := counter + 1;
        new_username := duplicate_record.username || counter::TEXT;
      END LOOP;
      
      -- Update the profile
      UPDATE profiles 
      SET username = new_username 
      WHERE id = duplicate_record.user_ids[i];
      
      RAISE NOTICE '  - Changed user ID % to username: %', 
        duplicate_record.user_ids[i], new_username;
      
      counter := counter + 1;
    END LOOP;
  END LOOP;
  
  RAISE NOTICE 'Duplicate usernames fixed ✓';
END $$;

-- 5. Final verification
SELECT 
  COUNT(*) as total_profiles,
  COUNT(DISTINCT username) as unique_usernames,
  COUNT(*) - COUNT(DISTINCT username) as duplicates
FROM profiles;

-- 6. Show sample of profiles
SELECT 
  username,
  created_at,
  last_username_change
FROM profiles
ORDER BY created_at DESC
LIMIT 10;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '======================================';
  RAISE NOTICE 'Migration verification completed!';
  RAISE NOTICE 'Check the output above for any issues.';
  RAISE NOTICE '======================================';
END $$;
