-- =====================================================
-- RUN THIS IN SUPABASE SQL EDITOR TO FIX SIGNUP ISSUE
-- =====================================================

-- Step 1: Drop the restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;

-- Step 2: Create a permissive INSERT policy that works during signup
CREATE POLICY "Enable insert for authenticated users and during signup"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Step 3: Add a trigger to automatically create profiles when users sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, company_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'company_name', 'My Company'),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Step 4: Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Done! Now try signing up again.
