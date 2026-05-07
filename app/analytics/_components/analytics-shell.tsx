import type { ReactNode } from "react";
import { AppShell } from "../../../components/app-shell";

type AnalyticsShellProps = {
  children: ReactNode;
};

export function AnalyticsShell({ children }: AnalyticsShellProps) {
  return (
    <AppShell
      activeItem="Einordnung"
      eyebrow="Creator Einordnung"
      summary="Beispieldaten, die Entwicklung ruhig einordnen statt Druck aufzubauen."
      title="Entwicklung"
    >
      {children}
    </AppShell>
  );
}
