-- =====================================================
-- CRM DATABASE SCHEMA FOR SUPABASE
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. UPDATE USERS/PROFILES TABLE WITH ROLES
-- =====================================================

-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'employee' CHECK (role IN ('owner', 'admin', 'employee'));

-- Add company_id reference (will be set after companies table is created)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Update existing users to be owners
UPDATE profiles SET role = 'owner' WHERE role IS NULL;

-- =====================================================
-- 2. COMPANIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Policies for companies
CREATE POLICY "Users can view their own company"
  ON companies FOR SELECT
  USING (
    owner_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.company_name IN (SELECT name FROM companies WHERE companies.id = profiles.id)
    )
  );

CREATE POLICY "Owners can update their company"
  ON companies FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Owners can create companies"
  ON companies FOR INSERT
  WITH CHECK (owner_id = auth.uid());

-- =====================================================
-- 3. UPDATE PROFILES WITH COMPANY REFERENCE
-- =====================================================

-- Add company_id to profiles (after companies table exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'company_id'
  ) THEN
    -- First add the column as nullable
    ALTER TABLE profiles ADD COLUMN company_id UUID REFERENCES companies(id) ON DELETE CASCADE;

    -- Create companies for existing users
    INSERT INTO companies (name, owner_id)
    SELECT company_name, id FROM profiles
    ON CONFLICT DO NOTHING;

    -- Update profiles with their company_id
    UPDATE profiles p
    SET company_id = c.id
    FROM companies c
    WHERE p.id = c.owner_id;

    -- Now make it NOT NULL
    ALTER TABLE profiles ALTER COLUMN company_id SET NOT NULL;
  END IF;
END $$;

-- =====================================================
-- 4. LEADS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'closed')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  follow_up DATE,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(company_id, phone)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_company_id ON leads(company_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads(follow_up);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies for leads
CREATE POLICY "Users can view leads in their company"
  ON leads FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
    AND (
      -- Owners and admins see all leads
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND company_id = leads.company_id
        AND role IN ('owner', 'admin')
      )
      OR
      -- Employees see only assigned leads
      assigned_to = auth.uid()
    )
  );

CREATE POLICY "Users can create leads in their company"
  ON leads FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Owners and admins can update any lead"
  ON leads FOR UPDATE
  USING (
    company_id IN (
      SELECT company_id FROM profiles
      WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Employees can update their assigned leads"
  ON leads FOR UPDATE
  USING (
    assigned_to = auth.uid()
    AND company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Only owners can delete leads"
  ON leads FOR DELETE
  USING (
    company_id IN (
      SELECT company_id FROM profiles
      WHERE id = auth.uid()
      AND role = 'owner'
    )
  );

-- =====================================================
-- 5. NOTES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX IF NOT EXISTS idx_notes_lead_id ON notes(lead_id);

-- Enable RLS
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policies for notes
CREATE POLICY "Users can view notes for leads they can see"
  ON notes FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
    AND lead_id IN (
      SELECT id FROM leads WHERE
        company_id = notes.company_id
        AND (
          assigned_to = auth.uid()
          OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND company_id = notes.company_id
            AND role IN ('owner', 'admin')
          )
        )
    )
  );

CREATE POLICY "Users can create notes for accessible leads"
  ON notes FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 6. ACTIVITY LOGS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  performed_by UUID NOT NULL REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX IF NOT EXISTS idx_activity_logs_lead_id ON activity_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp DESC);

-- Enable RLS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view activity logs for accessible leads"
  ON activity_logs FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

-- =====================================================
-- 7. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to log activity when lead is created
CREATE OR REPLACE FUNCTION log_lead_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_logs (lead_id, company_id, action, performed_by, details)
  VALUES (
    NEW.id,
    NEW.company_id,
    'lead_created',
    NEW.created_by,
    jsonb_build_object('name', NEW.name, 'phone', NEW.phone)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_log_lead_created ON leads;
CREATE TRIGGER trigger_log_lead_created
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION log_lead_created();

-- Function to log activity when lead status changes
CREATE OR REPLACE FUNCTION log_lead_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO activity_logs (lead_id, company_id, action, performed_by, details)
    VALUES (
      NEW.id,
      NEW.company_id,
      'status_changed',
      auth.uid(),
      jsonb_build_object('from', OLD.status, 'to', NEW.status)
    );
  END IF;

  IF OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
    INSERT INTO activity_logs (lead_id, company_id, action, performed_by, details)
    VALUES (
      NEW.id,
      NEW.company_id,
      'lead_reassigned',
      auth.uid(),
      jsonb_build_object('from', OLD.assigned_to, 'to', NEW.assigned_to)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_log_lead_changes ON leads;
CREATE TRIGGER trigger_log_lead_changes
  AFTER UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION log_lead_status_change();

-- Function to update last_activity on lead update
CREATE OR REPLACE FUNCTION update_lead_last_activity()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_activity = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_lead_last_activity ON leads;
CREATE TRIGGER trigger_update_lead_last_activity
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_last_activity();

-- =====================================================
-- DONE!
-- =====================================================
-- Your CRM database is now ready!
-- Next: Build the frontend and server actions
