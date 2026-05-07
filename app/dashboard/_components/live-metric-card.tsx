type LiveMetric = {
  label: string;
  value: string;
  detail: string;
  tone: string;
};

type LiveMetricCardProps = {
  metric: LiveMetric;
};

export function LiveMetricCard({ metric }: LiveMetricCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950/70 p-4">
      <p className="text-sm text-zinc-400">{metric.label}</p>
      <p className={`mt-3 text-3xl font-bold ${metric.tone}`}>
        {metric.value}
      </p>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{metric.detail}</p>
    </article>
  );
}
