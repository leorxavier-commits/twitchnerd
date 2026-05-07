import type { LiveOverviewData } from "../_data";

type LiveOverviewProps = {
  live: LiveOverviewData;
};

export function LiveOverview({ live }: LiveOverviewProps) {
  return (
    <section
      id="overview"
      className="mt-6 rounded-xl border border-[#9146ff]/30 bg-[#120d1d] p-5 shadow-xl shadow-[#9146ff]/10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#c6a4ff]">Overview</p>
          <h2 className="mt-2 text-2xl font-bold">Stream Status</h2>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-300">
          <span className="size-2 rounded-full bg-rose-400 animate-pulse" />
          {live.status}
        </span>
      </div>
    </section>
  );
}
