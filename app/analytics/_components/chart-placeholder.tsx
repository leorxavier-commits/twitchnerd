import type { AnalyticsChart } from "../_data";

type ChartPlaceholderProps = {
  chart: AnalyticsChart;
};

export function ChartPlaceholder({ chart }: ChartPlaceholderProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
      <div>
        <h2 className="text-xl font-semibold">{chart.title}</h2>
        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {chart.description}
        </p>
      </div>

      <div className="mt-6 flex h-52 items-end gap-2 border-b border-white/10 pb-4">
        {chart.bars.map((height, index) => (
          <div
            key={`${chart.title}-${height}-${index}`}
            className="flex flex-1 items-end rounded-t-md bg-[#9146ff]/15"
            style={{ height: `${height}%` }}
          >
            <span className="h-full w-full rounded-t-md bg-gradient-to-t from-[#9146ff] to-[#00f5d4]" />
          </div>
        ))}
      </div>
    </article>
  );
}
