import type { LiveOverviewData } from "../_data";
import type {
  TwitchDashboardData,
  TwitchStreamStatus,
  TwitchUser,
} from "../../../lib/twitch";
import { LiveEventsList } from "./live-events-list";
import { LiveMetricCard } from "./live-metric-card";
import { LiveStreamField } from "./live-stream-field";
import { ViewerToggleCard } from "./viewer-toggle-card";

type LiveControlSectionProps = {
  isAuthenticated: boolean;
  live: LiveOverviewData;
  source: TwitchDashboardData["source"];
  stream: TwitchStreamStatus;
  user: TwitchUser | null;
};

export function LiveControlSection({
  isAuthenticated,
  live,
  source,
  stream,
  user,
}: LiveControlSectionProps) {
  const startedAtLabel = stream.startedAt
    ? new Intl.DateTimeFormat("de-DE", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(stream.startedAt))
    : "Aktuell offline";

  const metrics = [
    {
      label: "Peak Viewer heute",
      value: stream.isLive
        ? Math.max(live.peakViewers, stream.viewerCount).toString()
        : live.peakViewers.toString(),
      detail: source === "twitch" ? "Live + Mock-Peak kombiniert" : "Mock-Peak",
      highlight: true,
      tone: "text-[#00f5d4]",
    },
    {
      label: "Neue Follower heute",
      value: `+${live.newFollowers}`,
      detail: "Seit Streamstart",
      tone: "text-[#ff66c4]",
    },
    {
      label: "Subs heute",
      value: live.subs.toString(),
      detail: "Mock Sub-Zahl",
      tone: "text-[#c6a4ff]",
    },
    {
      label: "Bits heute",
      value: live.bits.toLocaleString("de-DE"),
      detail: "Cheers aus Mockdaten",
      tone: "text-[#f5d742]",
    },
  ];

  return (
    <section
      id="live-bereich"
      className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              stream.isLive
                ? "bg-rose-500/15 text-rose-300"
                : "bg-white/[0.04] text-zinc-400"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                stream.isLive ? "bg-rose-400 animate-pulse" : "bg-zinc-500"
              }`}
            />
            {stream.isLive ? "Live Control" : "Offline Control"}
          </div>
          <h2 className="mt-4 text-2xl font-bold">Stream-Steuerung</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            {source === "twitch"
              ? "Twitch-Basisdaten werden serverseitig geladen. Tokens bleiben in httpOnly Cookies."
              : "Keine echten Twitch-Daten verfügbar. Der Bereich nutzt saubere Mockdaten als Fallback."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {isAuthenticated ? (
              <a
                href="/api/auth/twitch/logout"
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                Twitch trennen
              </a>
            ) : (
              <a
                href="/api/auth/twitch/login"
                className="rounded-lg bg-[#9146ff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7b2ff0]"
              >
                Mit Twitch einloggen
              </a>
            )}
            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400">
              Quelle: {source === "twitch" ? "Twitch Helix" : "Mockdaten"}
            </span>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {live.indicators.map((indicator) => (
            <div
              key={indicator.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
            >
              <p className="text-xs text-zinc-500">{indicator.label}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">
                {indicator.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="grid gap-3 lg:grid-cols-2">
            <LiveStreamField
              label="Streamtitel"
              buttonLabel="Titel bearbeiten"
              initialValue={stream.title}
            />
            <LiveStreamField
              label="Kategorie"
              buttonLabel="Kategorie bearbeiten"
              initialValue={stream.category}
            />
          </div>

          {user ? (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-medium uppercase text-zinc-500">
                Verbundener Twitch-Account
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-lg bg-[#9146ff]/20 bg-cover bg-center text-sm font-bold text-[#d9c5ff]"
                  style={{
                    backgroundImage: user.profileImageUrl
                      ? `url(${user.profileImageUrl})`
                      : undefined,
                  }}
                >
                  {user.profileImageUrl
                    ? null
                    : user.displayName.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-white">{user.displayName}</p>
                  <p className="text-sm text-zinc-500">User ID: {user.id}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <LiveMetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>

        <div className="grid content-start gap-4 md:grid-cols-2 xl:grid-cols-1">
          <ViewerToggleCard viewers={stream.viewerCount} />
          <article className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10">
            <p className="text-sm text-zinc-400">Stream gestartet</p>
            <p className="mt-3 text-lg font-semibold text-white">
              {startedAtLabel}
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Nutzt Twitch started_at, wenn der Kanal live ist.
            </p>
          </article>
          <LiveEventsList events={live.events} />
        </div>
      </div>
    </section>
  );
}
