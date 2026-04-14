"use client";

import { useState } from "react";

type VerticalKey = "realEstate" | "consulting" | "logistics" | "retail";

type VerticalConfig = {
  label: string;
  tagline: string;
  summary: string;
  headers: string[];
  rows: string[][];
  voicePrompt: string;
};

const verticals: Record<VerticalKey, VerticalConfig> = {
  realEstate: {
    label: "Real Estate",
    tagline: "Listings, tours, offers, and follow-ups",
    summary:
      "Track buyers, properties, showing dates, and offer stages without turning your day into data entry.",
    headers: ["Lead", "Property", "Stage", "Next Action"],
    rows: [
      ["Emma Stone", "14 Cedar Lane", "Showing Booked", "Confirm Saturday"],
      ["David Kim", "Riverfront Condo", "Offer Review", "Send counter terms"],
      ["Lena Hart", "Westside Loft", "New Inquiry", "Qualify budget"],
    ],
    voicePrompt:
      "Booked Emma for a showing at 14 Cedar Lane this Saturday at 11.",
  },
  consulting: {
    label: "Consulting",
    tagline: "Clients, projects, milestones, and renewals",
    summary:
      "Log conversations, map active work, and keep every engagement moving without needing custom ops overhead.",
    headers: ["Client", "Project Name", "Status", "Next Milestone"],
    rows: [
      ["Northstar Labs", "RevOps Audit", "Scoping", "Share proposal"],
      ["Bayside Health", "CRM Cleanup", "In Progress", "Review workflows"],
      ["Vertex Group", "Q3 Advisory", "Renewal Review", "Book strategy call"],
    ],
    voicePrompt:
      "Northstar wants the RevOps audit proposal by Thursday afternoon.",
  },
  logistics: {
    label: "Logistics",
    tagline: "Shipments, dispatch, delays, and customer updates",
    summary:
      "Move from spoken field updates to a live operating view for dispatchers, account managers, and leadership.",
    headers: ["Account", "Route", "Delivery Status", "Action Needed"],
    rows: [
      ["Atlas Foods", "Dallas to Houston", "In Transit", "Monitor ETA"],
      ["Metro Supply", "Phoenix Linehaul", "Delayed", "Notify warehouse"],
      ["Nova Retail", "Chicago Express", "Delivered", "Close loop with client"],
    ],
    voicePrompt:
      "Phoenix linehaul is delayed two hours because of weather. Update Metro.",
  },
  retail: {
    label: "Retail",
    tagline: "Stores, buyers, replenishment, and launch plans",
    summary:
      "Manage product conversations, account notes, and inventory follow-through in a system that fits your merchandising rhythm.",
    headers: ["Buyer", "Store", "Order Value", "Restock Status"],
    rows: [
      ["Olive & Oak", "SoHo Flagship", "$18,400", "Requested"],
      ["Modern Shelf", "Seattle Market", "$9,120", "In Review"],
      ["North House", "Denver Pop-up", "$6,780", "Scheduled"],
    ],
    voicePrompt:
      "Olive & Oak requested a restock for the SoHo flagship before next Friday.",
  },
};

const order: VerticalKey[] = [
  "realEstate",
  "consulting",
  "logistics",
  "retail",
];

export function VerticalSwitcher() {
  const [active, setActive] = useState<VerticalKey>("realEstate");
  const current = verticals[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="rounded-[2rem] border border-[#D8E0F0] bg-white p-4 shadow-[0_22px_70px_rgba(61,82,160,0.08)]">
        <div className="space-y-2">
          {order.map((key) => {
            const vertical = verticals[key];
            const isActive = key === active;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`w-full rounded-[1.4rem] border px-5 py-4 text-left transition duration-300 ${
                  isActive
                    ? "border-[#3D52A0] bg-[#3D52A0] text-white shadow-[0_16px_36px_rgba(61,82,160,0.24)]"
                    : "border-transparent bg-[#F7F8FC] text-slate-700 hover:border-[#ADBBDA] hover:bg-[#EEF2FB]"
                }`}
              >
                <p className="text-base font-semibold">{vertical.label}</p>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    isActive ? "text-white/75" : "text-slate-500"
                  }`}
                >
                  {vertical.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#D8E0F0] bg-white p-6 shadow-[0_22px_70px_rgba(61,82,160,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8697C4]">
              {current.label}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#0F1635] sm:text-[2.2rem]">
              {current.tagline}
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {current.summary}
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-[#EDE8F5] px-4 py-3 text-sm font-semibold text-[#3D52A0]">
            Voice input: {current.voicePrompt}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[#D8E0F0]">
          <div className="grid grid-cols-2 border-b border-[#D8E0F0] bg-[#F7F8FC] sm:grid-cols-4">
            {current.headers.map((header) => (
              <div
                key={header}
                className="px-4 py-4 text-sm font-semibold text-[#5A72BB]"
              >
                {header}
              </div>
            ))}
          </div>
          <div className="bg-white">
            {current.rows.map((row) => (
              <div
                key={row.join("-")}
                className="grid grid-cols-1 border-b border-[#EEF2FB] last:border-b-0 sm:grid-cols-4"
              >
                {row.map((cell, index) => (
                  <div
                    key={`${cell}-${index}`}
                    className={`px-4 py-4 text-sm ${
                      index === 0
                        ? "font-semibold text-[#0F1635]"
                        : "text-slate-600"
                    }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
