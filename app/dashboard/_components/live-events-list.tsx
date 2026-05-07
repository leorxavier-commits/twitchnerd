import type { LiveEvent } from "../_data";

type LiveEventsListProps = {
  events: LiveEvent[];
};

export function LiveEventsList({ events }: LiveEventsListProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10 xl:min-h-[316px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Letzte Live-Events</h2>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Aktiv
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {events.map((event) => (
          <div
            key={`${event.time}-${event.label}`}
            className="grid grid-cols-[52px_64px_1fr] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm transition hover:border-[#9146ff]/30 hover:bg-[#9146ff]/10"
          >
            <span className="text-zinc-500">{event.time}</span>
            <span className="rounded-full bg-white/[0.05] px-2 py-1 text-center text-xs font-semibold text-[#c6a4ff]">
              {event.type}
            </span>
            <span className="text-zinc-300">{event.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
