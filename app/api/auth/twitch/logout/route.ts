import { NextResponse } from "next/server";
import { getAuthCookieNames, getTwitchConfig } from "../../../../../lib/twitch";

export function GET() {
  const config = getTwitchConfig();
  const response = NextResponse.redirect(new URL("/dashboard/live", config.appUrl));
  const cookieNames = getAuthCookieNames();

  response.cookies.delete(cookieNames.accessToken);
  response.cookies.delete(cookieNames.expiresAt);
  response.cookies.delete(cookieNames.refreshToken);
  response.cookies.delete(cookieNames.oauthState);

  return response;
}
