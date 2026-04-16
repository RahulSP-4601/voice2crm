"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateProfile, deleteAccount } from "@/app/actions/crm";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/crm";
import Link from "next/link";

interface Props {
  user: User;
  profile: Profile;
}

export default function SettingsContent({ user, profile }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [companyName, setCompanyName] = useState(profile.company_name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    const section = searchParams.get("section");
    if (section === "delete" && profile.role === "owner") {
      setActiveSection("delete");
    }
  }, [searchParams, profile.role]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    const result = await updateProfile({ company_name: companyName });
    setIsSaving(false);

    if (result.success) {
      alert("Profile updated successfully!");
      router.refresh();
    } else {
      alert(result.error || "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    const result = await deleteAccount();

    if (result.success) {
      alert("Account deleted successfully");
      router.push("/");
    } else {
      setIsDeleting(false);
      alert(result.error || "Failed to delete account");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-[#8B7768] hover:text-[#3B2F26]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-[#3B2F26]">Settings</h1>
        <p className="mt-2 text-[#8B7768]">Manage your account settings and preferences</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex gap-4 border-b border-[#DDD2C8]">
        <button
          onClick={() => setActiveSection("general")}
          className={`pb-3 text-sm font-medium transition ${
            activeSection === "general"
              ? "border-b-2 border-[#C9B59C] text-[#3B2F26]"
              : "text-[#8B7768] hover:text-[#3B2F26]"
          }`}
        >
          General
        </button>
        {profile.role === "owner" && (
          <button
            onClick={() => setActiveSection("delete")}
            className={`pb-3 text-sm font-medium transition ${
              activeSection === "delete"
                ? "border-b-2 border-red-500 text-red-600"
                : "text-[#8B7768] hover:text-red-600"
            }`}
          >
            Danger Zone
          </button>
        )}
      </div>

      {/* General Settings */}
      {activeSection === "general" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#DDD2C8] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-[#3B2F26]">Profile Information</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3B2F26]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-[#DDD2C8] bg-gray-50 px-4 py-2 text-[#8B7768]"
                />
                <p className="mt-1 text-xs text-[#8B7768]">Email cannot be changed</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3B2F26]">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-lg border border-[#DDD2C8] px-4 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3B2F26]">
                  Role
                </label>
                <input
                  type="text"
                  value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  disabled
                  className="w-full rounded-lg border border-[#DDD2C8] bg-gray-50 px-4 py-2 text-[#8B7768]"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="rounded-lg bg-gradient-to-r from-[#D9CFC7] to-[#C9B59C] px-6 py-2 font-medium text-[#3B2F26] transition hover:opacity-90 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Section */}
      {activeSection === "delete" && profile.role === "owner" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="mb-2 text-xl font-semibold text-red-900">Delete Account</h2>
            <p className="mb-4 text-sm text-red-700">
              Once you delete your account, there is no going back. This will permanently delete
              your company data, all leads, and remove all team members.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-lg border-2 border-red-600 bg-white px-4 py-2 font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-red-900">
                    Type <strong>DELETE</strong> to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                    className="w-full rounded-lg border border-red-300 px-4 py-2 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    placeholder="DELETE"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || deleteInput !== "DELETE"}
                    className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Permanently Delete"}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteInput("");
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
