import { NextRequest, NextResponse } from "next/server";
import { updateTwitchChannel } from "../../../../lib/twitch";

export async function PATCH(request: NextRequest) {
  const payload = (await request.json()) as {
    category?: string;
    title?: string;
  };

  const result = await updateTwitchChannel(payload);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Twitch konnte nicht aktualisiert werden." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
