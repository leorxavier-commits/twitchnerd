import type { Goal } from "../_data";

type StreamGoalsProps = {
  goals: Goal[];
};

export function StreamGoals({ goals }: StreamGoalsProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5 lg:col-span-2">
      <h2 className="text-xl font-semibold">Stream Ziele</h2>
      <div className="mt-5 grid gap-4">
        {goals.map((goal) => (
          <div key={goal.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">{goal.label}</span>
              <span>{goal.value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-[#9146ff]"
                style={{ width: goal.value }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
