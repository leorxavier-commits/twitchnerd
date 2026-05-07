import type { AnalyticsChart } from "../_data";

type ChartPlaceholderProps = {
  chart: AnalyticsChart;
};

export function ChartPlaceholder({ chart }: ChartPlaceholderProps) {
  const trendClass =
    chart.trendDirection === "positive"
      ? "bg-emerald-400/10 text-emerald-300"
      : chart.trendDirection === "negative"
        ? "bg-amber-400/10 text-amber-200"
        : "bg-white/[0.05] text-zinc-300";

  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{chart.title}</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            {chart.description}
          </p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${trendClass}`}>
          {chart.trend}
        </span>
      </div>

      <div className="mt-6 flex h-52 items-end gap-2 rounded-xl border border-white/10 bg-[#08060d] p-3">
        {chart.bars.map((height, index) => (
          <div
            key={`${chart.title}-${height}-${index}`}
            className="flex flex-1 items-end rounded-t-md bg-white/[0.03]"
            style={{ height: `${height}%` }}
          >
            <span className="h-full w-full rounded-t-md bg-gradient-to-t from-[#9146ff] via-[#b26bff] to-[#00f5d4] shadow-[0_0_18px_rgba(145,70,255,0.18)]" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-400">{chart.summary}</p>
    </article>
  );
}
