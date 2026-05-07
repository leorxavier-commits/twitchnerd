import type { Stat } from "../_data";

type StatCardProps = {
  stat: Stat;
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-zinc-400">{stat.label}</p>
        <span className={`text-sm font-semibold ${stat.tone}`}>
          {stat.trend}
        </span>
      </div>
      <p className="mt-4 text-4xl font-bold">{stat.value}</p>
    </article>
  );
}
