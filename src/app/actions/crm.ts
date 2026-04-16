"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type {
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  Note,
  ActivityLog,
  DashboardStats,
  Profile,
} from "@/types/crm";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

async function ensureUserHasCompany(supabase: any, profile: Profile) {
  if (profile.company_id) {
    return profile;
  }

  // User doesn't have a company, create one
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({
      name: profile.company_name || "My Company",
      owner_id: profile.id,
    })
    .select()
    .single();

  if (companyError) {
    // Company might already exist, try to fetch it
    const { data: existingCompany } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", profile.id)
      .single();

    if (existingCompany) {
      // Update profile with existing company
      await supabase
        .from("profiles")
        .update({ company_id: existingCompany.id })
        .eq("id", profile.id);

      return { ...profile, company_id: existingCompany.id };
    }

    return profile;
  }

  // Update profile with new company
  await supabase
    .from("profiles")
    .update({ company_id: company.id })
    .eq("id", profile.id);

  return { ...profile, company_id: company.id };
}

async function getCurrentUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return null;
  }

  // Ensure user has a company
  const updatedProfile = await ensureUserHasCompany(supabase, profile as Profile);

  return updatedProfile as Profile | null;
}

// =====================================================
// LEAD ACTIONS
// =====================================================

export async function getLeads() {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return { error: error.message };
  }

  // Fetch assigned users separately if needed
  const leadsWithUsers = await Promise.all(
    (data || []).map(async (lead) => {
      if (lead.assigned_to) {
        const { data: assignedUser } = await supabase
          .from("profiles")
          .select("id, email, company_name")
          .eq("id", lead.assigned_to)
          .single();

        return { ...lead, assigned_user: assignedUser };
      }
      return lead;
    })
  );

  return { data: leadsWithUsers as Lead[] };
}

export async function getLead(id: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .eq("company_id", profile.company_id)
    .single();

  if (error) {
    console.error("Error fetching lead:", error);
    return { error: error.message };
  }

  // Fetch assigned user if exists
  let assignedUser = null;
  if (data.assigned_to) {
    const { data: user } = await supabase
      .from("profiles")
      .select("id, email, company_name")
      .eq("id", data.assigned_to)
      .single();
    assignedUser = user;
  }

  return { data: { ...data, assigned_user: assignedUser } as Lead };
}

export async function createLead(input: CreateLeadInput) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  if (!profile.company_id) {
    return { error: "Unable to create company. Please contact support." };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      ...input,
      company_id: profile.company_id,
      created_by: user.id,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "A lead with this phone number already exists in your company" };
    }
    console.error("Error creating lead:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { data: data as Lead };
}

export async function updateLead(id: string, input: UpdateLeadInput) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("leads")
    .update(input)
    .eq("id", id)
    .eq("company_id", profile.company_id)
    .select()
    .single();

  if (error) {
    console.error("Error updating lead:", error);
    return { error: error.message };
  }

  // Fetch assigned user if exists
  let assignedUser = null;
  if (data.assigned_to) {
    const { data: user } = await supabase
      .from("profiles")
      .select("id, email, company_name")
      .eq("id", data.assigned_to)
      .single();
    assignedUser = user;
  }

  revalidatePath("/dashboard");
  return { data: { ...data, assigned_user: assignedUser } as Lead };
}

export async function deleteLead(id: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  if (profile.role !== "owner") {
    return { error: "Only owners can delete leads" };
  }

  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id)
    .eq("company_id", profile.company_id);

  if (error) {
    console.error("Error deleting lead:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateLeadStatus(id: string, status: string) {
  return updateLead(id, { status: status as any });
}

export async function assignLead(id: string, userId: string) {
  return updateLead(id, { assigned_to: userId });
}

// =====================================================
// NOTES ACTIONS
// =====================================================

export async function getNotes(leadId: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("notes")
    .select(`
      *,
      created_by_user:created_by(email, company_name)
    `)
    .eq("lead_id", leadId)
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    return { error: error.message };
  }

  return { data: data as Note[] };
}

