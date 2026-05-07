import { AnalyticsFilters } from "./_components/analytics-filters";
import { AnalyticsKpiCard } from "./_components/analytics-kpi-card";
import { AnalyticsShell } from "./_components/analytics-shell";
import { ChartPlaceholder } from "./_components/chart-placeholder";
import { ContentPerformanceTable } from "./_components/content-performance-table";
import {
  chartPlaceholders,
  contentPerformance,
  groupingOptions,
  kpis,
  periodOptions,
} from "./_data";

export default function AnalyticsPage() {
  return (
    <AnalyticsShell>
      <AnalyticsFilters
        groupingOptions={groupingOptions}
        periodOptions={periodOptions}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <AnalyticsKpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {chartPlaceholders.map((chart) => (
          <ChartPlaceholder key={chart.title} chart={chart} />
        ))}
      </div>

      <ContentPerformanceTable rows={contentPerformance} />
    </AnalyticsShell>
  );
}
