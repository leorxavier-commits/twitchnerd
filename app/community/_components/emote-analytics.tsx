import type { EmoteMetric } from "../_data";

type EmoteAnalyticsProps = {
  emotes: EmoteMetric[];
};

export function EmoteAnalytics({ emotes }: EmoteAnalyticsProps) {
  const maxUsage = Math.max(...emotes.map((emote) => emote.usage));

  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div>
        <p className="text-sm font-medium text-[#c6a4ff]">Emote Analytics</p>
        <h2 className="mt-2 text-2xl font-bold">Meistgenutzte Emotes</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Später aus Chatdaten gezählt. Aktuell reine Mockdaten.
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        {emotes.map((emote) => (
          <div key={emote.emote}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{emote.emote}</p>
                <p className="text-xs text-zinc-500">
                  {emote.usage.toLocaleString("de-DE")} Nutzungen
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  emote.trendDirection === "positive"
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-rose-400/10 text-rose-300"
                }`}
              >
                {emote.trend}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#9146ff] to-[#00f5d4]"
                style={{ width: `${(emote.usage / maxUsage) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
