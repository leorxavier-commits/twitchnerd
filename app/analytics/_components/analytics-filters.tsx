type AnalyticsFiltersProps = {
  groupingOptions: string[];
  periodOptions: string[];
};

export function AnalyticsFilters({
  groupingOptions,
  periodOptions,
}: AnalyticsFiltersProps) {
  return (
    <section className="mt-6 grid gap-4 rounded-xl border border-white/10 bg-zinc-950 p-4 xl:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-medium text-zinc-400">Zeitraum</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {periodOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                index === 1
                  ? "border-[#9146ff] bg-[#9146ff]/20 text-white"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-400">Gruppierung</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {groupingOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                index === 0
                  ? "border-[#00f5d4]/60 bg-[#00f5d4]/10 text-[#00f5d4]"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
