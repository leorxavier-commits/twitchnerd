import type { ChartPoint } from "../_data";

type ViewerChartProps = {
  data: ChartPoint[];
};

export function ViewerChart({ data }: ViewerChartProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Viewer Verlauf</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Beispielwerte aus Mockdaten
          </p>
        </div>
        <span className="rounded-full bg-[#00f5d4]/10 px-3 py-1 text-xs font-semibold text-[#00f5d4]">
          +12%
        </span>
      </div>

      <div className="mt-8 flex h-72 items-end gap-3 border-b border-white/10 pb-4">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <div className="flex h-56 w-full items-end">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#9146ff] via-[#b26bff] to-[#00f5d4]"
                style={{ height: `${item.value}%` }}
              />
            </div>
            <span className="text-xs text-zinc-500">{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
