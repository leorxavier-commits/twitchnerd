import type { CommunityKpi } from "../_data";

type CommunityKpiCardProps = {
  kpi: CommunityKpi;
};

export function CommunityKpiCard({ kpi }: CommunityKpiCardProps) {
  const trendClass =
    kpi.trendDirection === "positive"
      ? "bg-emerald-400/10 text-emerald-300"
      : "bg-rose-400/10 text-rose-300";

  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-zinc-400">{kpi.label}</p>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${trendClass}`}>
          {kpi.trend}
        </span>
      </div>
      <p className={`mt-4 text-3xl font-bold ${kpi.tone}`}>{kpi.value}</p>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{kpi.detail}</p>
    </article>
  );
}
