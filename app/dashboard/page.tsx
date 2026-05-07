const stats = [
  {
    label: "Live-Zuschauer",
    value: "124",
    trend: "+12%",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Neue Follower",
    value: "18",
    trend: "+5",
    tone: "text-[#ff66c4]",
  },
  {
    label: "Subs heute",
    value: "7",
    trend: "+2",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Chat Messages",
    value: "842",
    trend: "+31%",
    tone: "text-[#f5d742]",
  },
];

const chartData = [
  { label: "18:00", value: 42 },
  { label: "18:30", value: 55 },
  { label: "19:00", value: 48 },
  { label: "19:30", value: 76 },
  { label: "20:00", value: 68 },
  { label: "20:30", value: 92 },
  { label: "21:00", value: 81 },
];

const activities = [
  "NerdFan42 folgt dem Kanal",
  "CodeMage hat 3 Monate resubbt",
  "Chat Peak bei 20:34 Uhr erreicht",
  "Clip: Bossfight Fail gespeichert",
];

const navItems = ["Overview", "Streams", "Community", "Content"];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#08060d] text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-zinc-950/90 p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#9146ff] font-black">
              TN
            </span>
            <div>
              <p className="font-semibold">TwitchNerd</p>
              <p className="text-sm text-zinc-500">LeoNerd87</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[#9146ff] text-white"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="p-5 sm:p-8">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#c6a4ff]">
                Mock Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Stream Uebersicht
              </h1>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
              Letzter Stream: Freitag, 20:00 Uhr
            </div>
          </header>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-xl border border-white/10 bg-zinc-950 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                  <span className={`text-sm font-semibold ${stat.tone}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="mt-4 text-4xl font-bold">{stat.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
            <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Viewer Verlauf</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Beispielwerte aus Mockdaten
                  </p>
                </div>
                <span className="rounded-full bg-[#00f5d4]/10 px-3 py-1 text-xs font-semibold text-[#00f5d4]">
                  +12%
                </span>
              </div>

              <div className="mt-8 flex h-72 items-end gap-3 border-b border-white/10 pb-4">
                {chartData.map((item) => (
                  <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex h-56 w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#9146ff] via-[#b26bff] to-[#00f5d4]"
                        style={{ height: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
              <h2 className="text-xl font-semibold">Aktivitaeten</h2>
              <div className="mt-5 grid gap-3">
                {activities.map((activity) => (
                  <div
                    key={activity}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 lg:col-span-2">
              <h2 className="text-xl font-semibold">Stream Ziele</h2>
              <div className="mt-5 grid gap-4">
                {[
                  ["Follower Ziel", "72%"],
                  ["Sub Ziel", "46%"],
                  ["Chat Engagement", "84%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-zinc-400">{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-[#9146ff]"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-white/10 bg-[#120d1d] p-5">
              <h2 className="text-xl font-semibold">Naechster Stream</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Heute testen wir neue Alerts, Chat-Tempo und Layout-Ideen mit
                statischen Beispieldaten.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
