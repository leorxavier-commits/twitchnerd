import { NextRequest, NextResponse } from "next/server";
import { searchTwitchCategories } from "../../../../lib/twitch";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";
  const result = await searchTwitchCategories(query);

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
