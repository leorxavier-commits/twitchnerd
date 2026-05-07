import type { AnalyticsKpi } from "../_data";

type AnalyticsKpiCardProps = {
  kpi: AnalyticsKpi;
};

export function AnalyticsKpiCard({ kpi }: AnalyticsKpiCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-400">{kpi.label}</p>
      <p className={`mt-3 text-3xl font-bold ${kpi.tone}`}>{kpi.value}</p>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{kpi.detail}</p>
    </article>
  );
}
