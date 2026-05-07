export const communityKpis = [
  {
    label: "Menschen im Umfeld",
    value: "-",
    detail: "Wird über Twitch Helix geladen",
    trend: "Live",
    trendDirection: "positive",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Neue Verbindungen",
    value: "-",
    detail: "Im sichtbaren Twitch-Zeitraum",
    trend: "Live",
    trendDirection: "positive",
    tone: "text-[#ff66c4]",
  },
  {
    label: "Unterstützer",
    value: "-",
    detail: "Menschen mit aktiver Unterstützung",
    trend: "Phase 1",
    trendDirection: "positive",
    tone: "text-[#00f5d4]",
  },
];

export type CommunityKpi = (typeof communityKpis)[number];
export type CommunityMember = {
  followDate: string;
  followedAt: string;
  followingSince: string;
  isGiftSub: boolean;
  name: string;
  role: "Moderator" | "VIP" | "Viewer";
  subscribedAt: string | null;
  subscribedSince: string;
  subTier: "Tier 1" | "Tier 2" | "Tier 3" | null;
};
