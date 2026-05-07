import type { CommunityMember } from "../_data";

type CommunityMemberTableProps = {
  members: CommunityMember[];
};

export function CommunityMemberTable({ members }: CommunityMemberTableProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-[#c6a4ff]">Follower & Subs</p>
          <h2 className="mt-2 text-2xl font-bold">Community-Mitglieder</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Übersicht über Follower, Substatus und Chat-Aktivität.
          </p>
        </div>

        <label className="block w-full max-w-sm">
          <span className="text-xs font-medium text-zinc-500">Suche</span>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#08060d] px-4 py-3 text-sm text-zinc-300 outline-none transition placeholder:text-zinc-600 focus:border-[#9146ff]/70"
            placeholder="Name oder Status suchen"
            type="search"
          />
        </label>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[1080px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-zinc-500">
              {[
                "Name",
                "Follow-Datum",
                "Folgt seit",
                "Substatus",
                "Sub-Tier",
                "Abonniert seit",
                "Chatnachrichten",
                "Letzte Aktivität",
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
            {members.map((member) => (
              <tr key={member.name} className="text-zinc-300">
                <td className="border-b border-white/5 px-3 py-4 font-semibold text-white">
                  {member.name}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {member.followDate}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {member.followingSince}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      member.subStatus === "Kein Sub"
                        ? "bg-white/[0.04] text-zinc-400"
                        : "bg-[#9146ff]/15 text-[#d9c5ff]"
                    }`}
                  >
                    {member.subStatus}
                  </span>
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {member.subTier}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {member.subscribedSince}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {member.chatMessages.toLocaleString("de-DE")}
                </td>
                <td className="border-b border-white/5 px-3 py-4">
                  {member.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
