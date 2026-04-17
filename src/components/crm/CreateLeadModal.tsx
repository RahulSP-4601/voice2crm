"use client";

import { useState } from "react";
import { createLead } from "@/app/actions/crm";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/crm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  teamMembers?: Profile[];
}

export default function CreateLeadModal({ isOpen, onClose, userRole, teamMembers = [] }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canAssignLeads = userRole === "owner" || userRole === "admin";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const assignedTo = formData.get("assigned_to") as string;

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string || undefined,
      source: formData.get("source") as string || undefined,
      follow_up: formData.get("follow_up") as string || undefined,
      assigned_to: assignedTo || undefined,
    };

    const result = await createLead(data);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      onClose();
      router.refresh();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#DDD2C8] bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#3B2F26]">Add New Lead</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              type="text"
              name="source"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              placeholder="Website, Referral, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Follow-up Date
            </label>
            <input
              type="date"
              name="follow_up"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
            />
          </div>

          {canAssignLeads && teamMembers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign to
              </label>
              <select
                name="assigned_to"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
              >
                <option value="">Unassigned</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.company_name || member.email} ({member.role})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-gradient-to-r from-[#D2B89A] to-[#BE9E7C] px-4 py-2 font-semibold text-[#2F251E] shadow-md hover:brightness-105 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
