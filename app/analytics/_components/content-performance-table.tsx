import type { ContentPerformanceRow } from "../_data";

type ContentPerformanceTableProps = {
  rows: ContentPerformanceRow[];
};

export function ContentPerformanceTable({ rows }: ContentPerformanceTableProps) {
  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-zinc-950 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#c6a4ff]">Content Analyse</p>
          <h2 className="mt-2 text-2xl font-bold">
            Welche Inhalte performen?
          </h2>
        </div>
        <p className="text-sm text-zinc-500">Mock-Ranking nach Kategorie</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-zinc-500">
              {[
                "Kategorie",
                "Streams",
                "Ø Viewer",
                "Peak Viewer",
                "Follower",
                "Subs",
                "Bits",
                "Chat/min",
              ].map((heading) => (
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
              <tr key={row.category} className="text-zinc-300">
                <td className="border-b border-white/5 px-3 py-4 font-medium text-white">
                  {row.category}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {row.streams}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {row.averageViewers}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {row.peakViewers}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  +{row.followers}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {row.subs}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {row.bits}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {row.chatPerMinute}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
