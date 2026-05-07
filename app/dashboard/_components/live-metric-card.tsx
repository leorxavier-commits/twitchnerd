type LiveMetric = {
  label: string;
  value: string;
  detail: string;
  highlight?: boolean;
  tone: string;
};

type LiveMetricCardProps = {
  metric: LiveMetric;
};

export function LiveMetricCard({ metric }: LiveMetricCardProps) {
  return (
    <article
      className={`rounded-xl border p-4 ${
        metric.highlight
          ? "border-[#00f5d4]/40 bg-[#00f5d4]/10 shadow-lg shadow-[#00f5d4]/10"
          : "border-white/10 bg-zinc-950/70"
      }`}
    >
      <p className="text-sm text-zinc-400">{metric.label}</p>
      <p className={`mt-3 text-3xl font-bold ${metric.tone}`}>
        {metric.value}
      </p>
      {metric.highlight ? (
        <span className="mt-3 inline-flex rounded-full bg-[#00f5d4]/10 px-2 py-1 text-xs font-semibold text-[#00f5d4]">
          Tages-Peak
        </span>
      ) : null}
      <p className="mt-2 text-xs leading-5 text-zinc-500">{metric.detail}</p>
    </article>
  );
}
