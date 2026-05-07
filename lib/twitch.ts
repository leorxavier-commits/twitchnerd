import { cookies } from "next/headers";

const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/authorize";
const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const TWITCH_API_URL = "https://api.twitch.tv/helix";

const ACCESS_TOKEN_COOKIE = "twitch_access_token";
const REFRESH_TOKEN_COOKIE = "twitch_refresh_token";
const TOKEN_EXPIRES_AT_COOKIE = "twitch_token_expires_at";
const OAUTH_STATE_COOKIE = "twitch_oauth_state";

export type TwitchUser = {
  displayName: string;
  id: string;
  profileImageUrl: string;
};

export type TwitchStreamStatus = {
  category: string;
  isLive: boolean;
  startedAt: string | null;
  title: string;
  viewerCount: number;
};

export type TwitchDashboardData = {
  isAuthenticated: boolean;
  source: "twitch" | "mock";
  stream: TwitchStreamStatus;
  user: TwitchUser | null;
};

type TwitchTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
};

type TwitchUsersResponse = {
  data: Array<{
    display_name: string;
    id: string;
    profile_image_url: string;
  }>;
};

type TwitchStreamsResponse = {
  data: Array<{
    game_name: string;
    started_at: string;
    title: string;
    type: string;
    viewer_count: number;
  }>;
};

export function getTwitchConfig() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const redirectUri = process.env.TWITCH_REDIRECT_URI;
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const scopes = process.env.TWITCH_OAUTH_SCOPES ?? "";

  return {
    appUrl,
    clientId,
    clientSecret,
    isConfigured: Boolean(clientId && clientSecret && redirectUri),
    redirectUri,
    scopes,
  };
}

export function createOAuthState() {
  return crypto.randomUUID();
}

export function createTwitchAuthorizeUrl(state: string) {
  const config = getTwitchConfig();

  if (!config.clientId || !config.redirectUri) {
    throw new Error("Twitch OAuth is not configured.");
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    force_verify: "true",
    redirect_uri: config.redirectUri,
    response_type: "code",
    state,
  });

  if (config.scopes) {
    params.set("scope", config.scopes);
  }

  return `${TWITCH_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const config = getTwitchConfig();

  if (!config.clientId || !config.clientSecret || !config.redirectUri) {
    throw new Error("Twitch OAuth is not configured.");
  }

  const response = await fetch(TWITCH_TOKEN_URL, {
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: config.redirectUri,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Could not exchange Twitch OAuth code.");
  }

  return (await response.json()) as TwitchTokenResponse;
}

export function getAuthCookieNames() {
  return {
    accessToken: ACCESS_TOKEN_COOKIE,
    expiresAt: TOKEN_EXPIRES_AT_COOKIE,
    oauthState: OAUTH_STATE_COOKIE,
    refreshToken: REFRESH_TOKEN_COOKIE,
  };
}

export async function getTwitchDashboardData(
  mockStream: TwitchStreamStatus,
): Promise<TwitchDashboardData> {
  const config = getTwitchConfig();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const expiresAtValue = cookieStore.get(TOKEN_EXPIRES_AT_COOKIE)?.value;
  const expiresAt = expiresAtValue ? Number(expiresAtValue) : 0;

  if (!config.clientId || !accessToken || Date.now() >= expiresAt) {
    return {
      isAuthenticated: Boolean(accessToken),
      source: "mock",
      stream: mockStream,
      user: null,
    };
  }

  try {
    const user = await fetchTwitchUser(accessToken, config.clientId);
    const stream = await fetchTwitchStream(
      accessToken,
      config.clientId,
      user.id,
      mockStream,
    );

    return {
      isAuthenticated: true,
      source: "twitch",
      stream,
      user,
    };
  } catch {
    return {
      isAuthenticated: true,
      source: "mock",
      stream: mockStream,
      user: null,
    };
  }
}

async function fetchTwitchUser(accessToken: string, clientId: string) {
  const response = await fetch(`${TWITCH_API_URL}/users`, {
    cache: "no-store",
    headers: createTwitchHeaders(accessToken, clientId),
  });

  if (!response.ok) {
    throw new Error("Could not fetch Twitch user.");
  }

  const payload = (await response.json()) as TwitchUsersResponse;
  const user = payload.data[0];

  if (!user) {
    throw new Error("Twitch user response was empty.");
  }

  return {
    displayName: user.display_name,
    id: user.id,
    profileImageUrl: user.profile_image_url,
  };
}

async function fetchTwitchStream(
  accessToken: string,
  clientId: string,
  userId: string,
  mockStream: TwitchStreamStatus,
) {
  const params = new URLSearchParams({ user_id: userId });
  const response = await fetch(`${TWITCH_API_URL}/streams?${params}`, {
    cache: "no-store",
    headers: createTwitchHeaders(accessToken, clientId),
  });

  if (!response.ok) {
    throw new Error("Could not fetch Twitch stream.");
  }

  const payload = (await response.json()) as TwitchStreamsResponse;
  const stream = payload.data[0];

  if (!stream) {
    return {
      category: mockStream.category,
      isLive: false,
      startedAt: null,
      title: mockStream.title,
      viewerCount: 0,
    };
  }

  return {
    category: stream.game_name || "Keine Kategorie",
    isLive: stream.type === "live",
    startedAt: stream.started_at,
    title: stream.title || "Ohne Streamtitel",
    viewerCount: stream.viewer_count,
  };
}

function createTwitchHeaders(accessToken: string, clientId: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Client-Id": clientId,
  };
}
