-- =====================================================
-- FIX FOR EXISTING USERS WITHOUT COMPANY_ID
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Create companies for users who don't have one
INSERT INTO companies (name, owner_id)
SELECT
  COALESCE(p.company_name, 'My Company') as name,
  p.id as owner_id
FROM profiles p
WHERE p.company_id IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM companies c WHERE c.owner_id = p.id
  )
ON CONFLICT DO NOTHING;

-- Step 2: Update profiles with their company_id
UPDATE profiles p
SET company_id = c.id
FROM companies c
WHERE p.id = c.owner_id
  AND p.company_id IS NULL;

-- Step 3: Verify all users have company_id
SELECT
  id,
  email,
  company_name,
  company_id,
  role
FROM profiles;

-- Done! You should see your company_id filled in now.
