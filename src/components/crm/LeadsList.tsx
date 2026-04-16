"use client";

import { useState } from "react";
import type { Lead } from "@/types/crm";
import LeadCard from "./LeadCard";

interface Props {
  initialLeads: Lead[];
  userRole: string;
}

export default function LeadsList({ initialLeads, userRole }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = initialLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Leads Grid */}
      {filteredLeads.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <p className="text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "No leads found matching your filters"
              : "No leads yet. Click 'Add Lead' to get started!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} userRole={userRole} />
          ))}
        </div>
      )}
    </div>
  );
}
