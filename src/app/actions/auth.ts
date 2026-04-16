"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: {
  email: string;
  password: string;
  companyName: string;
}) {
  const supabase = await createClient();

  // Validate input
  if (!formData.email || !formData.password || !formData.companyName) {
    return { error: "All fields are required" };
  }

  if (formData.password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  const data = {
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    options: {
      data: {
        company_name: formData.companyName.trim(),
      },
    },
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    // Handle specific error cases
    if (error.message.includes("User already registered")) {
      return { error: "This email is already registered. Please sign in instead." };
    }
    if (error.message.includes("email")) {
      return { error: "Please enter a valid email address" };
    }
    if (error.message.includes("Password")) {
      return { error: "Password must be at least 8 characters long" };
    }
    return { error: error.message };
  }

  // Check if user was actually created (could be null if email confirmation is required)
  if (!authData.user) {
    return { error: "Sign up failed. Please try again." };
  }

  // Create user profile in database
  try {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: formData.email.trim().toLowerCase(),
      company_name: formData.companyName.trim(),
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Even if profile creation fails, auth user is created
      // They can still sign in, and we can create profile later
      if (profileError.code === "23505") {
        // Duplicate key - profile already exists
        return { success: true, user: authData.user, needsConfirmation: !authData.session };
      }
      return { error: "Account created but profile setup failed. Please contact support." };
    }
  } catch (err) {
    console.error("Unexpected error creating profile:", err);
    return { error: "An unexpected error occurred. Please try again." };
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
    return { error: error.message };
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
