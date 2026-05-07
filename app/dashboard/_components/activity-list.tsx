type ActivityListProps = {
  activities: string[];
};

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
      <h2 className="text-xl font-semibold">Aktivitäten</h2>
      <div className="mt-5 grid gap-3">
        {activities.map((activity) => (
          <div
            key={activity}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300"
          >
            {activity}
          </div>
        ))}
      </div>
    </article>
  );
}
