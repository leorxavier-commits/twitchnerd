import type { TwitchDevelopmentPeriod } from "../../lib/twitch";

export const periodOptions: Array<{
  label: string;
  value: TwitchDevelopmentPeriod;
}> = [
  { label: "Heute", value: "today" },
  { label: "7 Tage", value: "7d" },
  { label: "30 Tage", value: "30d" },
  { label: "Monat", value: "month" },
  { label: "Quartal", value: "quarter" },
  { label: "Jahr", value: "year" },
];
