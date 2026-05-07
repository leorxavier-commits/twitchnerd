"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LiveStreamFieldProps = {
  label: string;
  buttonLabel: string;
  field: "category" | "title";
  initialValue: string;
};

export function LiveStreamField({
  field,
  label,
  buttonLabel,
  initialValue,
}: LiveStreamFieldProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [value, setValue] = useState(initialValue);

  async function saveValue() {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/twitch/channel", {
        body: JSON.stringify({ [field]: value }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Änderung konnte nicht gespeichert werden.");
        return;
      }

      setSuccess("Gespeichert");
      setIsEditing(false);
      router.refresh();
    } catch {
      setError("Änderung konnte nicht gespeichert werden.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase text-zinc-500">{label}</p>
          <p className="mt-1 text-xs text-zinc-600">Twitch Channel Control</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              void saveValue();
              return;
            }

            setIsEditing(true);
          }}
          className="rounded-lg border border-[#9146ff]/50 bg-[#9146ff]/15 px-3 py-2 text-xs font-semibold text-[#d9c5ff] transition hover:bg-[#9146ff]/25"
          disabled={isSaving}
        >
          {isSaving ? "Speichert..." : isEditing ? "Speichern" : buttonLabel}
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

      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      {success ? (
        <p className="mt-3 text-sm text-emerald-300">{success}</p>
      ) : null}
    </div>
  );
}
