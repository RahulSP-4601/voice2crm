export type UserRole = 'owner' | 'admin' | 'employee';

export type LeadStatus = 'new' | 'contacted' | 'interested' | 'closed';

export interface Company {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  company_name: string;
  company_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  company_id: string;
  name: string;
  phone: string;
  email?: string;
  source?: string;
  status: LeadStatus;
  assigned_to?: string;
  assigned_user?: {
    id: string;
    email: string;
    company_name: string;
  };
  follow_up?: string;
  last_activity: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  lead_id: string;
  company_id: string;
  text: string;
  created_by: string;
  created_by_user?: {
    email: string;
    company_name: string;
  };
  created_at: string;
}

export interface ActivityLog {
  id: string;
  lead_id: string;
  company_id: string;
  action: string;
  details?: Record<string, any>;
  performed_by: string;
  performed_by_user?: {
    email: string;
    company_name: string;
  };
  timestamp: string;
}

export interface DashboardStats {
  total_leads: number;
  new_leads: number;
  contacted_leads: number;
  interested_leads: number;
  closed_leads: number;
  today_followups: number;
  overdue_followups: number;
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  assigned_to?: string;
  follow_up?: string;
}

export interface UpdateLeadInput {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  status?: LeadStatus;
  assigned_to?: string;
  follow_up?: string;
}
