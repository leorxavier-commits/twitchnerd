import Link from "next/link";
import type { ReactNode } from "react";
import { navItems } from "../../dashboard/_data";

type AnalyticsShellProps = {
  children: ReactNode;
};

export function AnalyticsShell({ children }: AnalyticsShellProps) {
  return (
    <main className="min-h-screen bg-[#08060d] text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-zinc-950/90 p-5 lg:border-b-0 lg:border-r">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg transition hover:opacity-85"
          >
            <span className="grid size-10 place-items-center rounded-lg bg-[#9146ff] font-black">
              TN
            </span>
            <div>
              <p className="font-semibold">TwitchNerd</p>
              <p className="text-sm text-zinc-500">LeoNerd87</p>
            </div>
          </Link>

          <nav className="mt-8 grid gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  item.label === "Analytics"
                    ? "bg-[#9146ff] text-white"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <section className="p-5 sm:p-8">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#c6a4ff]">
                Mock Analytics
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Analytics
              </h1>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
              Auswertung nur mit statischen Beispieldaten
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
