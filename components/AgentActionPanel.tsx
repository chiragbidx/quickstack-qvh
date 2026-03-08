"use client"; // Client-only island: uses useState; import into server pages safely.

import { useState } from "react";

export function AgentActionPanel() {
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!note.trim()) return;
    setSubmitted(true);
  };

  return (
    // Feature: lightweight note pad to capture instructions for future agent runs.
    <div className="rounded-2xl border border-[#fb7232]/25 bg-white/90 p-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#fb7232]">
          Agent-ready note
        </p>
        <p className="text-sm text-[#4b1f0a]">
          Jot a quick instruction or reminder for future agent runs. This stays client-side and
          illustrates the pattern for interactive islands.
        </p>
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setSubmitted(false);
          }}
          placeholder="e.g., 'Regenerate pricing FAQs after editing copy'"
          className="min-h-[96px] w-full rounded-lg border border-[#fb7232]/30 bg-white px-3 py-2 text-sm text-[#33170a] outline-none ring-0 transition focus:border-[#fb7232] focus:shadow-[0_0_0_3px_rgba(251,114,50,0.12)]"
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-lg bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
          >
            Save note
          </button>
          {submitted && (
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">
              Saved for this session
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
