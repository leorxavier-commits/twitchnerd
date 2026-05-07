import { DashboardShell } from "../_components/dashboard-shell";
import { LiveControlSection } from "../_components/live-control-section";
import { liveOverview } from "../_data";

export default function LiveDashboardPage() {
  return (
    <DashboardShell
      activeItem="Live Bereich"
      eyebrow="Mock Live"
      title="Live Bereich"
      summary="Streamtitel, Kategorie und Live-Metriken als reine UI mit Mockdaten."
    >
      <LiveControlSection live={liveOverview} />
    </DashboardShell>
  );
}
