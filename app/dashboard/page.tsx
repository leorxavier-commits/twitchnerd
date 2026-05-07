import { ActivityList } from "./_components/activity-list";
import { DashboardShell } from "./_components/dashboard-shell";
import { LiveOverview } from "./_components/live-overview";
import { NextStreamCard } from "./_components/next-stream-card";
import { StatCard } from "./_components/stat-card";
import { StreamGoals } from "./_components/stream-goals";
import { ViewerChart } from "./_components/viewer-chart";
import { activities, chartData, goals, liveOverview, stats } from "./_data";

export default function DashboardPage() {
  return (
    <DashboardShell activeItem="Overview">
      <LiveOverview live={liveOverview} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <ViewerChart data={chartData} />
        <ActivityList activities={activities} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <StreamGoals goals={goals} />
        <NextStreamCard />
      </div>
    </DashboardShell>
  );
}
