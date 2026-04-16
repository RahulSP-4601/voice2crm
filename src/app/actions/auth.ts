"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: {
  email: string;
  password: string;
  companyName?: string;
  inviteToken?: string;
  inviteRole?: string;
  inviteCompanyId?: string;
}) {
  const supabase = await createClient();

  // Check if this is an invite signup
  const isInviteSignup = !!formData.inviteToken;

  // Validate input
  if (!formData.email || !formData.password) {
    return { error: "Email and password are required" };
  }

  if (!isInviteSignup && !formData.companyName) {
    return { error: "Company name is required" };
  }

  if (formData.password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  // If invite signup, verify the invitation
  let invitation = null;
  if (isInviteSignup && formData.inviteToken) {
    const { data: inv, error: invError } = await supabase
      .from("invitations")
      .select("*")
      .eq("token", formData.inviteToken)
      .eq("accepted", false)
      .single();

    if (invError || !inv) {
      return { error: "Invalid or expired invitation link" };
    }

    // Check if invitation has expired
    if (new Date(inv.expires_at) < new Date()) {
      return { error: "This invitation has expired" };
    }

    invitation = inv;
  }

  const data = {
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    options: {
      data: {
        company_name: formData.companyName?.trim() || "Employee",
        role: invitation ? invitation.role : "owner",
        company_id: invitation ? invitation.company_id : undefined,
      },
    },
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Sign up error:", error);

    // Handle specific error cases with user-friendly messages
    if (error.message.includes("User already registered")) {
      return { error: "This email is already registered. Please sign in instead." };
    }
    if (error.message.includes("Password should be at least")) {
      return { error: "Password must be at least 8 characters long" };
    }
    if (error.message.includes("Database error")) {
      return { error: "Database error. Please try again or contact support." };
    }
    if (error.message.includes("rate limit")) {
      return { error: "Too many signup attempts. Please wait a few minutes." };
    }

    // Return the actual error message from Supabase for debugging
    return { error: error.message };
  }

  // Check if user was actually created (could be null if email confirmation is required)
  if (!authData.user) {
    return { error: "Sign up failed. Please try again." };
  }

  // Profile will be created automatically by database trigger
  // But if trigger is not set up, we'll try to create it manually
  try {
    // Check if profile already exists (from trigger)
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", authData.user.id)
      .single();

    // If profile doesn't exist, create it manually
    if (!existingProfile) {
      const profileData: any = {
        id: authData.user.id,
        email: formData.email.trim().toLowerCase(),
        company_name: formData.companyName?.trim() || "Employee",
        role: invitation ? invitation.role : "owner",
        created_at: new Date().toISOString(),
      };

      // Add company_id for invite signups
      if (invitation) {
        profileData.company_id = invitation.company_id;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert(profileData);

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Check if it's a duplicate (race condition with trigger)
        if (profileError.code === "23505") {
          // Profile exists, continue
        } else {
          // For RLS errors or other issues, user can still sign in
          // Profile can be created on first sign-in
          console.warn("Profile creation failed, will retry on sign-in");
        }
      }
    } else if (invitation) {
      // Update existing profile with company and role from invitation
      await supabase
        .from("profiles")
        .update({
          company_id: invitation.company_id,
          role: invitation.role,
        })
        .eq("id", authData.user.id);
    }

    // Mark invitation as accepted
    if (invitation) {
      await supabase
        .from("invitations")
        .update({
          accepted: true,
          accepted_at: new Date().toISOString(),
        })
        .eq("token", formData.inviteToken);
    }
  } catch (err) {
    console.error("Unexpected error handling profile:", err);
    // Don't fail signup if profile creation has issues
  }

  revalidatePath("/", "layout");

  // Check if email confirmation is required
  const needsConfirmation = !authData.session;

  return {
    success: true,
    user: authData.user,
    needsConfirmation,
    message: needsConfirmation
      ? "Account created! Please check your email to confirm your account."
      : "Account created successfully!"
  };
}

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createClient();

  // Validate input
  if (!formData.email || !formData.password) {
    return { error: "Email and password are required" };
  }

  const data = {
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Handle specific error cases with user-friendly messages
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Invalid email or password. Please try again." };
    }
    if (error.message.includes("Email not confirmed")) {
      return {
        error: "Please confirm your email address. Check your inbox for the confirmation link.",
        needsConfirmation: true
      };
    }
    if (error.message.includes("Email link is invalid or has expired")) {
      return { error: "Your session has expired. Please sign in again." };
    }
    if (error.message.includes("Too many requests")) {
      return { error: "Too many sign in attempts. Please wait a few minutes and try again." };
    }
    return { error: error.message };
  }

  if (!authData.user || !authData.session) {
    return { error: "Sign in failed. Please try again." };
  }

  revalidatePath("/", "layout");
  return { success: true, user: authData.user };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    // Don't throw, just redirect to home
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function resetPassword(email: string) {
  const supabase = await createClient();

  // Validate input
  if (!email || !email.trim()) {
    return { error: "Email is required" };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { error: "Please enter a valid email address" };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password`,
    });

    if (error) {
      // Handle specific error cases
      if (error.message.includes("Too many requests")) {
        return { error: "Too many password reset attempts. Please wait a few minutes and try again." };
      }
      if (error.message.includes("rate limit")) {
        return { error: "Please wait a moment before requesting another password reset." };
      }
      // For security, don't reveal if email exists or not
      console.error("Password reset error:", error);
    }

    // Always return success for security (don't reveal if email exists)
    // This prevents email enumeration attacks
    return {
      success: true,
      message: "If an account exists with this email, you will receive a password reset link shortly."
    };
  } catch (err) {
    console.error("Unexpected error in password reset:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient();

  // Validate input
  if (!newPassword) {
    return { error: "Password is required" };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  // Check if user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be signed in to update your password. Please request a new password reset link." };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      if (error.message.includes("same")) {
        return { error: "New password must be different from your current password" };
      }
      if (error.message.includes("weak")) {
        return { error: "Password is too weak. Please use a stronger password" };
      }
      return { error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true, message: "Password updated successfully!" };
  } catch (err) {
    console.error("Unexpected error updating password:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