export async function createNote(leadId: string, text: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("notes")
    .insert({
      lead_id: leadId,
      company_id: profile.company_id,
      text,
      created_by: user.id,
    })
    .select(`
      *,
      created_by_user:created_by(email, company_name)
    `)
    .single();

  if (error) {
    console.error("Error creating note:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { data: data as Note };
}

// =====================================================
// ACTIVITY LOG ACTIONS
// =====================================================

export async function getActivityLogs(leadId: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("activity_logs")
    .select(`
      *,
      performed_by_user:performed_by(email, company_name)
    `)
    .eq("lead_id", leadId)
    .eq("company_id", profile.company_id)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching activity logs:", error);
    return { error: error.message };
  }

  return { data: data as ActivityLog[] };
}

// =====================================================
// DASHBOARD STATS
// =====================================================

export async function getDashboardStats() {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("status, follow_up")
    .eq("company_id", profile.company_id);

  if (error) {
    console.error("Error fetching dashboard stats:", error);
    return { error: error.message };
  }

  const today = new Date().toISOString().split("T")[0];

  const stats: DashboardStats = {
    total_leads: leads.length,
    new_leads: leads.filter((l) => l.status === "new").length,
    contacted_leads: leads.filter((l) => l.status === "contacted").length,
    interested_leads: leads.filter((l) => l.status === "interested").length,
    closed_leads: leads.filter((l) => l.status === "closed").length,
    today_followups: leads.filter((l) => l.follow_up === today).length,
    overdue_followups: leads.filter(
      (l) => l.follow_up && l.follow_up < today
    ).length,
  };

  return { data: stats };
}

// =====================================================
// USER MANAGEMENT
// =====================================================

export async function getCompanyUsers() {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching users:", error);
    return { error: error.message };
  }

  return { data: data as Profile[] };
}

export async function updateUserRole(userId: string, role: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  if (profile.role !== "owner" && profile.role !== "admin") {
    return { error: "Only owners and admins can update user roles" };
  }

  if (role === "owner") {
    return { error: "Cannot assign owner role" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId)
    .eq("company_id", profile.company_id)
    .select()
    .single();

  if (error) {
    console.error("Error updating user role:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { data };
}

export async function getCurrentProfile() {
  return await getCurrentUserProfile();
}

export async function updateProfile(input: { company_name?: string }) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(input)
    .eq("id", profile.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  return { success: true, data };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  if (profile.role !== "owner") {
    return { error: "Only owners can delete the account" };
  }

  // Delete company (cascade will delete leads, notes, activity_logs, and profiles)
  const { error: companyError } = await supabase
    .from("companies")
    .delete()
    .eq("id", profile.company_id);

  if (companyError) {
    console.error("Error deleting company:", companyError);
    return { error: companyError.message };
  }

  // Sign out the user
  await supabase.auth.signOut();

  return { success: true };
}

export async function sendInvite(email: string, role: string, companyId: string) {
  const supabase = await createClient();
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return { error: "Not authenticated" };
  }

  if (profile.role === "employee") {
    return { error: "Only owners and admins can send invitations" };
  }

  // Check if user already exists with this email
  const { data: existingProfiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (existingProfiles && existingProfiles.length > 0) {
    return { error: "A user with this email already exists" };
  }

  // Create an invitation record in the database
  const inviteToken = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

  const { error: inviteError } = await supabase
    .from("invitations")
    .insert({
      email,
      role,
      company_id: companyId,
      token: inviteToken,
      expires_at: expiresAt.toISOString(),
      invited_by: profile.id,
    });

  if (inviteError) {
    console.error("Error creating invitation:", inviteError);
    // If invitations table doesn't exist, just generate a signup link
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/signup?invite=${inviteToken}&email=${encodeURIComponent(email)}&role=${role}&company=${companyId}`;

    return {
      success: true,
      inviteLink,
      message: "Invite link generated. Share this link with the user.",
    };
  }

  // Generate invite link
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/signup?invite=${inviteToken}`;

  // In production, send this link via email service (SendGrid, Resend, etc.)
  // For now, we return the link so it can be copied and shared manually

  return {
    success: true,
    inviteLink,
    message: "Invite link generated. Share this link with the user.",
  };
}
