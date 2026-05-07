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
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-300">Zeitraum</p>
          <span className="text-xs text-zinc-600">Mock-Auswahl</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1 rounded-xl border border-white/10 bg-[#08060d] p-1">
          {periodOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                index === 1
                  ? "bg-[#9146ff] text-white shadow-lg shadow-[#9146ff]/20"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-300">Gruppierung</p>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-[#08060d] p-1">
          {groupingOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${
                index === 0
                  ? "bg-[#00f5d4]/15 text-[#00f5d4]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
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
