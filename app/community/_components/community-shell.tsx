import type { ReactNode } from "react";
import { AppShell } from "../../../components/app-shell";

type CommunityShellProps = {
  children: ReactNode;
  isTwitchConnected: boolean;
};

export function CommunityShell({
  children,
  isTwitchConnected,
}: CommunityShellProps) {
  return (
    <AppShell
      activeItem="Community"
      eyebrow={isTwitchConnected ? "Twitch Community" : "Verbindungen"}
      summary={
        isTwitchConnected
          ? "Menschen, die deinen Kanal begleiten und unterstützen."
          : "Verbinde Twitch, um echte Community-Signale zu sehen."
      }
      title="Community"
    >
      {children}
    </AppShell>
  );
}
