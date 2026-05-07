import type { ReactNode } from "react";
import { AppShell } from "../../../components/app-shell";

type AnalyticsShellProps = {
  children: ReactNode;
};

export function AnalyticsShell({ children }: AnalyticsShellProps) {
  return (
    <AppShell
      activeItem="Analytics"
      eyebrow="Mock Analytics"
      summary="Auswertung nur mit statischen Beispieldaten"
      title="Analytics"
    >
      {children}
    </AppShell>
  );
}
