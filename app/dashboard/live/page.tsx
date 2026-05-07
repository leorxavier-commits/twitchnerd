import { DashboardShell } from "../_components/dashboard-shell";
import { LiveControlSection } from "../_components/live-control-section";
import { liveOverview } from "../_data";
import { getTwitchDashboardData } from "../../../lib/twitch";

export default async function LiveDashboardPage() {
  const twitchData = await getTwitchDashboardData({
    category: liveOverview.category,
    isLive: liveOverview.status === "Live",
    startedAt: null,
    title: liveOverview.title,
    viewerCount: liveOverview.currentViewers,
  });

  return (
    <DashboardShell
      activeItem="Live Bereich"
      eyebrow={twitchData.source === "twitch" ? "Twitch Live" : "Mock Live"}
      title="Live Bereich"
      summary={
        twitchData.isAuthenticated
          ? "Twitch verbunden. Basisdaten werden serverseitig geladen."
          : "Nicht mit Twitch verbunden. Es werden Mockdaten angezeigt."
      }
    >
      <LiveControlSection
        isAuthenticated={twitchData.isAuthenticated}
        live={liveOverview}
        source={twitchData.source}
        stream={twitchData.stream}
        user={twitchData.user}
      />
    </DashboardShell>
  );
}
