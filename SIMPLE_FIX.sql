-- =====================================================
-- SIMPLE FIX - RUN THIS IN SUPABASE SQL EDITOR
-- =====================================================

-- Drop all existing INSERT policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users and during signup" ON profiles;

-- Create a simple permissive INSERT policy
-- This allows profile creation during signup
CREATE POLICY "Allow profile insert"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- That's it! The app code will handle profile creation.
-- Try signing up again now.
