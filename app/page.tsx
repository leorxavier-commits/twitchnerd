import Link from "next/link";

const highlights = [
  {
    label: "Live-Zuschauer",
    value: "124",
    detail: "+12% zum letzten Stream",
  },
  {
    label: "Follower heute",
    value: "+18",
    detail: "Mockdaten für LeoNerd87",
  },
  {
    label: "Chat-Aktivität",
    value: "842",
    detail: "Nachrichten im letzten Stream",
  },
];

const features = [
  "Stream-Metriken auf einen Blick",
  "Mock-Charts für frühe Tests",
  "Dashboard-Struktur ohne Login",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08060d] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#9146ff] font-black text-white">
              TN
            </span>
            <span className="text-lg font-semibold tracking-normal">
              TwitchNerd
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-[#9146ff]/70 hover:bg-[#9146ff]/20"
          >
            Dashboard ansehen
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-lg border border-[#9146ff]/40 bg-[#9146ff]/15 px-3 py-1 text-sm font-medium text-[#c6a4ff]">
              MVP Dashboard für LeoNerd87
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Twitch-Insights, die beim Streamen nicht im Weg stehen.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              TwitchNerd startet als schlankes Mock-Dashboard: klare Zahlen,
              dunkles Interface und genug Struktur, um die nächsten Features
              sauber zu testen.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-lg bg-[#9146ff] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#9146ff]/25 transition hover:bg-[#7b2ff0]"
              >
                Dashboard öffnen
              </Link>
              <a
                href="/api/auth/twitch/login"
                className="rounded-lg border border-[#9146ff]/50 bg-[#9146ff]/15 px-5 py-3 text-center text-sm font-semibold text-[#d9c5ff] transition hover:bg-[#9146ff]/25"
              >
                Mit Twitch einloggen
              </a>
              <a
                href="#mockdaten"
                className="rounded-lg border border-white/15 px-5 py-3 text-center text-sm font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/10"
              >
                Mockdaten ansehen
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div
            id="mockdaten"
            className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-[#9146ff]/15 sm:p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-400">Stream Preview</p>
                <h2 className="text-xl font-semibold">LeoNerd87 Stats</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                Mock Live
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="text-sm text-zinc-400">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#120d1d] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-medium">Aktivität pro Stunde</p>
                <p className="text-sm text-zinc-500">Demo</p>
              </div>
              <div className="flex h-40 items-end gap-2">
                {[38, 52, 46, 70, 58, 82, 66, 94, 74, 88, 62, 76].map(
                  (height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="flex flex-1 items-end rounded-t-md bg-[#9146ff]/20"
                      style={{ height: `${height}%` }}
                    >
                      <span className="h-full w-full rounded-t-md bg-gradient-to-t from-[#9146ff] to-[#00f5d4]" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-5 text-sm text-zinc-400 sm:grid-cols-3">
          <p>Keine API. Kein Login. Keine Datenbank.</p>
          <p>Gebaut für schnelle lokale MVP-Iteration.</p>
          <p className="sm:text-right">Nächster Schritt: Dashboard-Details.</p>
        </div>
      </section>
    </main>
  );
}
