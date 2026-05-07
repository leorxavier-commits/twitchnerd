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
  channelInfoError: string | null;
  gameId: string | null;
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

type TwitchChannelResponse = {
  data: Array<{
    game_id: string;
    game_name: string;
    title: string;
  }>;
};

type TwitchCategoriesResponse = {
  data: Array<{
    id: string;
    name: string;
  }>;
};

type TwitchApiError = {
  error?: string;
  message?: string;
  status?: number;
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
    const [streamState, channelInfo] = await Promise.all([
      fetchTwitchStream(accessToken, config.clientId, user.id, mockStream),
      fetchTwitchChannelInfo(accessToken, config.clientId, user.id),
    ]);

    const stream = {
      ...streamState,
      category: channelInfo?.category ?? mockStream.category,
      channelInfoError: channelInfo?.error ?? null,
      gameId: channelInfo?.gameId ?? mockStream.gameId,
      title: channelInfo?.title ?? mockStream.title,
    };

    return {
      isAuthenticated: true,
      source: "twitch",
      stream,
      user,
    };
  } catch (error) {
    logTwitchError("dashboard-data", error);

    return {
      isAuthenticated: true,
      source: "mock",
      stream: mockStream,
      user: null,
    };
  }
}

export async function updateTwitchChannel(input: {
  category?: string;
  title?: string;
}) {
  const config = getTwitchConfig();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const expiresAtValue = cookieStore.get(TOKEN_EXPIRES_AT_COOKIE)?.value;
  const expiresAt = expiresAtValue ? Number(expiresAtValue) : 0;

  if (!config.clientId || !accessToken || Date.now() >= expiresAt) {
    return {
      error: "Bitte zuerst mit Twitch einloggen.",
      ok: false,
    };
  }

  try {
    const user = await fetchTwitchUser(accessToken, config.clientId);
    const patch: { game_id?: string; title?: string } = {};

    if (input.title !== undefined) {
      patch.title = input.title.trim();
    }

    if (input.category !== undefined) {
      const categoryName = input.category.trim();

      if (!categoryName) {
        return {
          error: "Bitte eine Kategorie eingeben.",
          ok: false,
        };
      }

      const category = await findTwitchCategory(
        accessToken,
        config.clientId,
        categoryName,
      );

      if (!category) {
        return {
          error: "Keine passende Twitch-Kategorie gefunden.",
          ok: false,
        };
      }

      patch.game_id = category.id;
    }

    await modifyTwitchChannel(accessToken, config.clientId, user.id, patch);

    return {
      ok: true,
    };
  } catch (error) {
    logTwitchError("update-channel", error);

    return {
      error:
        "Twitch konnte nicht aktualisiert werden. Prüfe Scope und Login.",
      ok: false,
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
    throw await createTwitchRequestError("Get Streams", response);
  }

  const payload = (await response.json()) as TwitchStreamsResponse;
  const stream = payload.data[0];

  if (!stream) {
    return {
      category: mockStream.category,
      channelInfoError: null,
      gameId: mockStream.gameId,
      isLive: false,
      startedAt: null,
      title: mockStream.title,
      viewerCount: 0,
    };
  }

  return {
    category: stream.game_name || "Keine Kategorie",
    channelInfoError: null,
    gameId: mockStream.gameId,
    isLive: stream.type === "live",
    startedAt: stream.started_at,
    title: stream.title || "Ohne Streamtitel",
    viewerCount: stream.viewer_count,
  };
}

async function fetchTwitchChannelInfo(
  accessToken: string,
  clientId: string,
  userId: string,
) {
  const params = new URLSearchParams({ broadcaster_id: userId });
  const response = await fetch(`${TWITCH_API_URL}/channels?${params}`, {
    cache: "no-store",
    headers: createTwitchHeaders(accessToken, clientId),
  });

  if (!response.ok) {
    const error = await createTwitchRequestError(
      "Get Channel Information",
      response,
    );
    logTwitchError("get-channel-information", error);

    return {
      category: null,
      error:
        "Kanalinformationen konnten nicht geladen werden. Titel und Kategorie nutzen Mockdaten.",
      gameId: null,
      title: null,
    };
  }

  const payload = (await response.json()) as TwitchChannelResponse;
  const channel = payload.data[0];

  if (!channel) {
    return {
      category: null,
      error:
        "Twitch hat keine Kanalinformationen zurückgegeben. Titel und Kategorie nutzen Mockdaten.",
      gameId: null,
      title: null,
    };
  }

  return {
    category: channel.game_name || "Keine Kategorie",
    error: null,
    gameId: channel.game_id || null,
    title: channel.title || "Ohne Streamtitel",
  };
}

async function findTwitchCategory(
  accessToken: string,
  clientId: string,
  categoryName: string,
) {
  const params = new URLSearchParams({ query: categoryName });
  const response = await fetch(`${TWITCH_API_URL}/search/categories?${params}`, {
    cache: "no-store",
    headers: createTwitchHeaders(accessToken, clientId),
  });

  if (!response.ok) {
    throw await createTwitchRequestError("Search Categories", response);
  }

  const payload = (await response.json()) as TwitchCategoriesResponse;
  const normalized = categoryName.toLowerCase();

  return (
    payload.data.find((category) => category.name.toLowerCase() === normalized) ??
    payload.data[0] ??
    null
  );
}

async function modifyTwitchChannel(
  accessToken: string,
  clientId: string,
  userId: string,
  patch: { game_id?: string; title?: string },
) {
  const params = new URLSearchParams({ broadcaster_id: userId });
  const response = await fetch(`${TWITCH_API_URL}/channels?${params}`, {
    body: JSON.stringify(patch),
    cache: "no-store",
    headers: {
      ...createTwitchHeaders(accessToken, clientId),
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });

  if (!response.ok) {
    throw await createTwitchRequestError("Modify Channel Information", response);
  }
}

function createTwitchHeaders(accessToken: string, clientId: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Client-Id": clientId,
  };
}

async function createTwitchRequestError(endpoint: string, response: Response) {
  let payload: TwitchApiError = {};

  try {
    payload = (await response.json()) as TwitchApiError;
  } catch {
    payload = {};
  }

  return new Error(
    `${endpoint} failed with ${response.status}: ${
      payload.message ?? payload.error ?? "Unknown Twitch error"
    }`,
  );
}

function logTwitchError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`[twitch:${context}] ${error.message}`);
    return;
  }

  console.error(`[twitch:${context}] Unknown Twitch error`);
}
