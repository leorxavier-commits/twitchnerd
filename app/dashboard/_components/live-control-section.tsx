import type { LiveOverviewData } from "../_data";
import { LiveEventsList } from "./live-events-list";
import { LiveMetricCard } from "./live-metric-card";
import { LiveStreamField } from "./live-stream-field";
import { ViewerToggleCard } from "./viewer-toggle-card";

type LiveControlSectionProps = {
  live: LiveOverviewData;
};

export function LiveControlSection({ live }: LiveControlSectionProps) {
  const metrics = [
    {
      label: "Peak Viewer heute",
      value: live.peakViewers.toString(),
      detail: "Bester Moment im Stream",
      highlight: true,
      tone: "text-[#00f5d4]",
    },
    {
      label: "Neue Follower heute",
      value: `+${live.newFollowers}`,
      detail: "Seit Streamstart",
      tone: "text-[#ff66c4]",
    },
    {
      label: "Subs heute",
      value: live.subs.toString(),
      detail: "Mock Sub-Zahl",
      tone: "text-[#c6a4ff]",
    },
    {
      label: "Bits heute",
      value: live.bits.toLocaleString("de-DE"),
      detail: "Cheers aus Mockdaten",
      tone: "text-[#f5d742]",
    },
  ];

  return (
    <section
      id="live-bereich"
      className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-3 py-1 text-sm font-semibold text-rose-300">
            <span className="size-2 rounded-full bg-rose-400 animate-pulse" />
            Live Control
          </div>
          <h2 className="mt-4 text-2xl font-bold">Stream-Steuerung</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Schnelle Kontrolle für Titel, Kategorie und aktuelle Streamsignale.
            Alles bleibt lokal und arbeitet mit Mockdaten.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {live.indicators.map((indicator) => (
            <div
              key={indicator.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
            >
              <p className="text-xs text-zinc-500">{indicator.label}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">
                {indicator.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="grid gap-3 lg:grid-cols-2">
            <LiveStreamField
              label="Streamtitel"
              buttonLabel="Titel bearbeiten"
              initialValue={live.title}
            />
            <LiveStreamField
              label="Kategorie"
              buttonLabel="Kategorie bearbeiten"
              initialValue={live.category}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <LiveMetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>

        <div className="grid content-start gap-4 md:grid-cols-2 xl:grid-cols-1">
          <ViewerToggleCard viewers={live.currentViewers} />
          <LiveEventsList events={live.events} />
        </div>
      </div>
    </section>
  );
}
