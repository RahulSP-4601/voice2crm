"use client";

import type { LeadStatus } from "@/types/crm";

interface Props {
  currentStatus: LeadStatus;
  onChange: (newStatus: string) => void;
  disabled?: boolean;
}

const statusConfig: Record<
  LeadStatus,
  { label: string; emoji: string; color: string }
> = {
  new: { label: "New", emoji: "🆕", color: "bg-purple-500" },
  contacted: { label: "Contacted", emoji: "📞", color: "bg-yellow-500" },
  interested: { label: "Interested", emoji: "⭐", color: "bg-green-500" },
  closed: { label: "Closed", emoji: "✅", color: "bg-gray-500" },
};

export default function QuickStatusBar({ currentStatus, onChange, disabled }: Props) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {Object.entries(statusConfig).map(([key, config]) => {
        const isActive = key === currentStatus;
        return (
          <button
            key={key}
            onClick={() => !isActive && onChange(key)}
            disabled={disabled || isActive}
            className={`flex flex-1 items-center justify-center gap-1 rounded px-2 py-1.5 text-xs font-medium transition ${
              isActive
                ? `${config.color} text-white shadow-sm`
                : "text-gray-600 hover:bg-white"
            } disabled:cursor-not-allowed`}
            title={config.label}
          >
            <span className="text-sm">{config.emoji}</span>
            <span className="hidden sm:inline">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
