-- Create invitations table for team member invites
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  invited_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  accepted BOOLEAN DEFAULT FALSE,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_company ON invitations(company_id);

-- RLS policies for invitations
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Allow users to view invitations for their company
CREATE POLICY "Users can view company invitations"
  ON invitations
  FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Allow owners and admins to create invitations
CREATE POLICY "Owners and admins can create invitations"
  ON invitations
  FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM profiles
      WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- Allow anyone to view invitation by token (for signup process)
CREATE POLICY "Anyone can view invitation by token"
  ON invitations
  FOR SELECT
  USING (TRUE);

-- Allow system to update invitation status
CREATE POLICY "System can update invitations"
  ON invitations
  FOR UPDATE
  USING (TRUE);
