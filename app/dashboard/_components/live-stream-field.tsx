"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LiveStreamFieldProps = {
  label: string;
  buttonLabel: string;
  field: "category" | "title";
  initialValue: string;
};

type CategoryResult = {
  id: string;
  name: string;
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
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<CategoryResult[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [success, setSuccess] = useState("");
  const [value, setValue] = useState(initialValue);
  const isCategory = field === "category";

  useEffect(() => {
    if (!isCategory || !isEditing) {
      return;
    }

    const query = value.trim();

    if (query.length < 2) {
      return;
    }

    const timeout = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");

      try {
        const response = await fetch(
          `/api/twitch/categories?query=${encodeURIComponent(query)}`,
        );
        const payload = (await response.json()) as {
          categories?: CategoryResult[];
          error?: string | null;
        };

        setResults(payload.categories ?? []);

        if (!response.ok || payload.error) {
          setSearchError(
            payload.error ?? "Kategorien konnten nicht geladen werden.",
          );
        }
      } catch {
        setResults([]);
        setSearchError("Kategorien konnten nicht geladen werden.");
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [isCategory, isEditing, value]);

  async function saveValue() {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const body =
        isCategory && selectedCategoryId
          ? { category: value, categoryId: selectedCategoryId }
          : { [field]: value };
      const response = await fetch("/api/twitch/channel", {
        body: JSON.stringify(body),
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
      setResults([]);
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

            setError("");
            setSuccess("");
            setIsEditing(true);
          }}
          className="rounded-lg border border-[#9146ff]/50 bg-[#9146ff]/15 px-3 py-2 text-xs font-semibold text-[#d9c5ff] transition hover:bg-[#9146ff]/25 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSaving}
        >
          {isSaving ? "Speichert..." : isEditing ? "Speichern" : buttonLabel}
        </button>
      </div>

      {isEditing ? (
        <div className="relative mt-4">
          <input
            value={value}
            onChange={(event) => {
              const nextValue = event.target.value;

              setValue(nextValue);
              setSelectedCategoryId("");

              if (nextValue.trim().length < 2) {
                setResults([]);
                setSearchError("");
                setIsSearching(false);
              }
            }}
            className="w-full rounded-lg border border-[#9146ff]/40 bg-[#08060d] px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-60 focus:border-[#9146ff]"
            aria-label={label}
            disabled={isSaving}
          />
          {isCategory && (isSearching || results.length > 0 || searchError) ? (
            <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-xl border border-white/10 bg-[#08060d] shadow-2xl shadow-black/40">
              {isSearching ? (
                <p className="px-3 py-3 text-sm text-zinc-400">
                  Suche Kategorien...
                </p>
              ) : null}
              {!isSearching && results.length > 0
                ? results.slice(0, 6).map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setValue(category.name);
                        setSelectedCategoryId(category.id);
                        setResults([]);
                        setSearchError("");
                      }}
                      className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm text-zinc-200 transition hover:bg-[#9146ff]/15"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-zinc-600">
                        ID {category.id}
                      </span>
                    </button>
                  ))
                : null}
              {!isSearching && searchError ? (
                <p className="px-3 py-3 text-sm text-amber-200">
                  {searchError}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
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
