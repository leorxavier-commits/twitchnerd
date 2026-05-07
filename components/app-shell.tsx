import Link from "next/link";
import type { ReactNode } from "react";

const navigationItems = [
  { label: "Overview", href: "/dashboard", eyebrow: "Home" },
  { label: "Live Bereich", href: "/dashboard/live", eyebrow: "Live" },
  { label: "Analytics", href: "/analytics", eyebrow: "Data" },
  { label: "Streams", href: "#", eyebrow: "Plan" },
  { label: "Community", href: "/community", eyebrow: "Chat" },
  { label: "Content", href: "#", eyebrow: "Clips" },
];

type AppShellProps = {
  activeItem: string;
  children: ReactNode;
  eyebrow: string;
  summary: string;
  title: string;
};

export function AppShell({
  activeItem,
  children,
  eyebrow,
  summary,
  title,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#08060d] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-zinc-950/95 p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-[#9146ff]/50 hover:bg-[#9146ff]/10"
          >
            <span className="grid size-11 place-items-center rounded-lg bg-[#9146ff] font-black shadow-lg shadow-[#9146ff]/25">
              TN
            </span>
            <div>
              <p className="font-semibold">TwitchNerd</p>
              <p className="text-sm text-zinc-500">LeoNerd87</p>
            </div>
          </Link>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
            {navigationItems.map((item) => {
              const isActive = item.label === activeItem;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group min-w-fit rounded-xl border px-3 py-3 text-sm font-medium transition lg:min-w-0 ${
                    isActive
                      ? "border-[#9146ff]/60 bg-[#9146ff]/20 text-white shadow-lg shadow-[#9146ff]/10"
                      : "border-transparent text-zinc-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{item.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${
                        isActive
                          ? "bg-white/10 text-[#d9c5ff]"
                          : "bg-white/[0.04] text-zinc-600 group-hover:text-zinc-400"
                      }`}
                    >
                      {item.eyebrow}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 hidden rounded-xl border border-white/10 bg-[#120d1d] p-4 lg:block">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
              Streambereit
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Mockdaten aktiv. Keine Verbindung zu Twitch, Login oder Datenbank.
            </p>
          </div>
        </aside>

        <section className="p-5 sm:p-8">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#c6a4ff]">{eyebrow}</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
              {summary}
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
