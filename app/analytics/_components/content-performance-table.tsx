import type { TwitchDevelopmentAvailability } from "../../../lib/twitch";

type ContentPerformanceTableProps = {
  rows: TwitchDevelopmentAvailability[];
};

export function ContentPerformanceTable({ rows }: ContentPerformanceTableProps) {
  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#c6a4ff]">
            Daten-Einordnung
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Was Twitch aktuell liefert
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-zinc-500">
          Die Seite zeigt echte Daten, wo Helix sie bereitstellt, und benennt
          Lücken offen.
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-zinc-500">
              {["Bereich", "Status", "Hinweis"].map((heading) => (
                <th
                  key={heading}
                  className="border-b border-white/10 px-3 py-3 font-medium"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="text-zinc-300">
                <td className="border-b border-white/5 px-3 py-4 font-medium text-white">
                  {row.label}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-semibold ${
                      row.status === "available"
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                        : row.status === "limited"
                          ? "border-[#f5d742]/20 bg-[#f5d742]/10 text-[#f5d742]"
                          : "border-white/10 bg-white/[0.04] text-zinc-400"
                    }`}
                  >
                    {getStatusLabel(row.status)}
                  </span>
                </td>
                <td className="border-b border-white/5 px-3 py-4 text-zinc-400">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getStatusLabel(status: TwitchDevelopmentAvailability["status"]) {
  if (status === "available") {
    return "Verfügbar";
  }

  if (status === "limited") {
    return "Eingeschränkt";
  }

  return "Nicht verfügbar";
}
