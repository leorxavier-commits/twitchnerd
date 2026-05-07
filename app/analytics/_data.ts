export const periodOptions = [
  "Heute",
  "7 Tage",
  "30 Tage",
  "Monat",
  "Quartal",
  "Jahr",
];

export const groupingOptions = ["täglich", "wöchentlich", "monatlich"];

export const kpis = [
  {
    label: "Durchschnittliche Begleitung",
    value: "118",
    detail: "Menschen im Stream, über alle Streams gemittelt",
    trend: "+9%",
    trendDirection: "positive",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Stärkster gemeinsamer Moment",
    value: "186",
    detail: "Nur als Kontext, nicht als Erfolgsdruck",
    trend: "+14%",
    trendDirection: "positive",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Streamstunden",
    value: "24,5 h",
    detail: "6 Streams, mit Raum für Pausen",
    trend: "etwas weniger",
    trendDirection: "neutral",
    tone: "text-[#f5d742]",
  },
  {
    label: "Neue Verbindungen",
    value: "+214",
    detail: "Menschen, die den Kanal wiederfinden möchten",
    trend: "+22%",
    trendDirection: "positive",
    tone: "text-[#ff66c4]",
  },
  {
    label: "Unterstützer",
    value: "39",
    detail: "inkl. geschenkter Unterstützung",
    trend: "+6%",
    trendDirection: "positive",
    tone: "text-[#c6a4ff]",
  },
  {
    label: "Bits",
    value: "12.450",
    detail: "Unterstützung aus Beispieldaten",
    trend: "ruhiger",
    trendDirection: "neutral",
    tone: "text-[#00f5d4]",
  },
  {
    label: "Geschätzte Einnahmen",
    value: "184,20 €",
    detail: "Grobe Schätzung aus Subs und Bits",
    trend: "+11%",
    trendDirection: "positive",
    estimated: true,
    tone: "text-[#f5d742]",
  },
];

export const chartPlaceholders = [
  {
    title: "Begleitung im Verlauf",
    description: "Wie viele Menschen dich im gewählten Zeitraum begleitet haben",
    summary: "Abendstreams wirken aktuell verlässlich und gut besucht",
    trend: "+9%",
    trendDirection: "positive",
    bars: [44, 58, 51, 72, 67, 84, 76, 91, 69, 82],
  },
  {
    title: "Community und Unterstützung",
    description: "Neue Verbindungen und Unterstützung als Beispieldaten",
    summary: "Die Community wächst ruhig, Unterstützung schwankt natürlich",
    trend: "+13%",
    trendDirection: "positive",
    bars: [28, 35, 48, 42, 56, 62, 54, 70, 64, 78],
  },
  {
    title: "Austausch im Chat",
    description: "Wie stark Menschen sich im Stream beteiligen",
    summary: "Challenges laden die Community besonders zum Mitmachen ein",
    trend: "etwas ruhiger",
    trendDirection: "neutral",
    bars: [36, 46, 39, 65, 59, 75, 88, 71, 92, 80],
  },
];

export const contentPerformance = [
  {
    category: "Just Chatting",
    isBest: true,
    trend: "+18%",
    trendDirection: "positive",
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
    isBest: false,
    trend: "+7%",
    trendDirection: "positive",
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
    isBest: false,
    trend: "-5%",
    trendDirection: "negative",
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
    isBest: false,
    trend: "+3%",
    trendDirection: "positive",
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
