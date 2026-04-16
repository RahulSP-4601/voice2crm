"use client";

import { useState } from "react";
import CreateLeadModal from "./CreateLeadModal";

export default function CreateLeadButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-gradient-to-r from-[#D2B89A] to-[#BE9E7C] px-6 py-2.5 text-sm font-semibold text-[#2F251E] shadow-md transition hover:shadow-lg hover:brightness-105"
      >
        + Add Lead
      </button>

      {isOpen && (
        <CreateLeadModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
