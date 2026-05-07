"use client";

import type { LiveOverviewData } from "../_data";
import type {
  TwitchActivityEvent,
  TwitchDashboardData,
  TwitchStreamStatus,
  TwitchUser,
} from "../../../lib/twitch";
import { useEffect, useMemo, useState } from "react";
import { LiveEventsList } from "./live-events-list";
import { LiveMetricCard } from "./live-metric-card";
import { LiveStreamField } from "./live-stream-field";
import { ViewerToggleCard } from "./viewer-toggle-card";

type LiveControlSectionProps = {
  activityEvents: TwitchActivityEvent[];
  activityWarning: string | null;
  error: string | null;
  isAuthenticated: boolean;
  live: LiveOverviewData;
  source: TwitchDashboardData["source"];
  stream: TwitchStreamStatus;
  user: TwitchUser | null;
};

export function LiveControlSection({
  activityEvents,
  activityWarning,
  error: initialError,
  isAuthenticated,
  live,
  source,
  stream,
  user,
}: LiveControlSectionProps) {
  const [liveData, setLiveData] = useState({
    activityEvents,
    activityWarning,
    error: initialError,
    isAuthenticated,
    source,
    stream,
    user,
  });
  const [lastViewerCount, setLastViewerCount] = useState(stream.viewerCount);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const currentStream = liveData.stream;
  const viewerDelta = currentStream.viewerCount - lastViewerCount;
  const startedAtLabel = currentStream.startedAt
    ? new Intl.DateTimeFormat("de-DE", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(currentStream.startedAt))
    : "Aktuell offline";
  const streamDuration = useMemo(
    () => formatStreamDuration(currentStream.startedAt, now),
    [currentStream.startedAt, now],
  );

  useEffect(() => {
    const tick = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function refreshLiveData() {
      try {
        const response = await fetch("/api/twitch/live", {
          cache: "no-store",
        });
        const payload = (await response.json()) as TwitchDashboardData;

        if (!isMounted) {
          return;
        }

        let previousViewerCount = 0;

        setLiveData((current) => {
          previousViewerCount = current.stream.viewerCount;
          return payload;
        });
        setLastViewerCount(previousViewerCount);
        setLastUpdatedAt(new Date());
      } catch {
        if (isMounted) {
          setLiveData((current) => ({
            ...current,
            error:
              "Live-Daten konnten gerade nicht aktualisiert werden. Der letzte bekannte Stand bleibt sichtbar.",
          }));
        }
      }
    }

    const interval = window.setInterval(() => {
      void refreshLiveData();
    }, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const metrics = [
    {
      label: "Gemeinsamer Moment",
      value: currentStream.isLive
        ? Math.max(live.peakViewers, currentStream.viewerCount).toString()
        : live.peakViewers.toString(),
      detail:
        liveData.source === "twitch"
          ? "Stärkster sichtbarer Moment, nur als Kontext"
          : "Beispielwert zur Einordnung",
      highlight: true,
      tone: "text-[#c6a4ff]",
    },
    {
      label: "Neue Verbindungen",
      value: `+${live.newFollowers}`,
      detail: "Menschen, die den Kanal wiederfinden möchten",
      tone: "text-[#d9c5ff]",
    },
    {
      label: "Unterstützer heute",
      value: live.subs.toString(),
      detail: "Beispielhafte Unterstützung",
      tone: "text-[#c6a4ff]",
    },
    {
      label: "Cheers heute",
      value: live.bits.toLocaleString("de-DE"),
      detail: "Beispieldaten, nicht als Drucksignal",
      tone: "text-[#f5d742]",
    },
  ];

  return (
    <section
      id="live-bereich"
      className="mt-6 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(145,70,255,0.16),transparent_34%),#09090b] p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold shadow-lg ${
              currentStream.isLive
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 shadow-emerald-950/20"
                : "bg-white/[0.04] text-zinc-400"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                currentStream.isLive
                  ? "animate-pulse bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]"
                  : "bg-zinc-500"
              }`}
            />
            {currentStream.isLive ? "Live begleitet" : "Offline"}
          </div>
          <h2 className="mt-4 text-2xl font-bold">Stream ruhig begleiten</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            {liveData.source === "twitch"
              ? "Titel, Kategorie, Dauer und Community-Signale werden aktualisiert, ohne einzelne Zahlen zu groß zu machen."
              : "Nicht mit Twitch verbunden. Beispielwerte bleiben klar gekennzeichnet und sollen nur die ruhige Struktur zeigen."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {liveData.isAuthenticated ? (
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
              Quelle: {liveData.source === "twitch" ? "Twitch Helix" : "Mockdaten"}
            </span>
            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400">
              Refresh:{" "}
              {lastUpdatedAt
                ? lastUpdatedAt.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "wartet"}
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
          <div className="mb-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-xl border border-[#9146ff]/20 bg-[#9146ff]/10 p-4 shadow-lg shadow-[#9146ff]/10">
              <p className="text-sm text-zinc-400">Stream-Zustand</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-bold text-white">
                  {currentStream.isLive ? "Online" : "Offline"}
                </p>
                <p className="font-mono text-2xl font-bold text-[#00f5d4]">
                  {streamDuration}
                </p>
              </div>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/10">
              <p className="text-sm text-zinc-400">Menschen gerade dabei</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-2xl font-semibold text-white">
                  {currentStream.viewerCount.toLocaleString("de-DE")}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    viewerDelta > 0
                      ? "bg-emerald-400/10 text-emerald-300"
                      : viewerDelta < 0
                        ? "bg-amber-400/10 text-amber-200"
                        : "bg-white/[0.06] text-zinc-400"
                  }`}
                >
                  {viewerDelta > 0 ? "+" : ""}
                  {viewerDelta}
                </span>
              </div>
            </article>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <LiveStreamField
              key={`title-${currentStream.title}`}
              field="title"
              label="Streamtitel"
              buttonLabel="Titel bearbeiten"
              initialValue={currentStream.title}
            />
            <LiveStreamField
              key={`category-${currentStream.gameId ?? currentStream.category}`}
              field="category"
              label="Kategorie"
              buttonLabel="Kategorie bearbeiten"
              initialValue={currentStream.category}
            />
          </div>

          {liveData.error ? (
            <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
              {liveData.error}
            </div>
          ) : null}

          {currentStream.channelInfoError ? (
            <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
              {currentStream.channelInfoError}
            </div>
          ) : null}

          {liveData.user ? (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-medium uppercase text-zinc-500">
                Verbundener Twitch-Account
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-lg bg-[#9146ff]/20 bg-cover bg-center text-sm font-bold text-[#d9c5ff]"
                  style={{
                    backgroundImage: liveData.user.profileImageUrl
                      ? `url(${liveData.user.profileImageUrl})`
                      : undefined,
                  }}
                >
                  {liveData.user.profileImageUrl
                    ? null
                    : liveData.user.displayName.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold text-white">
                    {liveData.user.displayName}
                  </p>
                  <p className="text-sm text-zinc-500">
                    User ID: {liveData.user.id}
                  </p>
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
          <ViewerToggleCard viewers={currentStream.viewerCount} />
          <article className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 shadow-lg shadow-black/10">
            <p className="text-sm text-zinc-400">Stream gestartet</p>
            <p className="mt-3 text-lg font-semibold text-white">
              {startedAtLabel}
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Nutzt Twitch started_at, wenn der Kanal live ist.
            </p>
          </article>
          <LiveEventsList
            events={liveData.activityEvents}
            warning={liveData.activityWarning}
          />
        </div>
      </div>
    </section>
  );
}

function formatStreamDuration(startedAt: string | null, now: number) {
  if (!startedAt) {
    return "00:00:00";
  }

  const durationInSeconds = Math.max(
    0,
    Math.floor((now - new Date(startedAt).getTime()) / 1000),
  );
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");
}
