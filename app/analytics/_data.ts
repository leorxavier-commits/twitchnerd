export const periodOptions = [
  "Heute",
  "7 Tage",
  "30 Tage",
  "Monat",
  "Quartal",
  "Jahr",
];

export const groupingOptions = ["taeglich", "woechentlich", "monatlich"];

export const kpis = [
  {
    label: "Ø Zuschauer",
    value: "118",
    detail: "+9% vs. vorheriger Zeitraum",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Peak Zuschauer",
    value: "186",
    detail: "Top-Peak aus Mockdaten",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Streamstunden",
    value: "24,5 h",
    detail: "6 Streams im Zeitraum",
    tone: "text-[#f5d742]",
  },
  {
    label: "Neue Follower",
    value: "+214",
    detail: "+18 pro Stream im Schnitt",
    tone: "text-[#ff66c4]",
  },
  {
    label: "Subs",
    value: "39",
    detail: "inkl. Gift Subs",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Bits",
    value: "12.450",
    detail: "Cheers aus Mockdaten",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Geschaetzte Einnahmen",
    value: "184,20 €",
    detail: "Nur UI-Platzhalter",
    tone: "text-[#f5d742]",
  },
];

export const chartPlaceholders = [
  {
    title: "Viewer-Verlauf",
    description: "Ø und Peak Viewer nach gewaehltem Zeitraum",
    bars: [44, 58, 51, 72, 67, 84, 76, 91, 69, 82],
  },
  {
    title: "Follower/Subs/Bits-Verlauf",
    description: "Community-Wachstum und Support als Mockdaten",
    bars: [28, 35, 48, 42, 56, 62, 54, 70, 64, 78],
  },
  {
    title: "Chat-Aktivitaet",
    description: "Nachrichten und Chat/min im Vergleich",
    bars: [36, 46, 39, 65, 59, 75, 88, 71, 92, 80],
  },
];

export const contentPerformance = [
  {
    category: "Just Chatting",
    streams: 8,
    averageViewers: 132,
    peakViewers: 186,
    followers: 126,
    subs: 18,
    bits: "5.800",
    chatPerMinute: "42",
  },
  {
    category: "Minecraft",
    streams: 5,
    averageViewers: 104,
    peakViewers: 151,
    followers: 58,
    subs: 9,
    bits: "2.250",
    chatPerMinute: "31",
  },
  {
    category: "Retro Games",
    streams: 4,
    averageViewers: 88,
    peakViewers: 123,
    followers: 34,
    subs: 7,
    bits: "1.900",
    chatPerMinute: "27",
  },
  {
    category: "Coding",
    streams: 3,
    averageViewers: 96,
    peakViewers: 140,
    followers: 41,
    subs: 5,
    bits: "2.500",
    chatPerMinute: "24",
  },
];

export type AnalyticsKpi = (typeof kpis)[number];
export type AnalyticsChart = (typeof chartPlaceholders)[number];
export type ContentPerformanceRow = (typeof contentPerformance)[number];
