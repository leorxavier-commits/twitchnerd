import type { LiveEvent } from "../_data";

type LiveEventsListProps = {
  events: LiveEvent[];
};

export function LiveEventsList({ events }: LiveEventsListProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 xl:min-h-[316px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Letzte Live Events</h2>
        <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
          Mock
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {events.map((event) => (
          <div
            key={`${event.time}-${event.label}`}
            className="grid grid-cols-[48px_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm"
          >
            <span className="text-zinc-500">{event.time}</span>
            <span className="text-zinc-300">{event.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
