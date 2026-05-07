import type { TopChatter } from "../_data";

type TopChattersListProps = {
  chatters: TopChatter[];
};

export function TopChattersList({ chatters }: TopChattersListProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div>
        <p className="text-sm font-medium text-[#c6a4ff]">Chat-Aktivität</p>
        <h2 className="mt-2 text-2xl font-bold">Top Chatter</h2>
      </div>

      <div className="mt-5 grid gap-3">
        {chatters.map((chatter, index) => (
          <div
            key={chatter.name}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-[#9146ff]/20 text-sm font-bold text-[#d9c5ff]">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{chatter.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{chatter.level}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  chatter.trendDirection === "positive"
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-rose-400/10 text-rose-300"
                }`}
              >
                {chatter.trend}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-[#00f5d4]">
              {chatter.messages.toLocaleString("de-DE")}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Nachrichten im Zeitraum
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
