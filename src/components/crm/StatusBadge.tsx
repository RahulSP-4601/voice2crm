"use client";

import { useState } from "react";
import type { LeadStatus } from "@/types/crm";

interface Props {
  status: LeadStatus;
  onChange?: (newStatus: string) => void;
}

const statusConfig: Record<
  LeadStatus,
  { label: string; color: string; bgColor: string }
> = {
  new: { label: "New", color: "text-purple-700", bgColor: "bg-purple-100" },
  contacted: { label: "Contacted", color: "text-yellow-700", bgColor: "bg-yellow-100" },
  interested: { label: "Interested", color: "text-green-700", bgColor: "bg-green-100" },
  closed: { label: "Closed", color: "text-gray-700", bgColor: "bg-gray-100" },
};

export default function StatusBadge({ status, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const config = statusConfig[status];

  if (!onChange) {
    return (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${config.bgColor} ${config.color}`}
      >
        {config.label}
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${config.bgColor} ${config.color} hover:brightness-95`}
      >
        {config.label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
            {Object.entries(statusConfig).map(([key, val]) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  key === status ? "font-semibold" : ""
                }`}
              >
                <span className={`inline-block w-20 rounded-full px-2 py-0.5 text-xs ${val.bgColor} ${val.color}`}>
                  {val.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
