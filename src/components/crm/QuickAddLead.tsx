"use client";

import { useState, useRef, useEffect } from "react";
import { createLead } from "@/app/actions/crm";

interface Props {
  onLeadAdded: () => void;
}

export default function QuickAddLead({ onLeadAdded }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isExpanded]);

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);

    const result = await createLead({
      name: name.trim(),
      phone: phone.trim(),
    });

    setLoading(false);

    if (!result.error) {
      setName("");
      setPhone("");
      setIsExpanded(false);
      onLeadAdded();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setName("");
      setPhone("");
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="group flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-[#DDD2C8] bg-white p-4 transition hover:border-[#C9B59C] hover:bg-[#F9F8F6] sm:w-auto"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D9CFC7] to-[#C9B59C] text-xl font-bold text-white transition group-hover:scale-110">
          +
        </div>
        <div className="text-left">
          <div className="font-semibold text-[#3B2F26]">Quick Add Lead</div>
          <div className="text-xs text-[#8B7768]">Name + Phone only</div>
        </div>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleQuickAdd}
      onKeyDown={handleKeyDown}
      className="rounded-xl border border-[#C9B59C] bg-white p-4 shadow-lg"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-[#3B2F26]">⚡ Quick Add</h3>
        <button
          type="button"
          onClick={() => {
            setIsExpanded(false);
            setName("");
            setPhone("");
          }}
          className="text-xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone *"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#C9B59C] focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/20"
        />
        <button
          type="submit"
          disabled={loading || !name.trim() || !phone.trim()}
          className="w-full rounded-lg bg-gradient-to-r from-[#D2B89A] to-[#BE9E7C] px-4 py-2 text-sm font-semibold text-[#2F251E] transition hover:brightness-105 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Lead"}
        </button>
      </div>
      <p className="mt-2 text-xs text-[#8B7768]">Press Esc to cancel</p>
    </form>
  );
}
