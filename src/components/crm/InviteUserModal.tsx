"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole: string;
}

export default function InviteUserModal({ isOpen, onClose, currentUserRole }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("employee");
  const [inviteLink, setInviteLink] = useState("");

  const generateInviteLink = () => {
    const link = `${window.location.origin}/signup?role=${role}&invite=true`;
    setInviteLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Invite Team Member</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              placeholder="colleague@company.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
            >
              {currentUserRole === "owner" && (
                <>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </>
              )}
              {currentUserRole === "admin" && (
                <option value="employee">Employee</option>
              )}
            </select>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <p className="mb-2 text-sm font-medium text-blue-900">
              Or generate an invite link:
            </p>
            {!inviteLink ? (
              <button
                onClick={generateInviteLink}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Generate Invite Link
              </button>
            ) : (
              <div>
                <div className="mb-2 rounded border border-blue-200 bg-white p-2 text-xs">
                  <code className="break-all text-blue-900">{inviteLink}</code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500">
            <p>
              <strong>Note:</strong> For email invites, you'll need to set up email
              sending (Supabase Email, SendGrid, etc.). For now, share the invite link
              directly.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
