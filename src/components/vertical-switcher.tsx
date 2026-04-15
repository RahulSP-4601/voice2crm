"use client";

import { useState } from "react";

type VerticalKey = "realEstate" | "consulting" | "logistics" | "retail";

type VerticalConfig = {
  label: string;
  summary: string;
  headers: string[];
  rows: string[][];
  voicePrompt: string;
};

const verticals: Record<VerticalKey, VerticalConfig> = {
  realEstate: {
    label: "Real Estate",
    summary:
      "Track buyers, properties, showing dates, and offer stages without turning your day into data entry.",
    headers: ["Lead", "Property", "Stage", "Next Action"],
    rows: [
      ["Emma Stone", "14 Cedar Lane", "Showing Booked", "Confirm Saturday"],
      ["David Kim", "Riverfront Condo", "Offer Review", "Send counter terms"],
      ["Lena Hart", "Westside Loft", "New Inquiry", "Qualify budget"],
    ],
    voicePrompt:
      "Voice input: Booked Emma for a showing at 14 Cedar Lane this Saturday at 11.",
  },
  consulting: {
    label: "Consulting",
    summary:
      "Capture client asks, project milestones, and renewal moments in the same conversational workflow.",
    headers: ["Client", "Project Name", "Status", "Next Milestone"],
    rows: [
      ["Northstar Labs", "RevOps Audit", "Scoping", "Share proposal"],
      ["Bayside Health", "CRM Cleanup", "In Progress", "Review workflows"],
      ["Vertex Group", "Q3 Advisory", "Renewal Review", "Book strategy call"],
    ],
    voicePrompt:
      "Voice input: Northstar wants the RevOps audit proposal by Thursday afternoon.",
  },
  logistics: {
    label: "Logistics",
    summary:
      "Move from spoken field updates to a live operating view for dispatchers, account managers, and ops leaders.",
    headers: ["Account", "Route", "Delivery Status", "Action Needed"],
    rows: [
      ["Atlas Foods", "Dallas to Houston", "In Transit", "Monitor ETA"],
      ["Metro Supply", "Phoenix Linehaul", "Delayed", "Notify warehouse"],
      ["Nova Retail", "Chicago Express", "Delivered", "Close loop with client"],
    ],
    voicePrompt:
      "Voice input: Phoenix linehaul is delayed two hours because of weather. Update Metro.",
  },
  retail: {
    label: "Retail",
    summary:
      "Manage buyer requests, replenishment follow-through, and launch planning with a schema that adapts instantly.",
    headers: ["Buyer", "Store", "Order Value", "Restock Status"],
    rows: [
      ["Olive & Oak", "SoHo Flagship", "$18,400", "Requested"],
      ["Modern Shelf", "Seattle Market", "$9,120", "In Review"],
      ["North House", "Denver Pop-up", "$6,780", "Scheduled"],
    ],
    voicePrompt:
      "Voice input: Olive & Oak requested a restock for the SoHo flagship before next Friday.",
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
    <div className="rounded-[2.2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(244,238,231,0.92))] p-4 shadow-[0_26px_90px_rgba(90,70,52,0.1)] backdrop-blur-2xl sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-3 rounded-[1.6rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,#F1EAE3_0%,#ECE3DB_100%)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] md:grid-cols-4">
          {order.map((key) => {
            const vertical = verticals[key];
            const isActive = key === active;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`rounded-[1.15rem] px-4 py-4 text-base font-semibold transition duration-300 ${
                  isActive
                    ? "bg-[linear-gradient(180deg,#D8C5AF_0%,#C5AB8D_100%)] text-[#30261F] shadow-[0_0_0_1px_rgba(201,181,156,0.45),0_10px_22px_rgba(125,98,70,0.12)]"
                    : "text-[#6E5C4F] hover:bg-[#F8F4EF] hover:text-[#3B2F26]"
                }`}
              >
                {vertical.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#DDD2C8] bg-[linear-gradient(180deg,#F5EFE8_0%,#E9DFD4_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B7768]">
                {current.label}
              </p>
              <p className="mt-4 text-lg leading-8 text-[#4E3F34]">
                {current.summary}
              </p>
            </div>
            <div className="max-w-sm rounded-[1.4rem] border border-[#D3C0AD] bg-[linear-gradient(180deg,#FCFAF7_0%,#F2EBE4_100%)] px-5 py-4 text-[1.05rem] leading-7 text-[#3B2F26] shadow-[0_0_20px_rgba(125,98,70,0.05)]">
              {current.voicePrompt}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.7rem] border border-[#D3C0AD] bg-[#FCFAF7]">
            <div className="hidden grid-cols-4 border-b border-[#DDD2C8] bg-[#F1EAE3] sm:grid">
              {current.headers.map((header) => (
                <div
                  key={header}
                  className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B7768]"
                >
                  {header}
                </div>
              ))}
            </div>

            <div className="divide-y divide-[#D9CFC7]">
              {current.rows.map((row) => (
                <div
                  key={row.join("-")}
                  className="grid gap-4 px-5 py-5 sm:grid-cols-4 sm:gap-0"
                >
                  {row.map((cell, index) => (
                    <div key={`${cell}-${index}`}>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8B7768] sm:hidden">
                        {current.headers[index]}
                      </p>
                      <p
                        className={`mt-1 text-[1.05rem] ${
                          index === 0
                            ? "font-semibold text-[#3B2F26]"
                            : "text-[#5F5145]"
                        }`}
                      >
                        {cell}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
