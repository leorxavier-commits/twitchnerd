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
  activityEvents: TwitchActivityEvent[];
  activityWarning: string | null;
  error: string | null;
  isAuthenticated: boolean;
  source: "twitch" | "mock";
  stream: TwitchStreamStatus;
  user: TwitchUser | null;
};

export type TwitchCategory = {
  id: string;
  name: string;
};

export type TwitchFollower = {
  followedAt: string;
  userId: string;
  userLogin: string;
  userName: string;
};

export type TwitchCommunityMember = TwitchFollower & {
  isGiftSub: boolean;
  role: "Moderator" | "VIP" | "Viewer";
  subscribedAt: string | null;
  subTier: "Tier 1" | "Tier 2" | "Tier 3" | null;
};

export type TwitchActivityEventType =
  | "bits"
  | "channel_points"
  | "follow"
  | "gift_sub"
  | "raid"
  | "sub";

export type TwitchActivityEvent = {
  bits?: number;
  id: string;
  raidViewers?: number;
  rewardTitle?: string;
  source: "mock" | "twitch";
  subTier?: "Tier 1" | "Tier 2" | "Tier 3";
  timestamp: string;
  type: TwitchActivityEventType;
  username: string;
};

export type TwitchCommunityData = {
  error: string | null;
  members: TwitchCommunityMember[];
  isAuthenticated: boolean;
  source: "twitch" | "mock";
  totalFollowers: number | null;
  totalSubscribers: number | null;
};

export type TwitchDevelopmentPeriod =
  | "30d"
  | "7d"
  | "month"
  | "quarter"
  | "today"
  | "year";

export type TwitchDevelopmentKpi = {
  detail: string;
  estimated?: boolean;
  label: string;
  source: "twitch" | "unavailable";
  tone: string;
  value: string;
};

export type TwitchDevelopmentChart = {
  bars: number[];
  description: string;
  source: "twitch" | "unavailable";
  summary: string;
  title: string;
};

export type TwitchDevelopmentAvailability = {
  label: string;
  note: string;
  status: "available" | "limited" | "unavailable";
};

