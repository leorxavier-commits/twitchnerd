import type { TwitchDevelopmentChart } from "../../../lib/twitch";

type ChartPlaceholderProps = {
  chart: TwitchDevelopmentChart;
};

export function ChartPlaceholder({ chart }: ChartPlaceholderProps) {
  const hasBars = chart.bars.some((height) => height > 0);
  const sourceClass =
    chart.source === "twitch"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : "border-white/10 bg-white/[0.04] text-zinc-400";

  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{chart.title}</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            {chart.description}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-1 text-xs font-semibold ${sourceClass}`}
        >
          {chart.source === "twitch" ? "Twitch" : "Nicht verfügbar"}
        </span>
      </div>

      <div className="mt-6 flex h-52 items-end gap-2 rounded-xl border border-white/10 bg-[#08060d] p-3">
        {hasBars ? (
          chart.bars.map((height, index) => (
            <div
              key={`${chart.title}-${height}-${index}`}
              className="flex flex-1 items-end rounded-t-md bg-white/[0.03]"
              style={{ height: `${height}%` }}
            >
              <span className="h-full w-full rounded-t-md bg-gradient-to-t from-[#9146ff] via-[#b26bff] to-[#00f5d4] shadow-[0_0_18px_rgba(145,70,255,0.18)]" />
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-white/10 px-6 text-center text-sm leading-6 text-zinc-500">
            Für diesen Bereich liefert Twitch aktuell keine auswertbare Zeitreihe.
          </div>
        )}
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-400">{chart.summary}</p>
    </article>
  );
}
