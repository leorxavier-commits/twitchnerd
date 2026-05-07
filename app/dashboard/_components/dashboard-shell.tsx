import type { ReactNode } from "react";
import { AppShell } from "../../../components/app-shell";

type DashboardShellProps = {
  activeItem?: string;
  children: ReactNode;
  eyebrow?: string;
  summary?: string;
  title?: string;
};

export function DashboardShell({
  activeItem = "Overview",
  children,
  eyebrow = "Mock Dashboard",
  summary = "Letzter Stream: Freitag, 20:00 Uhr",
  title = "Stream Übersicht",
}: DashboardShellProps) {
  return (
    <AppShell
      activeItem={activeItem}
      eyebrow={eyebrow}
      summary={summary}
      title={title}
    >
      {children}
    </AppShell>
  );
}
