import { NextResponse } from "next/server";
import { liveOverview } from "../../../dashboard/_data";
import { getTwitchDashboardData } from "../../../../lib/twitch";

export async function GET() {
  const data = await getTwitchDashboardData(
    {
      category: liveOverview.category,
      channelInfoError: null,
      gameId: null,
      isLive: liveOverview.status === "Live",
      startedAt: null,
      title: liveOverview.title,
      viewerCount: liveOverview.currentViewers,
    },
    { allowTokenRefresh: true },
  );

  return NextResponse.json(data);
}
