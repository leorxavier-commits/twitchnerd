import Link from "next/link";
import type { TwitchDevelopmentPeriod } from "../../../lib/twitch";

type AnalyticsFiltersProps = {
  activePeriod: TwitchDevelopmentPeriod;
  periodOptions: Array<{
    label: string;
    value: TwitchDevelopmentPeriod;
  }>;
};

export function AnalyticsFilters({
  activePeriod,
  periodOptions,
}: AnalyticsFiltersProps) {
  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-zinc-950 p-4">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-300">Zeitraum</p>
          <span className="text-xs text-zinc-600">
            Echte Twitch-Daten, wo verfügbar
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1 rounded-xl border border-white/10 bg-[#08060d] p-1">
          {periodOptions.map((option) => (
            <Link
              key={option.value}
              href={`/analytics?period=${option.value}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                activePeriod === option.value
                  ? "bg-[#9146ff] text-white shadow-lg shadow-[#9146ff]/20"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-zinc-500">
          Der Zeitraum filtert aktuell Follow- und Bits-Daten. Historische
          Viewer- und Einnahmendaten stellt Twitch Helix nicht bereit.
        </p>
      </div>
    </section>
  );
}
