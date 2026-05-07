import type { ReactNode } from "react";
import { AppShell } from "../../../components/app-shell";

type CommunityShellProps = {
  children: ReactNode;
};

export function CommunityShell({ children }: CommunityShellProps) {
  return (
    <AppShell
      activeItem="Community"
      eyebrow="Mock Community"
      summary="Community-Aktivität nur mit statischen Beispieldaten"
      title="Community"
    >
      {children}
    </AppShell>
  );
}
