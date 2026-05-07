import { DashboardShell } from "../_components/dashboard-shell";
import { LiveControlSection } from "../_components/live-control-section";
import { liveOverview } from "../_data";
import { getTwitchDashboardData } from "../../../lib/twitch";

export default async function LiveDashboardPage() {
  const twitchData = await getTwitchDashboardData({
    category: liveOverview.category,
    channelInfoError: null,
    gameId: null,
    isLive: liveOverview.status === "Live",
    startedAt: null,
    title: liveOverview.title,
    viewerCount: liveOverview.currentViewers,
  });

  return (
    <DashboardShell
      activeItem="Live Bereich"
      eyebrow={twitchData.source === "twitch" ? "Live Cockpit" : "Beispiel Live"}
      title="Live Cockpit"
      summary={
        twitchData.isAuthenticated
          ? "Twitch verbunden. Wir ordnen Live-Signale ruhig und serverseitig ein."
          : "Nicht mit Twitch verbunden. Die Ansicht zeigt Beispielwerte mit klarer Kennzeichnung."
      }
    >
      <LiveControlSection
        activityEvents={twitchData.activityEvents}
        activityWarning={twitchData.activityWarning}
        error={twitchData.error}
        isAuthenticated={twitchData.isAuthenticated}
        live={liveOverview}
        source={twitchData.source}
        stream={twitchData.stream}
        user={twitchData.user}
      />
    </DashboardShell>
  );
}
