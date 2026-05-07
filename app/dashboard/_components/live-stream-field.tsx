"use client";

import { useState } from "react";

type LiveStreamFieldProps = {
  label: string;
  buttonLabel: string;
  initialValue: string;
};

export function LiveStreamField({
  label,
  buttonLabel,
  initialValue,
}: LiveStreamFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase text-zinc-500">{label}</p>
          <p className="mt-1 text-xs text-zinc-600">Twitch-Control Mock</p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditing((current) => !current)}
          className="rounded-lg border border-[#9146ff]/50 bg-[#9146ff]/15 px-3 py-2 text-xs font-semibold text-[#d9c5ff] transition hover:bg-[#9146ff]/25"
        >
          {isEditing ? "Fertig" : buttonLabel}
        </button>
      </div>

      {isEditing ? (
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="mt-4 w-full rounded-lg border border-[#9146ff]/40 bg-[#08060d] px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#9146ff]"
          aria-label={label}
        />
      ) : (
        <p className="mt-4 line-clamp-2 rounded-lg border border-white/10 bg-[#08060d] px-3 py-3 text-sm font-medium text-zinc-200">
          {value}
        </p>
      )}
    </div>
  );
}
