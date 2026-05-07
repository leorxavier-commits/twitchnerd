export const communityKpis = [
  {
    label: "Follower gesamt",
    value: "8.742",
    detail: "Community-Größe aus Mockdaten",
    trend: "+4,8%",
    trendDirection: "positive",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Neue Follower",
    value: "+214",
    detail: "Im gewählten Zeitraum",
    trend: "+22%",
    trendDirection: "positive",
    tone: "text-[#ff66c4]",
  },
  {
    label: "Aktive Subs",
    value: "312",
    detail: "inkl. Prime und Gift Subs",
    trend: "+6%",
    trendDirection: "positive",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Chatnachrichten",
    value: "18.420",
    detail: "Letzte 30 Tage",
    trend: "-3%",
    trendDirection: "negative",
    tone: "text-[#f5d742]",
  },
  {
    label: "Aktive Chatter",
    value: "486",
    detail: "Mindestens 3 Nachrichten",
    trend: "+11%",
    trendDirection: "positive",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Meistgenutztes Emote",
    value: "Kappa",
    detail: "1.284 Nutzungen",
    trend: "+18%",
    trendDirection: "positive",
    tone: "text-[#c6a4ff]",
  },
];

export const communityMembers = [
  {
    name: "NerdFan42",
    followDate: "12.01.2024",
    followingSince: "1 Jahr, 4 Monate",
    subStatus: "Aktiv",
    subTier: "Tier 1",
    subscribedSince: "8 Monate",
    chatMessages: 1284,
    lastActivity: "vor 4 Minuten",
  },
  {
    name: "CodeMage",
    followDate: "03.03.2023",
    followingSince: "3 Jahre, 2 Monate",
    subStatus: "Aktiv",
    subTier: "Tier 2",
    subscribedSince: "14 Monate",
    chatMessages: 952,
    lastActivity: "vor 18 Minuten",
  },
  {
    name: "PixelPilot",
    followDate: "21.08.2024",
    followingSince: "8 Monate",
    subStatus: "Gift Sub",
    subTier: "Tier 1",
    subscribedSince: "2 Monate",
    chatMessages: 641,
    lastActivity: "heute",
  },
  {
    name: "RetroRina",
    followDate: "17.11.2022",
    followingSince: "3 Jahre, 5 Monate",
    subStatus: "Kein Sub",
    subTier: "-",
    subscribedSince: "-",
    chatMessages: 488,
    lastActivity: "gestern",
  },
  {
    name: "ChatNinja",
    followDate: "09.02.2025",
    followingSince: "1 Jahr, 2 Monate",
    subStatus: "Aktiv",
    subTier: "Prime",
    subscribedSince: "5 Monate",
    chatMessages: 812,
    lastActivity: "vor 1 Stunde",
  },
  {
    name: "BitWizard",
    followDate: "30.06.2023",
    followingSince: "2 Jahre, 10 Monate",
    subStatus: "Aktiv",
    subTier: "Tier 3",
    subscribedSince: "20 Monate",
    chatMessages: 377,
    lastActivity: "diese Woche",
  },
];

export const topChatters = [
  {
    name: "NerdFan42",
    messages: 1284,
    level: "Sehr aktiv",
    trend: "+18%",
    trendDirection: "positive",
  },
  {
    name: "CodeMage",
    messages: 952,
    level: "Sehr aktiv",
    trend: "+9%",
    trendDirection: "positive",
  },
  {
    name: "ChatNinja",
    messages: 812,
    level: "Aktiv",
    trend: "-4%",
    trendDirection: "negative",
  },
  {
    name: "PixelPilot",
    messages: 641,
    level: "Aktiv",
    trend: "+7%",
    trendDirection: "positive",
  },
];

export const emoteAnalytics = [
  {
    emote: "Kappa",
    usage: 1284,
    trend: "+18%",
    trendDirection: "positive",
  },
  {
    emote: "PogChamp",
    usage: 946,
    trend: "+11%",
    trendDirection: "positive",
  },
  {
    emote: "LUL",
    usage: 872,
    trend: "-6%",
    trendDirection: "negative",
  },
  {
    emote: "NerdLove",
    usage: 644,
    trend: "+24%",
    trendDirection: "positive",
  },
];

export type CommunityKpi = (typeof communityKpis)[number];
export type CommunityMember = (typeof communityMembers)[number];
export type TopChatter = (typeof topChatters)[number];
export type EmoteMetric = (typeof emoteAnalytics)[number];
