"use client";

import type {
  TwitchActivityEvent,
  TwitchActivityEventType,
} from "../../../lib/twitch";
import { useMemo, useState } from "react";

type LiveEventsListProps = {
  events: TwitchActivityEvent[];
  warning: string | null;
};

type FilterOption = {
  label: string;
  type: TwitchActivityEventType | "all";
};

const filterOptions: FilterOption[] = [
  { label: "Alle", type: "all" },
  { label: "Follows", type: "follow" },
  { label: "Subs", type: "sub" },
  { label: "Bits", type: "bits" },
  { label: "Raids", type: "raid" },
  { label: "Kanalpunkte", type: "channel_points" },
];

const eventMeta: Record<
  TwitchActivityEventType,
  {
    color: string;
    icon: string;
    label: string;
  }
> = {
  bits: {
    color: "border-[#f5d742]/30 bg-[#f5d742]/10 text-[#f5d742]",
    icon: "B",
    label: "Bits",
  },
  channel_points: {
    color: "border-[#00f5d4]/30 bg-[#00f5d4]/10 text-[#00f5d4]",
    icon: "P",
    label: "Kanalpunkte",
  },
  follow: {
    color: "border-[#ff66c4]/30 bg-[#ff66c4]/10 text-[#ff9bd8]",
    icon: "F",
    label: "Follow",
  },
  gift_sub: {
    color: "border-[#c6a4ff]/30 bg-[#9146ff]/15 text-[#d9c5ff]",
    icon: "G",
    label: "Gift Sub",
  },
  raid: {
    color: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    icon: "R",
    label: "Raid",
  },
  sub: {
    color: "border-[#9146ff]/40 bg-[#9146ff]/20 text-[#efe7ff]",
    icon: "S",
    label: "Sub",
  },
};

export function LiveEventsList({ events, warning }: LiveEventsListProps) {
  const [activeFilters, setActiveFilters] = useState<TwitchActivityEventType[]>(
    [],
  );
  const visibleEvents = useMemo(() => {
    const filteredEvents =
      activeFilters.length === 0
        ? events
        : events.filter((event) => activeFilters.includes(event.type));

    return filteredEvents.toSorted(
      (first, second) =>
        new Date(second.timestamp).getTime() -
        new Date(first.timestamp).getTime(),
    );
  }, [activeFilters, events]);

  function toggleFilter(type: FilterOption["type"]) {
    if (type === "all") {
      setActiveFilters([]);
      return;
    }

    setActiveFilters((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  }

  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10 xl:min-h-[420px]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#c6a4ff]">
              Community gerade
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              Was in deiner Community passiert
            </h2>
          </div>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Neueste zuerst
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => {
            const isActive =
              filter.type === "all"
                ? activeFilters.length === 0
                : activeFilters.includes(filter.type);

            return (
              <button
                key={filter.type}
                type="button"
                onClick={() => toggleFilter(filter.type)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border-[#9146ff]/60 bg-[#9146ff]/25 text-[#efe7ff]"
                    : "border-white/10 bg-[#08060d] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {warning ? (
          <p className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs leading-5 text-amber-100">
            {warning}
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event) => (
            <LiveActivityItem key={event.id} event={event} />
          ))
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
            Keine Events fuer diese Filterauswahl.
          </div>
        )}
      </div>
    </article>
  );
}

function LiveActivityItem({ event }: { event: TwitchActivityEvent }) {
  const meta = eventMeta[event.type];

  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm transition hover:border-[#9146ff]/30 hover:bg-[#9146ff]/10">
      <span
        className={`grid size-10 place-items-center rounded-lg border text-xs font-bold ${meta.color}`}
        aria-hidden="true"
      >
        {meta.icon}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate font-semibold text-white">
              {event.username}
            </p>
            <span className={`rounded-full border px-2 py-1 text-xs ${meta.color}`}>
              {meta.label}
            </span>
          </div>
          <span className="text-xs text-zinc-500">
            {formatEventTime(event.timestamp)}
          </span>
        </div>
        <p className="mt-2 text-zinc-300">{describeEvent(event)}</p>
        <p className="mt-2 text-xs text-zinc-600">
          Quelle: {event.source === "twitch" ? "Twitch Helix" : "Vorbereitet"}
        </p>
      </div>
    </div>
  );
}

function describeEvent(event: TwitchActivityEvent) {
  if (event.type === "follow") {
    return "folgt dem Kanal.";
  }

  if (event.type === "sub") {
    return `hat abonniert${event.subTier ? ` (${event.subTier})` : ""}.`;
  }

  if (event.type === "gift_sub") {
    return `hat ein Gift Sub verteilt${event.subTier ? ` (${event.subTier})` : ""}.`;
  }

  if (event.type === "bits") {
    return `hat ${event.bits?.toLocaleString("de-DE") ?? 0} Bits gesendet.`;
  }

  if (event.type === "raid") {
    return `raidet mit ${event.raidViewers?.toLocaleString("de-DE") ?? 0} Viewern.`;
  }

  return `hat ${event.rewardTitle ?? "eine Kanalpunkte-Belohnung"} eingelost.`;
}

function formatEventTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
