"use client";

import { useState } from "react";

type ViewerToggleCardProps = {
  viewers: number;
};

export function ViewerToggleCard({ viewers }: ViewerToggleCardProps) {
  const [showViewers, setShowViewers] = useState(true);

  return (
    <article className="self-start rounded-xl border border-white/10 bg-zinc-950/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">Aktuelle Viewer</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {showViewers ? viewers : "•••"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowViewers((current) => !current)}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-[#9146ff]/50 hover:text-white"
          aria-pressed={showViewers}
        >
          {showViewers ? "Verstecken" : "Anzeigen"}
        </button>
      </div>
    </article>
  );
}