export type TwitchDevelopmentData = {
  availability: TwitchDevelopmentAvailability[];
  charts: TwitchDevelopmentChart[];
  error: string | null;
  kpis: TwitchDevelopmentKpi[];
  period: TwitchDevelopmentPeriod;
  periodLabel: string;
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

type TwitchFollowersResponse = {
  data: Array<{
    followed_at: string;
    user_id: string;
    user_login: string;
    user_name: string;
  }>;
  pagination: {
    cursor?: string;
  };
  total: number;
};

type TwitchSubscriptionsResponse = {
  data: Array<{
    gifter_id: string;
    gifter_login: string;
    gifter_name: string;
    is_gift: boolean;
    plan_name: string;
    subscribed_at?: string;
    tier: string;
    user_id: string;
    user_login: string;
    user_name: string;
  }>;
  pagination: {
    cursor?: string;
  };
  points: number;
  total: number;
};

type TwitchRoleUsersResponse = {
  data: Array<{
    user_id: string;
    user_login: string;
    user_name: string;
  }>;
  pagination: {
    cursor?: string;
  };
};

type TwitchBitsLeaderboardResponse = {
  data: Array<{
    rank: number;
    score: number;
    user_id: string;
    user_login: string;
    user_name: string;
  }>;
  date_range: {
    ended_at: string;
    started_at: string;
  };
  total: number;
};

type TwitchBitsLeaderboardResult = {
  bits: number | null;
  error: string | null;
  rankedUsers: number | null;
  unavailableReason: string | null;
};

type TwitchApiError = {
  error?: string;
  message?: string;
  status?: number;
};

type TwitchAuthContext =
  | {
      accessToken: string;
      clientId: string;
      error: null;
      isAuthenticated: true;
    }
  | {
      accessToken: null;
      clientId: string | null;
      error: string | null;
      isAuthenticated: boolean;
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
  options: { allowTokenRefresh?: boolean } = {},
): Promise<TwitchDashboardData> {
  const auth = await getTwitchAuthContext({
    allowTokenRefresh: options.allowTokenRefresh ?? false,
  });

  if (!auth.isAuthenticated) {
    return {
      activityEvents: createPreparedLiveActivityEvents(),
      activityWarning:
        "Activity Feed nutzt vorbereitete Beispieldaten, bis Twitch verbunden ist.",
      error: null,
      isAuthenticated: false,
      source: "mock",
      stream: mockStream,
      user: null,
    };
  }

  if (!auth.accessToken || !auth.clientId) {
    return {
      activityEvents: createPreparedLiveActivityEvents(),
      activityWarning:
        auth.error ??
        "Activity Feed nutzt vorbereitete Beispieldaten, weil der Twitch Login erneuert werden muss.",
      error:
        auth.error ??
        "Twitch ist verbunden, aber der Token ist abgelaufen. Bitte erneut einloggen.",
      isAuthenticated: true,
      source: "twitch",
      stream: createUnavailableTwitchStream(mockStream),
      user: null,
    };
  }

  try {
    const user = await fetchTwitchUser(auth.accessToken, auth.clientId);
    const [streamState, channelInfo] = await Promise.all([
      fetchTwitchStream(auth.accessToken, auth.clientId, user.id),
      fetchTwitchChannelInfo(auth.accessToken, auth.clientId, user.id),
    ]);
    const activity = await fetchTwitchLiveActivityEvents(
      auth.accessToken,
      auth.clientId,
      user.id,
    );

    const stream = {
      ...streamState,
      category: channelInfo?.category ?? streamState.category,
      channelInfoError: channelInfo?.error ?? null,
      gameId: channelInfo?.gameId ?? streamState.gameId,
      title: channelInfo?.title ?? streamState.title,
    };

    return {
      activityEvents: mergeLiveActivityEvents(activity.events),
      activityWarning: activity.warning,
      error: null,
      isAuthenticated: true,
      source: "twitch",
      stream,
      user,
    };
  } catch (error) {
    logTwitchError("dashboard-data", error);

    return {
      activityEvents: createPreparedLiveActivityEvents(),
      activityWarning:
        "Activity Feed nutzt vorbereitete Beispieldaten, weil Twitch-Daten gerade nicht geladen werden konnten.",
      error:
        "Twitch-Daten konnten gerade nicht geladen werden. Bitte Login, Scope und Twitch-Verfügbarkeit prüfen.",
      isAuthenticated: true,
      source: "twitch",
      stream: createUnavailableTwitchStream(mockStream),
      user: null,
    };
  }
}

export async function updateTwitchChannel(input: {
  category?: string;
  categoryId?: string;
  title?: string;
}) {
  const auth = await getTwitchAuthContext({ allowTokenRefresh: true });

  if (!auth.accessToken || !auth.clientId) {
    return {
      error:
        auth.error ??
        "Bitte zuerst mit Twitch einloggen oder den Twitch-Login erneuern.",
      ok: false,
    };
  }

  try {
    const user = await fetchTwitchUser(auth.accessToken, auth.clientId);
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

      const category = input.categoryId
        ? { id: input.categoryId, name: categoryName }
        : await findTwitchCategory(
            auth.accessToken,
            auth.clientId,
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

    await modifyTwitchChannel(auth.accessToken, auth.clientId, user.id, patch);

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

export async function searchTwitchCategories(query: string) {
  const auth = await getTwitchAuthContext({ allowTokenRefresh: true });
  const normalizedQuery = query.trim();

  if (!auth.accessToken || !auth.clientId) {
    return {
      categories: [],
      error:
        auth.error ??
        "Bitte zuerst mit Twitch einloggen, um Kategorien zu suchen.",
      ok: false,
    };
  }

  if (normalizedQuery.length < 2) {
    return {
      categories: [],
      error: null,
      ok: true,
    };
  }

  try {
    const categories = await fetchTwitchCategories(
      auth.accessToken,
      auth.clientId,
      normalizedQuery,
    );

    return {
      categories,
      error: categories.length
        ? null
        : "Keine passende Twitch-Kategorie gefunden.",
      ok: true,
    };
  } catch (error) {
    logTwitchError("search-categories", error);

    return {
      categories: [],
      error: "Twitch-Kategorien konnten gerade nicht geladen werden.",
      ok: false,
    };
  }
}

export async function getTwitchCommunityData(): Promise<TwitchCommunityData> {
  const auth = await getTwitchAuthContext({ allowTokenRefresh: false });

  if (!auth.isAuthenticated) {
    return {
      error: "Verbinde Twitch, um echte Followerdaten zu laden.",
      isAuthenticated: false,
      members: [],
      source: "mock",
      totalFollowers: null,
      totalSubscribers: null,
    };
  }

  if (!auth.accessToken || !auth.clientId) {
    return {
      error:
        auth.error ??
        "Twitch Login ist abgelaufen. Bitte erneut verbinden, um Followerdaten zu laden.",
      isAuthenticated: true,
      members: [],
      source: "twitch",
      totalFollowers: null,
      totalSubscribers: null,
    };
  }

  try {
    const user = await fetchTwitchUser(auth.accessToken, auth.clientId);
    const [followers, subscriptions, vips, moderators] = await Promise.all([
      fetchTwitchFollowers(auth.accessToken, auth.clientId, user.id),
      fetchOptionalTwitchSubscriptions(auth.accessToken, auth.clientId, user.id),
      fetchOptionalTwitchRoleUsers(
        auth.accessToken,
        auth.clientId,
        user.id,
        "vips",
      ),
      fetchOptionalTwitchRoleUsers(
        auth.accessToken,
        auth.clientId,
        user.id,
        "moderators",
      ),
    ]);
    const subscriptionByUserId = new Map(
      subscriptions.subscriptions.map((subscription) => [
        subscription.userId,
        subscription,
      ]),
    );
    const vipIds = new Set(vips.userIds);
    const moderatorIds = new Set(moderators.userIds);
    const members: TwitchCommunityMember[] = followers.followers.map((follower) => {
      const subscription = subscriptionByUserId.get(follower.userId);
      const role: TwitchCommunityMember["role"] = moderatorIds.has(follower.userId)
        ? "Moderator"
        : vipIds.has(follower.userId)
          ? "VIP"
          : "Viewer";

      return {
        ...follower,
        isGiftSub: subscription?.isGift ?? false,
        role,
        subscribedAt: subscription?.subscribedAt ?? null,
        subTier: subscription?.tier ?? null,
      };
    });
    const missingFollowerListScope =
      followers.total > 0 && followers.followers.length === 0;
    const errors = [
      missingFollowerListScope
        ? "Follower-Gesamtzahl ist verfügbar, aber die Liste fehlt. Für Namen und Follow-Datum ist der Scope moderator:read:followers nötig. Bitte Scope ergänzen und Twitch erneut verbinden."
        : null,
      subscriptions.error,
      vips.error,
      moderators.error,
    ].filter(Boolean);

    return {
      error: errors.length > 0 ? errors.join(" ") : null,
      isAuthenticated: true,
      members,
      source: "twitch",
      totalFollowers: followers.total,
      totalSubscribers: subscriptions.total,
    };
  } catch (error) {
    logTwitchError("community-followers", error);

    return {
      error:
        "Twitch-Followerdaten konnten gerade nicht geladen werden. Bitte Login, Scope und Twitch-Verfügbarkeit prüfen.",
      isAuthenticated: true,
      members: [],
      source: "twitch",
      totalFollowers: null,
      totalSubscribers: null,
    };
  }
}

export async function getTwitchDevelopmentData(
  period: TwitchDevelopmentPeriod,
): Promise<TwitchDevelopmentData> {
  const auth = await getTwitchAuthContext({ allowTokenRefresh: false });
  const range = getDevelopmentDateRange(period);
  const unavailable = "Nicht verfügbar";

  if (!auth.accessToken || !auth.clientId) {
    return {
      availability: createDevelopmentAvailability(false, false, false),
      charts: createDevelopmentCharts([], range.label),
      error:
        auth.error ??
        "Verbinde Twitch erneut, um echte Entwicklungsdaten zu laden.",
      kpis: [
        createDevelopmentKpi(
          "Durchschnittliche Begleitung",
          unavailable,
          "Twitch stellt historische Average-Viewer nicht über Helix bereit.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Stärkster gemeinsamer Moment",
          unavailable,
          "Historische Spitzenwerte sind ohne Speicherung nicht abrufbar.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Streamstunden",
          unavailable,
          "Historische Streamdauer ist ohne Analytics-Export oder Speicherung nicht verfügbar.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Neue Verbindungen",
          unavailable,
          "Followerdaten benötigen einen gültigen Twitch Login.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Unterstützer",
          unavailable,
          "Subscriberdaten benötigen einen gültigen Twitch Login.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Geschätzte Einnahmen",
          unavailable,
          "Twitch stellt keine Creator-Einnahmen über Helix bereit.",
          "unavailable",
          "text-zinc-400",
          true,
        ),
      ],
      period,
      periodLabel: range.label,
    };
  }

  try {
    const user = await fetchTwitchUser(auth.accessToken, auth.clientId);
    const [stream, followers, subscriptions, bits] = await Promise.all([
      fetchTwitchStream(auth.accessToken, auth.clientId, user.id),
      fetchTwitchFollowers(auth.accessToken, auth.clientId, user.id),
      fetchOptionalTwitchSubscriptions(auth.accessToken, auth.clientId, user.id),
      fetchOptionalTwitchBits(auth.accessToken, auth.clientId, range),
    ]);
    const followersInRange = followers.followers.filter((follower) =>
      isInDateRange(follower.followedAt, range.startedAt, range.endedAt),
    );
    const currentDuration = stream.startedAt
      ? formatHoursSince(stream.startedAt)
      : null;
    const hasFollowerData = followers.followers.length > 0 || followers.total === 0;
    const hasSubscriberData = subscriptions.total !== null;
    const hasBitsData = bits.bits !== null;

    return {
      availability: createDevelopmentAvailability(
        hasFollowerData,
        hasSubscriberData,
        hasBitsData,
      ),
      charts: createDevelopmentCharts(followersInRange, range.label),
      error: [subscriptions.error, bits.error].filter(Boolean).join(" ") || null,
      kpis: [
        createDevelopmentKpi(
          "Durchschnittliche Begleitung",
          unavailable,
          "Twitch Helix liefert keinen historischen Average-Viewer-Wert für Creator-Kanäle.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Aktuelle Begleitung",
          stream.isLive ? stream.viewerCount.toLocaleString("de-DE") : unavailable,
          stream.isLive
            ? "Live-Snapshot aus Twitch. Kein historischer Spitzenwert."
            : "Der Kanal ist gerade offline; historische Spitzenwerte liefert Helix nicht.",
          stream.isLive ? "twitch" : "unavailable",
          stream.isLive ? "text-[#c6a4ff]" : "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Streamzeit jetzt",
          currentDuration ?? unavailable,
          currentDuration
            ? "Aus Twitch started_at des laufenden Streams berechnet."
            : "Historische Streamstunden sind ohne Speicherung nicht verfügbar.",
          currentDuration ? "twitch" : "unavailable",
          currentDuration ? "text-[#f5d742]" : "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Neue Verbindungen",
          followersInRange.length.toLocaleString("de-DE"),
          `Follower mit Follow-Datum im Zeitraum ${range.label}.`,
          "twitch",
          "text-[#d9c5ff]",
        ),
        createDevelopmentKpi(
          "Unterstützer",
          subscriptions.total?.toLocaleString("de-DE") ?? unavailable,
          subscriptions.total === null
            ? "Benötigt channel:read:subscriptions und einen berechtigten Kanal."
            : "Aktuelle Subscriber aus Twitch Broadcaster Subscriptions.",
          subscriptions.total === null ? "unavailable" : "twitch",
          subscriptions.total === null ? "text-zinc-400" : "text-[#c6a4ff]",
        ),
        createDevelopmentKpi(
          "Geschätzte Einnahmen",
          unavailable,
          bits.bits === null
            ? bits.unavailableReason ??
              "Twitch stellt keine Creator-Einnahmen über Helix bereit. Bits benötigen optional bits:read."
            : `${bits.bits.toLocaleString(
                "de-DE",
              )} Bits im Twitch Leaderboard-Zeitraum sichtbar; Einnahmen werden bewusst nicht geschätzt.`,
          "unavailable",
          "text-zinc-400",
          true,
        ),
      ],
      period,
      periodLabel: range.label,
    };
  } catch (error) {
    logTwitchError("development-data", error);

    return {
      availability: createDevelopmentAvailability(false, false, false),
      charts: createDevelopmentCharts([], range.label),
      error:
        "Entwicklungsdaten konnten gerade nicht geladen werden. Bitte Login, Scopes und Twitch-Verfügbarkeit prüfen.",
      kpis: [
        createDevelopmentKpi(
          "Durchschnittliche Begleitung",
          unavailable,
          "Nicht geladen.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Aktuelle Begleitung",
          unavailable,
          "Nicht geladen.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Streamzeit jetzt",
          unavailable,
          "Nicht geladen.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Neue Verbindungen",
          unavailable,
          "Nicht geladen.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Unterstützer",
          unavailable,
          "Nicht geladen.",
          "unavailable",
          "text-zinc-400",
        ),
        createDevelopmentKpi(
          "Geschätzte Einnahmen",
          unavailable,
          "Nicht geladen.",
          "unavailable",
          "text-zinc-400",
          true,
        ),
      ],
      period,
      periodLabel: range.label,
    };
  }
}

async function getTwitchAuthContext({
  allowTokenRefresh,
}: {
  allowTokenRefresh: boolean;
}): Promise<TwitchAuthContext> {
  const config = getTwitchConfig();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const expiresAtValue = cookieStore.get(TOKEN_EXPIRES_AT_COOKIE)?.value;
  const expiresAt = expiresAtValue ? Number(expiresAtValue) : 0;

  if (!config.clientId) {
    return {
      accessToken: null,
      clientId: null,
      error: null,
      isAuthenticated: false,
    };
  }

  if (accessToken && Date.now() < expiresAt) {
    return {
      accessToken,
      clientId: config.clientId,
      error: null,
      isAuthenticated: true,
    };
  }

  if (
    allowTokenRefresh &&
    refreshToken &&
    config.clientId &&
    config.clientSecret
  ) {
    try {
      const token = await refreshTwitchToken(refreshToken);
      setAuthCookies(cookieStore, token, refreshToken);

      return {
        accessToken: token.access_token,
        clientId: config.clientId,
        error: null,
        isAuthenticated: true,
      };
    } catch (error) {
      logTwitchError("refresh-token", error);

      return {
        accessToken: null,
        clientId: config.clientId,
        error:
          "Twitch Login konnte nicht automatisch erneuert werden. Bitte erneut verbinden.",
        isAuthenticated: true,
      };
    }
  }

  if (accessToken || refreshToken) {
    return {
      accessToken: null,
      clientId: config.clientId,
      error:
        "Twitch Login ist abgelaufen. Bitte erneut verbinden, falls die Live-Daten nicht automatisch laden.",
      isAuthenticated: true,
    };
  }

  return {
    accessToken: null,
    clientId: config.clientId,
    error: null,
    isAuthenticated: false,
  };
}

async function refreshTwitchToken(refreshToken: string) {
  const config = getTwitchConfig();

  if (!config.clientId || !config.clientSecret) {
    throw new Error("Twitch OAuth is not configured.");
  }

  const response = await fetch(TWITCH_TOKEN_URL, {
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw await createTwitchRequestError("Refresh Token", response);
  }

  return (await response.json()) as TwitchTokenResponse;
}

function setAuthCookies(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  token: TwitchTokenResponse,
  previousRefreshToken: string,
) {
  const expiresAt = Date.now() + token.expires_in * 1000;
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set(ACCESS_TOKEN_COOKIE, token.access_token, {
    httpOnly: true,
    maxAge: token.expires_in,
    path: "/",
    sameSite: "lax",
    secure,
  });

  cookieStore.set(TOKEN_EXPIRES_AT_COOKIE, expiresAt.toString(), {
    httpOnly: true,
    maxAge: token.expires_in,
    path: "/",
    sameSite: "lax",
    secure,
  });

  cookieStore.set(
    REFRESH_TOKEN_COOKIE,
    token.refresh_token ?? previousRefreshToken,
    {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure,
    },
  );
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
      category: "Offline",
      channelInfoError: null,
      gameId: null,
      isLive: false,
      startedAt: null,
      title: "Aktuell offline",
      viewerCount: 0,
    };
  }

  return {
    category: stream.game_name || "Keine Kategorie",
    channelInfoError: null,
    gameId: null,
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
        "Kanalinformationen konnten nicht geladen werden. Titel und Kategorie bleiben bis zum nächsten Refresh unverändert.",
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
        "Twitch hat keine Kanalinformationen zurückgegeben. Titel und Kategorie bleiben bis zum nächsten Refresh unverändert.",
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
  const categories = await fetchTwitchCategories(
    accessToken,
    clientId,
    categoryName,
  );
  const normalized = categoryName.toLowerCase();

  return (
    categories.find((category) => category.name.toLowerCase() === normalized) ??
    categories[0] ??
    null
  );
}

async function fetchTwitchCategories(
  accessToken: string,
  clientId: string,
  query: string,
): Promise<TwitchCategory[]> {
  const params = new URLSearchParams({ query });
  const response = await fetch(`${TWITCH_API_URL}/search/categories?${params}`, {
    cache: "no-store",
    headers: createTwitchHeaders(accessToken, clientId),
  });

  if (!response.ok) {
    throw await createTwitchRequestError("Search Categories", response);
  }

  const payload = (await response.json()) as TwitchCategoriesResponse;

  return payload.data.map((category) => ({
    id: category.id,
    name: category.name,
  }));
}

async function fetchTwitchFollowers(
  accessToken: string,
  clientId: string,
  broadcasterId: string,
) {
  const followers: TwitchFollower[] = [];
  let cursor: string | undefined;
  let total = 0;

  do {
    const params = new URLSearchParams({
      broadcaster_id: broadcasterId,
      first: "100",
    });

    if (cursor) {
      params.set("after", cursor);
    }

    const response = await fetch(
      `${TWITCH_API_URL}/channels/followers?${params}`,
      {
        cache: "no-store",
        headers: createTwitchHeaders(accessToken, clientId),
      },
    );

    if (!response.ok) {
      throw await createTwitchRequestError("Get Channel Followers", response);
    }

    const payload = (await response.json()) as TwitchFollowersResponse;

    total = payload.total;
    cursor = payload.pagination.cursor;
    followers.push(
      ...payload.data.map((follower) => ({
        followedAt: follower.followed_at,
        userId: follower.user_id,
        userLogin: follower.user_login,
        userName: follower.user_name,
      })),
    );
  } while (cursor);

  return {
    followers,
    total,
  };
}

async function fetchTwitchLiveActivityEvents(
  accessToken: string,
  clientId: string,
  broadcasterId: string,
) {
  try {
    const params = new URLSearchParams({
      broadcaster_id: broadcasterId,
      first: "8",
    });
    const response = await fetch(
      `${TWITCH_API_URL}/channels/followers?${params}`,
      {
        cache: "no-store",
        headers: createTwitchHeaders(accessToken, clientId),
      },
    );

    if (!response.ok) {
      throw await createTwitchRequestError(
        "Get Channel Followers for Activity",
        response,
      );
    }

    const payload = (await response.json()) as TwitchFollowersResponse;

    return {
      events: payload.data.map((follower) => ({
        id: `follow-${follower.user_id}-${follower.followed_at}`,
        source: "twitch" as const,
        timestamp: follower.followed_at,
        type: "follow" as const,
        username: follower.user_name,
      })),
      warning:
        "Follows kommen aus Twitch Helix. Subs, Bits, Raids und Kanalpunkte sind bis EventSub vorbereitet und als Beispieldaten markiert.",
    };
  } catch (error) {
    logTwitchError("live-activity", error);

    return {
      events: [],
      warning:
        "Follower-Events konnten nicht geladen werden. Activity Feed zeigt vorbereitete Beispieldaten.",
    };
  }
}

function mergeLiveActivityEvents(events: TwitchActivityEvent[]) {
  return [...events, ...createPreparedLiveActivityEvents()]
    .toSorted(
      (first, second) =>
        new Date(second.timestamp).getTime() - new Date(first.timestamp).getTime(),
    )
    .slice(0, 14);
}

function createPreparedLiveActivityEvents(): TwitchActivityEvent[] {
  const now = Date.now();

  return [
    {
      id: "prepared-gift-sub-1",
      source: "mock",
      subTier: "Tier 1",
      timestamp: new Date(now - 1000 * 60 * 4).toISOString(),
      type: "gift_sub",
      username: "CodeMage",
    },
    {
      bits: 500,
      id: "prepared-bits-1",
      source: "mock",
      timestamp: new Date(now - 1000 * 60 * 9).toISOString(),
      type: "bits",
      username: "BitWizard",
    },
    {
      id: "prepared-sub-1",
      source: "mock",
      subTier: "Tier 2",
      timestamp: new Date(now - 1000 * 60 * 14).toISOString(),
      type: "sub",
      username: "PixelPilot",
    },
    {
      id: "prepared-raid-1",
      raidViewers: 37,
      source: "mock",
      timestamp: new Date(now - 1000 * 60 * 22).toISOString(),
      type: "raid",
      username: "RetroRina",
    },
    {
      id: "prepared-channel-points-1",
      rewardTitle: "Sound Alert",
      source: "mock",
      timestamp: new Date(now - 1000 * 60 * 31).toISOString(),
      type: "channel_points",
      username: "NerdFan42",
    },
  ];
}

async function fetchOptionalTwitchBits(
  accessToken: string,
  clientId: string,
  range: ReturnType<typeof getDevelopmentDateRange>,
): Promise<TwitchBitsLeaderboardResult> {
  const bitsWindow = getBitsLeaderboardWindow(range.period);

  if (!bitsWindow) {
    return {
      bits: null,
      error: null,
      rankedUsers: null,
      unavailableReason:
        "Bits Leaderboard unterstützt nur Tag, Woche, Monat oder Jahr; dieser Zeitraum wird nicht geschätzt.",
    };
  }

  try {
    const params = new URLSearchParams({
      count: "100",
      period: bitsWindow.period,
      started_at: range.startedAt.toISOString(),
    });
    const response = await fetch(`${TWITCH_API_URL}/bits/leaderboard?${params}`, {
      cache: "no-store",
      headers: createTwitchHeaders(accessToken, clientId),
    });

    if (!response.ok) {
      throw await createTwitchRequestError("Get Bits Leaderboard", response);
    }

    const payload = (await response.json()) as TwitchBitsLeaderboardResponse;
    const bits = payload.data.reduce((sum, entry) => sum + entry.score, 0);

    return {
      bits,
      error: null,
      rankedUsers: payload.total,
      unavailableReason: null,
    };
  } catch (error) {
    logTwitchError("development-bits", error);

    return {
      bits: null,
      error:
        "Bits konnten nicht geladen werden. Dafür wird optional der Scope bits:read benötigt.",
      rankedUsers: null,
      unavailableReason: null,
    };
  }
}

function getDevelopmentDateRange(period: TwitchDevelopmentPeriod) {
  const now = new Date();
  const endedAt = now;
  const startedAt = new Date(now);

  if (period === "today") {
    startedAt.setHours(0, 0, 0, 0);
    return { endedAt, label: "Heute", period, startedAt };
  }

  if (period === "7d") {
    startedAt.setDate(startedAt.getDate() - 7);
    return { endedAt, label: "7 Tage", period, startedAt };
  }

  if (period === "month") {
    startedAt.setDate(1);
    startedAt.setHours(0, 0, 0, 0);
    return { endedAt, label: "Monat", period, startedAt };
  }

  if (period === "quarter") {
    startedAt.setMonth(startedAt.getMonth() - 3);
    return { endedAt, label: "Quartal", period, startedAt };
  }

  if (period === "year") {
    startedAt.setFullYear(startedAt.getFullYear() - 1);
    return { endedAt, label: "Jahr", period, startedAt };
  }

  startedAt.setDate(startedAt.getDate() - 30);
  return { endedAt, label: "30 Tage", period, startedAt };
}

function getBitsLeaderboardWindow(period: TwitchDevelopmentPeriod) {
  if (period === "today") {
    return { period: "day" };
  }

  if (period === "7d") {
    return { period: "week" };
  }

  if (period === "month") {
    return { period: "month" };
  }

  if (period === "year") {
    return { period: "year" };
  }

  return null;
}

function createDevelopmentKpi(
  label: string,
  value: string,
  detail: string,
  source: TwitchDevelopmentKpi["source"],
  tone: string,
  estimated = false,
): TwitchDevelopmentKpi {
  return {
    detail,
    estimated,
    label,
    source,
    tone,
    value,
  };
}

function createDevelopmentCharts(
  followers: TwitchFollower[],
  periodLabel: string,
): TwitchDevelopmentChart[] {
  const bars = createFollowerBars(followers);

  return [
    {
      bars,
      description:
        "Neue Follows aus Twitch Helix, nach Follow-Datum im gewählten Zeitraum gruppiert.",
      source: bars.some((bar) => bar > 0) ? "twitch" : "unavailable",
      summary:
        bars.some((bar) => bar > 0)
          ? `Echte neue Verbindungen im Zeitraum ${periodLabel}.`
          : `Für ${periodLabel} wurden keine neuen Follows gefunden oder der Scope fehlt.`,
      title: "Neue Verbindungen im Verlauf",
    },
    {
      bars: [],
      description:
        "Historische Average Viewer, Peaks und Streamstunden stellt Twitch Helix für Creator-Kanäle nicht bereit.",
      source: "unavailable",
      summary:
        "Diese Werte brauchen später Analytics-Exports oder eigene Speicherung.",
      title: "Begleitung und Streamzeit",
    },
  ];
}

function createDevelopmentAvailability(
  hasFollowerData: boolean,
  hasSubscriberData: boolean,
  hasBitsData: boolean,
): TwitchDevelopmentAvailability[] {
  return [
    {
      label: "Follower",
      note: hasFollowerData
        ? "Echte Follow-Daten mit Zeitstempel verfügbar."
        : "Benötigt moderator:read:followers.",
      status: hasFollowerData ? "available" : "limited",
    },
    {
      label: "Subscriber",
      note: hasSubscriberData
        ? "Aktuelle Subscriber und Tier verfügbar."
        : "Benötigt channel:read:subscriptions und einen berechtigten Kanal.",
      status: hasSubscriberData ? "available" : "limited",
    },
    {
      label: "Bits",
      note: hasBitsData
        ? "Bits-Summe aus dem Twitch Leaderboard verfügbar; keine Einnahmenschätzung."
        : "Optional mit bits:read und nur für Tag, Woche, Monat oder Jahr exakt verfügbar.",
      status: hasBitsData ? "available" : "limited",
    },
    {
      label: "Historische Stream-Analytics",
      note: "Average Viewer, Peaks, Streamstunden und Einnahmen sind über Helix nicht als Creator-Analytics verfügbar.",
      status: "unavailable",
    },
  ];
}

function createFollowerBars(followers: TwitchFollower[]) {
  const bucketCount = 10;
  const buckets = Array.from({ length: bucketCount }, () => 0);

  if (followers.length === 0) {
    return buckets;
  }

  const sortedFollowers = followers.toSorted(
    (first, second) =>
      new Date(first.followedAt).getTime() - new Date(second.followedAt).getTime(),
  );
  const firstTime = new Date(sortedFollowers[0].followedAt).getTime();
  const lastTime = new Date(
    sortedFollowers[sortedFollowers.length - 1].followedAt,
  ).getTime();
  const span = Math.max(1, lastTime - firstTime);

  for (const follower of sortedFollowers) {
    const position = Math.min(
      bucketCount - 1,
      Math.floor(
        ((new Date(follower.followedAt).getTime() - firstTime) / span) *
          bucketCount,
      ),
    );

    buckets[position] += 1;
  }

  const max = Math.max(...buckets);

  return buckets.map((bucket) => (max > 0 ? Math.max(8, (bucket / max) * 100) : 0));
}

function formatHoursSince(value: string) {
  const hours = Math.max(
    0,
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60),
  );

  return `${hours.toLocaleString("de-DE", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} h`;
}

function isInDateRange(value: string, startedAt: Date, endedAt: Date) {
  const time = new Date(value).getTime();

  return time >= startedAt.getTime() && time <= endedAt.getTime();
}

async function fetchOptionalTwitchSubscriptions(
  accessToken: string,
  clientId: string,
  broadcasterId: string,
) {
  const subscriptions: Array<{
    isGift: boolean;
    subscribedAt: string | null;
    tier: "Tier 1" | "Tier 2" | "Tier 3";
    userId: string;
  }> = [];
  let cursor: string | undefined;
  let total: number | null = null;

  try {
    do {
      const params = new URLSearchParams({
        broadcaster_id: broadcasterId,
        first: "100",
      });

      if (cursor) {
        params.set("after", cursor);
      }

      const response = await fetch(
        `${TWITCH_API_URL}/subscriptions?${params}`,
        {
          cache: "no-store",
          headers: createTwitchHeaders(accessToken, clientId),
        },
      );

      if (!response.ok) {
        throw await createTwitchRequestError(
          "Get Broadcaster Subscriptions",
          response,
        );
      }

      const payload = (await response.json()) as TwitchSubscriptionsResponse;

      total = payload.total;
      cursor = payload.pagination.cursor;
      subscriptions.push(
        ...payload.data.map((subscription) => ({
          isGift: subscription.is_gift,
          subscribedAt: subscription.subscribed_at ?? null,
          tier: formatSubTier(subscription.tier),
          userId: subscription.user_id,
        })),
      );
    } while (cursor);

    return {
      error: null,
      subscriptions,
      total,
    };
  } catch (error) {
    logTwitchError("community-subscriptions", error);

    return {
      error:
        "Subscriberdaten konnten nicht geladen werden. Für Substatus und Tier wird der Scope channel:read:subscriptions benötigt.",
      subscriptions: [],
      total: null,
    };
  }
}

async function fetchOptionalTwitchRoleUsers(
  accessToken: string,
  clientId: string,
  broadcasterId: string,
  role: "moderators" | "vips",
) {
  const userIds: string[] = [];
  let cursor: string | undefined;

  try {
    do {
      const params = new URLSearchParams({
        broadcaster_id: broadcasterId,
        first: "100",
      });

      if (cursor) {
        params.set("after", cursor);
      }

      const response = await fetch(
        `${TWITCH_API_URL}/${role === "vips" ? "channels/vips" : "moderation/moderators"}?${params}`,
        {
          cache: "no-store",
          headers: createTwitchHeaders(accessToken, clientId),
        },
      );

      if (!response.ok) {
        throw await createTwitchRequestError(
          role === "vips" ? "Get VIPs" : "Get Moderators",
          response,
        );
      }

      const payload = (await response.json()) as TwitchRoleUsersResponse;

      cursor = payload.pagination.cursor;
      userIds.push(...payload.data.map((user) => user.user_id));
    } while (cursor);

    return {
      error: null,
      userIds,
    };
  } catch (error) {
    logTwitchError(`community-${role}`, error);

    return {
      error:
        role === "vips"
          ? "VIP-Rollen konnten nicht geladen werden. Dafür wird der Scope channel:read:vips benötigt."
          : "Moderator-Rollen konnten nicht geladen werden. Dafür wird der Scope moderation:read benötigt.",
      userIds: [],
    };
  }
}

function formatSubTier(tier: string): "Tier 1" | "Tier 2" | "Tier 3" {
  if (tier === "3000") {
    return "Tier 3";
  }

  if (tier === "2000") {
    return "Tier 2";
  }

  return "Tier 1";
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

function createUnavailableTwitchStream(
  fallback: TwitchStreamStatus,
): TwitchStreamStatus {
  return {
    category: fallback.category,
    channelInfoError: null,
    gameId: fallback.gameId,
    isLive: false,
    startedAt: null,
    title: fallback.title,
    viewerCount: 0,
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
