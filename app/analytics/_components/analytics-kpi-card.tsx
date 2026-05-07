import type { TwitchDevelopmentKpi } from "../../../lib/twitch";

type AnalyticsKpiCardProps = {
  kpi: TwitchDevelopmentKpi;
};

export function AnalyticsKpiCard({ kpi }: AnalyticsKpiCardProps) {
  const sourceClass =
    kpi.source === "twitch"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : "border-white/10 bg-white/[0.04] text-zinc-400";

  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-zinc-400">{kpi.label}</p>
        <span
          className={`rounded-full border px-2 py-1 text-xs font-semibold ${sourceClass}`}
        >
          {kpi.source === "twitch" ? "Twitch" : "Nicht verfügbar"}
        </span>
      </div>
      <p className={`mt-4 text-3xl font-bold ${kpi.tone}`}>{kpi.value}</p>
      {kpi.estimated ? (
        <span className="mt-3 inline-flex rounded-full border border-[#f5d742]/30 bg-[#f5d742]/10 px-2 py-1 text-xs font-semibold text-[#f5d742]">
          bewusst nicht geschätzt
        </span>
      ) : null}
      <p className="mt-2 text-xs leading-5 text-zinc-500">{kpi.detail}</p>
    </article>
  );
}
