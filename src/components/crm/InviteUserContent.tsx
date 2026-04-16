"use client";

import { useState } from "react";
import { sendInvite } from "@/app/actions/crm";
import Link from "next/link";

interface Props {
  currentUserRole: string;
  companyId: string;
}

export default function InviteUserContent({ currentUserRole, companyId }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("employee");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [inviteLink, setInviteLink] = useState<string>("");

  const handleSendInvite = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter an email address" });
      return;
    }

    setIsSending(true);
    setMessage(null);
    setInviteLink("");

    const result = await sendInvite(email, role, companyId);

    setIsSending(false);

    if (result.success) {
      setMessage({
        type: "success",
        text: result.message || "Invitation link generated successfully!",
      });
      setInviteLink(result.inviteLink || "");
    } else {
      setMessage({ type: "error", text: result.error || "Failed to send invitation" });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setMessage({
      type: "success",
      text: "Invite link copied to clipboard!",
    });
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
        <h1 className="text-3xl font-bold text-[#3B2F26]">Invite Team Member</h1>
        <p className="mt-2 text-[#8B7768]">Send an invitation to join your team</p>
      </div>

      {/* Invite Form */}
      <div className="rounded-xl border border-[#DDD2C8] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#3B2F26]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#DDD2C8] px-4 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              placeholder="colleague@company.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#3B2F26]">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-[#DDD2C8] px-4 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
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
            <p className="mt-1 text-xs text-[#8B7768]">
              {role === "admin"
                ? "Admins can manage leads and team members"
                : "Employees can only manage their assigned leads"}
            </p>
          </div>

          {message && (
            <div
              className={`rounded-lg p-4 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {inviteLink && (
            <div className="rounded-lg border border-[#DDD2C8] bg-[#F9F8F6] p-4">
              <label className="mb-2 block text-sm font-medium text-[#3B2F26]">
                Invite Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 rounded-lg border border-[#DDD2C8] bg-white px-3 py-2 text-sm text-[#8B7768]"
                />
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg bg-[#C9B59C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#B8A68B]"
                >
                  Copy
                </button>
              </div>
              <p className="mt-2 text-xs text-[#8B7768]">
                Share this link with {email} to join your team
              </p>
            </div>
          )}

          <button
            onClick={handleSendInvite}
            disabled={isSending}
            className="w-full rounded-lg bg-gradient-to-r from-[#D9CFC7] to-[#C9B59C] px-6 py-3 font-medium text-[#3B2F26] transition hover:opacity-90 disabled:opacity-50"
          >
            {isSending ? "Generating Invite..." : "Generate Invite Link"}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          How it works
        </h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Click "Generate Invite Link" to create a unique invitation link</li>
          <li>• Copy the link and share it with the person you want to invite</li>
          <li>• They'll be automatically added to your team with the selected role</li>
          <li>• The invite link is valid for 24 hours</li>
        </ul>
        <p className="mt-3 text-xs text-blue-700">
          <strong>Note:</strong> Email sending will be added in a future update. For now, share the invite link directly via email, Slack, or other messaging apps.
        </p>
      </div>
    </div>
  );
}
