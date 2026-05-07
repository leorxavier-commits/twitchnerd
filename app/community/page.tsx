import { CommunityKpiCard } from "./_components/community-kpi-card";
import { CommunityMemberTable } from "./_components/community-member-table";
import { CommunityShell } from "./_components/community-shell";
import { EmoteAnalytics } from "./_components/emote-analytics";
import { TopChattersList } from "./_components/top-chatters-list";
import {
  communityKpis,
  communityMembers,
  emoteAnalytics,
  topChatters,
} from "./_data";

export default function CommunityPage() {
  return (
    <CommunityShell>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {communityKpis.map((kpi) => (
          <CommunityKpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <CommunityMemberTable members={communityMembers} />
        <div className="grid content-start gap-6">
          <TopChattersList chatters={topChatters} />
          <EmoteAnalytics emotes={emoteAnalytics} />
        </div>
      </div>
    </CommunityShell>
  );
}
