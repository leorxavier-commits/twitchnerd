import { NextResponse } from "next/server";
import {
  createOAuthState,
  createTwitchAuthorizeUrl,
  getAuthCookieNames,
  getTwitchConfig,
} from "../../../../../lib/twitch";

export function GET() {
  const config = getTwitchConfig();
  const redirectUrl = new URL("/dashboard/live", config.appUrl);

  if (!config.isConfigured) {
    redirectUrl.searchParams.set("auth", "missing-env");
    return NextResponse.redirect(redirectUrl);
  }

  const state = createOAuthState();
  const response = NextResponse.redirect(createTwitchAuthorizeUrl(state));
  const cookieNames = getAuthCookieNames();

  response.cookies.set(cookieNames.oauthState, state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
