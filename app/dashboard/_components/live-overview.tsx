import type { TwitchStreamStatus } from "../../../lib/twitch";

type LiveOverviewProps = {
  stream: TwitchStreamStatus;
};

export function LiveOverview({ stream }: LiveOverviewProps) {
  const statusLabel = stream.isLive ? "Online" : "Offline";
  const statusClass = stream.isLive
    ? "bg-rose-500/15 text-rose-300"
    : "bg-white/[0.04] text-zinc-400";

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
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${statusClass}`}
        >
          <span
            className={`size-2 rounded-full ${
              stream.isLive ? "bg-rose-400 animate-pulse" : "bg-zinc-500"
            }`}
          />
          {statusLabel}
        </span>
      </div>
    </section>
  );
}
