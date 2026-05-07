export const stats = [
  {
    label: "Menschen dabei",
    value: "124",
    trend: "+12%",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Neue Verbindungen",
    value: "18",
    trend: "+5",
    tone: "text-[#ff66c4]",
  },
  {
    label: "Unterstützer heute",
    value: "7",
    trend: "+2",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Austausch im Chat",
    value: "842",
    trend: "+31%",
    tone: "text-[#f5d742]",
  },
];

export const chartData = [
  { label: "18:00", value: 42 },
  { label: "18:30", value: 55 },
  { label: "19:00", value: 48 },
  { label: "19:30", value: 76 },
  { label: "20:00", value: 68 },
  { label: "20:30", value: 92 },
  { label: "21:00", value: 81 },
];

export const activities = [
  "NerdFan42 folgt dem Kanal",
  "CodeMage hat 3 Monate resubbt",
  "Besonders lebendiger Chat gegen 20:34 Uhr",
  "Clip: Bossfight Fail gespeichert",
];

export const goals = [
  { label: "Community-Ziel", value: "72%" },
  { label: "Unterstützer-Ziel", value: "46%" },
  { label: "Austausch", value: "84%" },
];

export const liveOverview = {
  status: "Live",
  duration: "02:14:38",
  title: "Ranked Grind mit Chat-Challenges",
  category: "Just Chatting",
  currentViewers: 124,
  peakViewers: 186,
  newFollowers: 18,
  subs: 7,
  bits: 2450,
  indicators: [
    { label: "Verbindung", value: "Stabil", tone: "emerald" },
    { label: "Latenz", value: "Niedrig", tone: "cyan" },
    { label: "Alerts", value: "Aktiv", tone: "purple" },
  ],
  events: [
    {
      time: "21:42",
      type: "Follow",
      label: "NerdFan42 folgt jetzt dem Kanal",
    },
    {
      time: "21:35",
      type: "Bits",
      label: "CodeMage hat 500 Bits gesendet",
    },
    {
      time: "21:18",
      type: "Sub",
      label: "PixelPilot hat ein Sub verschenkt",
    },
    {
      time: "20:57",
      type: "Clip",
      label: "Bossfight Fail wurde als Clip gespeichert",
    },
  ],
};

export type Stat = (typeof stats)[number];
export type ChartPoint = (typeof chartData)[number];
export type Goal = (typeof goals)[number];
export type LiveOverviewData = typeof liveOverview;
export type LiveEvent = (typeof liveOverview.events)[number];
