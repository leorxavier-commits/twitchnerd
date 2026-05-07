"use client";

import { useState } from "react";

type ViewerToggleCardProps = {
  viewers: number;
};

export function ViewerToggleCard({ viewers }: ViewerToggleCardProps) {
  const [showViewers, setShowViewers] = useState(true);

  return (
    <article className="self-start rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">Aktuelle Viewer</p>
          <p className="mt-3 text-3xl font-bold text-white transition-all duration-300">
            {showViewers ? viewers : "•••"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowViewers((current) => !current)}
          className={`relative h-8 w-16 rounded-full border transition ${
            showViewers
              ? "border-[#9146ff]/60 bg-[#9146ff]/30"
              : "border-white/10 bg-white/[0.04]"
          }`}
          aria-pressed={showViewers}
          aria-label="Viewer anzeigen oder verstecken"
        >
          <span
            className={`absolute top-1 size-6 rounded-full bg-white transition-all duration-300 ${
              showViewers ? "left-9" : "left-1"
            }`}
          />
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        {showViewers ? "Viewerzahl sichtbar" : "Viewerzahl ausgeblendet"}
      </p>
    </article>
  );
}
