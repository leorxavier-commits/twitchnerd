import { AnalyticsFilters } from "./_components/analytics-filters";
import { AnalyticsKpiCard } from "./_components/analytics-kpi-card";
import { AnalyticsShell } from "./_components/analytics-shell";
import { ChartPlaceholder } from "./_components/chart-placeholder";
import { ContentPerformanceTable } from "./_components/content-performance-table";
import { periodOptions } from "./_data";
import {
  getTwitchDevelopmentData,
  type TwitchDevelopmentPeriod,
} from "../../lib/twitch";

type AnalyticsPageProps = {
  searchParams?: Promise<{
    period?: string;
  }>;
};

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const params = await searchParams;
  const period = normalizePeriod(params?.period);
  const developmentData = await getTwitchDevelopmentData(period);

  return (
    <AnalyticsShell>
      <AnalyticsFilters
        activePeriod={developmentData.period}
        periodOptions={periodOptions}
      />

      {developmentData.error ? (
        <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
          {developmentData.error}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {developmentData.kpis.map((kpi) => (
          <AnalyticsKpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {developmentData.charts.map((chart) => (
          <ChartPlaceholder key={chart.title} chart={chart} />
        ))}
      </div>

      <ContentPerformanceTable rows={developmentData.availability} />
    </AnalyticsShell>
  );
}

function normalizePeriod(value: string | undefined): TwitchDevelopmentPeriod {
  if (
    value === "today" ||
    value === "7d" ||
    value === "30d" ||
    value === "month" ||
    value === "quarter" ||
    value === "year"
  ) {
    return value;
  }

  return "30d";
}
