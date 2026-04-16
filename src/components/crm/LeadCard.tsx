"use client";

import { useState } from "react";
import { updateLeadStatus, assignLead } from "@/app/actions/crm";
import type { Lead, Profile } from "@/types/crm";
import QuickStatusBar from "./QuickStatusBar";

interface Props {
  lead: Lead;
  userRole: string;
  teamMembers?: Profile[];
  onUpdate?: (lead: Lead) => void;
}

export default function LeadCard({ lead, userRole, teamMembers = [], onUpdate }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);

    // Optimistic update
    if (onUpdate) {
      onUpdate({ ...lead, status: newStatus as any });
    }

    await updateLeadStatus(lead.id, newStatus);
    setIsUpdating(false);
  };

  const handleAssignmentChange = async (userId: string) => {
    setIsUpdating(true);

    // Optimistic update
    if (onUpdate) {
      onUpdate({ ...lead, assigned_to: userId || undefined });
    }

    await assignLead(lead.id, userId);
    setIsUpdating(false);
  };

  const canAssignLeads = userRole === "owner" || userRole === "admin";

  const isOverdue =
    lead.follow_up && new Date(lead.follow_up) < new Date(new Date().toDateString());
  const isToday =
    lead.follow_up && lead.follow_up === new Date().toISOString().split("T")[0];

  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">{lead.name}</h3>
          <div className="mt-1 space-y-1">
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline active:text-blue-800"
            >
              📞 <span className="truncate">{lead.phone}</span>
            </a>
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:underline active:text-gray-800"
              >
                ✉️ <span className="truncate">{lead.email}</span>
              </a>
            )}
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="flex shrink-0 gap-2">
          <a
            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white transition hover:bg-green-600 active:scale-95"
            title="WhatsApp"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Status - 1-Click Update */}
      <div className="mb-3">
        <QuickStatusBar
          currentStatus={lead.status}
          onChange={handleStatusChange}
          disabled={isUpdating}
        />
      </div>

      {/* Source Badge */}
      {lead.source && (
        <div className="mb-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            📍 {lead.source}
          </span>
        </div>
      )}

      {/* Follow-up */}
      {lead.follow_up && (
        <div
          className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
            isOverdue
              ? "bg-red-50 text-red-700"
              : isToday
              ? "bg-orange-50 text-orange-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          <span>📅</span>
          <span>
            {isOverdue ? "Overdue: " : isToday ? "Today: " : "Follow-up: "}
            {new Date(lead.follow_up).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Assignment */}
      {canAssignLeads ? (
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Assign to:
          </label>
          <select
            value={lead.assigned_to || ""}
            onChange={(e) => handleAssignmentChange(e.target.value)}
            disabled={isUpdating}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
          >
            <option value="">Unassigned</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.company_name || member.email}
              </option>
            ))}
          </select>
        </div>
      ) : lead.assigned_user ? (
        <div className="mb-3 text-xs text-gray-500">
          Assigned to: {lead.assigned_user.company_name || lead.assigned_user.email}
        </div>
      ) : null}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
        <span>Added {new Date(lead.created_at).toLocaleDateString()}</span>
        <span>Updated {new Date(lead.last_activity).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
