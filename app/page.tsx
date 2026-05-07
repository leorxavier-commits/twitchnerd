import Link from "next/link";

const highlights = [
  {
    label: "Gerade im Stream",
    value: "124",
    detail: "Ein Signal, nicht dein Wert als Creator",
  },
  {
    label: "Neue Verbindungen",
    value: "+18",
    detail: "Menschen, die wiederkommen möchten",
  },
  {
    label: "Community-Momente",
    value: "842",
    detail: "Austausch im letzten Stream",
  },
];

const features = [
  "Ruhige Einordnung statt Zahlendruck",
  "Creator Cockpit für Live, Community und Entwicklung",
  "Bewusst schlank für lokale MVP-Tests",
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
            Cockpit ansehen
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-lg border border-[#9146ff]/40 bg-[#9146ff]/15 px-3 py-1 text-sm font-medium text-[#c6a4ff]">
              Ruhiges Creator Cockpit für LeoNerd87
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Wir helfen dir, gesünder mit deinen Zahlen umzugehen.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              TwitchNerd ist kein hektisches Analytics-Tool. Es ist ein ruhiges
              Creator Cockpit, das Live-Daten, Community-Signale und Entwicklung
              so einordnet, dass du streamen kannst, ohne dich von Zahlen jagen
              zu lassen.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-lg bg-[#9146ff] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#9146ff]/25 transition hover:bg-[#7b2ff0]"
              >
                Cockpit öffnen
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
                Beispielansicht ansehen
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
                <p className="text-sm text-zinc-400">Ruhige Übersicht</p>
                <h2 className="text-xl font-semibold">LeoNerd87 Cockpit</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                Beispiel Live
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
                <p className="font-medium">Rhythmus des Streams</p>
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
          <p>Ruhige Signale statt hektischer Vergleiche.</p>
          <p>Gebaut für bewusste lokale MVP-Iteration.</p>
          <p className="sm:text-right">Nächster Schritt: mehr Einordnung.</p>
        </div>
      </section>
    </main>
  );
}
