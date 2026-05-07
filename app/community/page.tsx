import { CommunityKpiCard } from "./_components/community-kpi-card";
import { CommunityMemberTable } from "./_components/community-member-table";
import { CommunityShell } from "./_components/community-shell";
import { communityKpis } from "./_data";
import type { CommunityKpi, CommunityMember } from "./_data";
import { getTwitchCommunityData } from "../../lib/twitch";

export default async function CommunityPage() {
  const communityData = await getTwitchCommunityData();
  const members = communityData.members.map((member) => ({
    followDate: formatFollowDate(member.followedAt),
    followedAt: member.followedAt,
    followingSince: formatDurationSince(member.followedAt),
    isGiftSub: member.isGiftSub,
    name: member.userName,
    role: member.role,
    subscribedAt: member.subscribedAt,
    subscribedSince: member.subscribedAt
      ? formatDurationSince(member.subscribedAt)
      : "Nicht verfügbar",
    subTier: member.subTier,
  }));
  const visibleNewFollowers = countVisibleNewFollowers(members);
  const kpis = createCommunityKpis(
    communityData.totalFollowers,
    communityData.totalSubscribers,
    visibleNewFollowers,
  );

  return (
    <CommunityShell isTwitchConnected={communityData.isAuthenticated}>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {kpis.map((kpi) => (
          <CommunityKpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <CommunityMemberTable
        error={communityData.error}
        members={members}
        source={communityData.source}
      />
    </CommunityShell>
  );
}

function createCommunityKpis(
  totalFollowers: number | null,
  totalSubscribers: number | null,
  visibleNewFollowers: number,
): CommunityKpi[] {
  return communityKpis.map((kpi) => {
    if (kpi.label === "Menschen im Umfeld") {
      return {
        ...kpi,
        detail:
          totalFollowers === null
            ? "Noch keine Twitch-Daten verfügbar"
            : "Aus Twitch Helix",
        value: totalFollowers?.toLocaleString("de-DE") ?? "-",
      };
    }

    if (kpi.label === "Unterstützer") {
      return {
        ...kpi,
        detail:
          totalSubscribers === null
            ? "Scope oder Affiliate/Partner-Status nötig"
            : "Aus Twitch Broadcaster Subscriptions",
        value: totalSubscribers?.toLocaleString("de-DE") ?? "-",
      };
    }

    if (kpi.label === "Neue Verbindungen") {
      return {
        ...kpi,
        detail: "Letzte 30 Tage innerhalb der sichtbaren Liste",
        value: `+${visibleNewFollowers.toLocaleString("de-DE")}`,
      };
    }

    return kpi;
  });
}

function countVisibleNewFollowers(members: CommunityMember[]) {
  const since = Date.now() - 1000 * 60 * 60 * 24 * 30;

  return members.filter(
    (member) => new Date(member.followedAt).getTime() >= since,
  ).length;
}

function formatFollowDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatDurationSince(value: string) {
  const startedAt = new Date(value).getTime();
  const diffInDays = Math.max(
    0,
    Math.floor((Date.now() - startedAt) / (1000 * 60 * 60 * 24)),
  );
  const years = Math.floor(diffInDays / 365);
  const months = Math.floor((diffInDays % 365) / 30);

  if (years > 0 && months > 0) {
    return `${years} Jahr${years === 1 ? "" : "e"}, ${months} Monat${
      months === 1 ? "" : "e"
    }`;
  }

  if (years > 0) {
    return `${years} Jahr${years === 1 ? "" : "e"}`;
  }

  if (months > 0) {
    return `${months} Monat${months === 1 ? "" : "e"}`;
  }

  return `${diffInDays} Tag${diffInDays === 1 ? "" : "e"}`;
}
