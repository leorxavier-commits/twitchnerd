import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "twitch_access_token";
const TOKEN_EXPIRES_AT_COOKIE = "twitch_token_expires_at";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const expiresAtValue = request.cookies.get(TOKEN_EXPIRES_AT_COOKIE)?.value;
  const expiresAt = expiresAtValue ? Number(expiresAtValue) : 0;
  const hasValidTwitchSession = Boolean(
    accessToken && expiresAt && Date.now() < expiresAt,
  );

  if (!hasValidTwitchSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*", "/community/:path*"],
};
