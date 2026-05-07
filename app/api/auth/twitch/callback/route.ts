import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForToken,
  getAuthCookieNames,
  getTwitchConfig,
} from "../../../../../lib/twitch";

export async function GET(request: NextRequest) {
  const config = getTwitchConfig();
  const cookieNames = getAuthCookieNames();
  const redirectUrl = new URL("/dashboard/live", config.appUrl);
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(cookieNames.oauthState)?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    redirectUrl.searchParams.set("auth", "invalid-state");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const token = await exchangeCodeForToken(code);
    const response = NextResponse.redirect(redirectUrl);
    const expiresAt = Date.now() + token.expires_in * 1000;
    const secure = process.env.NODE_ENV === "production";

    response.cookies.set(cookieNames.accessToken, token.access_token, {
      httpOnly: true,
      maxAge: token.expires_in,
      path: "/",
      sameSite: "lax",
      secure,
    });

    response.cookies.set(cookieNames.expiresAt, expiresAt.toString(), {
      httpOnly: true,
      maxAge: token.expires_in,
      path: "/",
      sameSite: "lax",
      secure,
    });

    if (token.refresh_token) {
      response.cookies.set(cookieNames.refreshToken, token.refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
        secure,
      });
    }

    response.cookies.delete(cookieNames.oauthState);
    return response;
  } catch {
    redirectUrl.searchParams.set("auth", "token-error");
    return NextResponse.redirect(redirectUrl);
  }
}
