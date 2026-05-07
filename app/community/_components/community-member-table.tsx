"use client";

import type { CommunityMember } from "../_data";
import { useMemo, useState } from "react";

type FilterValue = "all" | "no-sub" | "sub-only" | "tier-1" | "tier-2" | "tier-3";
type SortValue =
  | "alphabetical"
  | "highest-tier"
  | "longest-sub"
  | "newest-follow"
  | "oldest-follow";

type CommunityMemberTableProps = {
  error: string | null;
  members: CommunityMember[];
  source: "mock" | "twitch";
};

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "Alle", value: "all" },
  { label: "Nur Unterstützer", value: "sub-only" },
  { label: "Ohne aktive Unterstützung", value: "no-sub" },
  { label: "Tier 1", value: "tier-1" },
  { label: "Tier 2", value: "tier-2" },
  { label: "Tier 3", value: "tier-3" },
];

const sortOptions: Array<{ label: string; value: SortValue }> = [
  { label: "Neueste Follower", value: "newest-follow" },
  { label: "Älteste Follower", value: "oldest-follow" },
  { label: "Alphabetisch", value: "alphabetical" },
  { label: "Höchstes Sub Tier", value: "highest-tier" },
  { label: "Längste Subscription", value: "longest-sub" },
];

export function CommunityMemberTable({
  error,
  members,
  source,
}: CommunityMemberTableProps) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("newest-follow");
  const visibleMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members
      .filter((member) => {
        if (normalizedQuery && !member.name.toLowerCase().includes(normalizedQuery)) {
          return false;
        }

        if (filter === "sub-only") {
          return Boolean(member.subTier);
        }

        if (filter === "no-sub") {
          return !member.subTier;
        }

        if (filter === "tier-1") {
          return member.subTier === "Tier 1";
        }

        if (filter === "tier-2") {
          return member.subTier === "Tier 2";
        }

        if (filter === "tier-3") {
          return member.subTier === "Tier 3";
        }

        return true;
      })
      .toSorted((first, second) => sortMembers(first, second, sort));
  }, [filter, members, query, sort]);

  return (
    <section className="mt-6 rounded-xl border border-white/10 bg-zinc-950 p-5 shadow-lg shadow-black/10">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-medium text-[#c6a4ff]">
            {source === "twitch" ? "Twitch Community" : "Community"}
          </p>
          <h2 className="mt-2 text-2xl font-bold">Menschen und Unterstützung</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Eine ruhige Liste der Menschen, die deinem Kanal folgen oder ihn
            aktiv unterstützen. Keine Chatnachrichten und keine Chat-Logs.
          </p>
        </div>

        <label className="block w-full max-w-xs">
          <span className="text-xs font-medium text-zinc-500">Suche</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#08060d] px-4 py-3 text-sm text-zinc-300 outline-none transition placeholder:text-zinc-600 focus:border-[#9146ff]/70"
            placeholder="Name suchen"
            type="search"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                filter === item.value
                  ? "border-[#9146ff]/60 bg-[#9146ff]/25 text-[#efe7ff]"
                  : "border-white/10 bg-[#08060d] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3">
          <span className="text-xs font-medium text-zinc-500">Sortierung</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortValue)}
            className="rounded-lg border border-white/10 bg-[#08060d] px-3 py-2 text-sm font-medium text-zinc-300 outline-none transition focus:border-[#9146ff]/70"
          >
            {sortOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-zinc-500">
              {[
                "Username",
                "Folgt seit",
                "Unterstützt",
                "Sub Tier",
                "Abonniert seit",
                "Rolle",
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
            {visibleMembers.length > 0 ? (
              visibleMembers.map((member) => (
                <tr
                  key={`${member.name}-${member.followedAt}`}
                  className={`text-zinc-300 transition hover:bg-white/[0.03] ${
                    member.subTier
                      ? "bg-[linear-gradient(90deg,rgba(145,70,255,0.12),rgba(145,70,255,0.03)_42%,transparent)]"
                      : ""
                  }`}
                >
                  <td className="border-b border-white/5 px-3 py-4">
                    <div>
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="mt-1 text-xs text-zinc-600">
                        {member.followDate}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">
                    {member.followingSince}
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        member.subTier
                          ? "border border-[#9146ff]/40 bg-[#9146ff]/25 text-[#efe7ff]"
                          : "bg-white/[0.04] text-zinc-500"
                      }`}
                    >
                      {member.subTier
                        ? member.isGiftSub
                          ? "Gift Sub"
                          : "Ja"
                        : "Nein"}
                    </span>
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">
                    {member.subTier ? (
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${getTierClass(
                          member.subTier,
                        )}`}
                      >
                        {member.subTier}
                      </span>
                    ) : (
                      <span className="text-zinc-600">-</span>
                    )}
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">
                    {member.subTier ? member.subscribedSince : "-"}
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${getRoleClass(
                        member.role,
                      )}`}
                    >
                      {member.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-zinc-400">
                <td
                  className="border-b border-white/5 px-3 py-8 text-center"
                  colSpan={6}
                >
                  {members.length > 0
                    ? "Keine Person für diese Suche gefunden."
                    : "Noch keine Community-Liste verfügbar."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getTierClass(tier: NonNullable<CommunityMember["subTier"]>) {
  if (tier === "Tier 3") {
    return "border border-[#f5d742]/40 bg-[#f5d742]/15 text-[#f5d742] shadow-sm shadow-[#f5d742]/10";
  }

  if (tier === "Tier 2") {
    return "border border-[#00f5d4]/35 bg-[#00f5d4]/15 text-[#00f5d4] shadow-sm shadow-[#00f5d4]/10";
  }

  return "border border-[#9146ff]/40 bg-[#9146ff]/20 text-[#d9c5ff] shadow-sm shadow-[#9146ff]/10";
}

function getRoleClass(role: CommunityMember["role"]) {
  if (role === "Moderator") {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (role === "VIP") {
    return "bg-rose-400/10 text-rose-300";
  }

  return "bg-white/[0.04] text-zinc-400";
}

function sortMembers(
  first: CommunityMember,
  second: CommunityMember,
  sort: SortValue,
) {
  if (sort === "oldest-follow") {
    return getTime(first.followedAt) - getTime(second.followedAt);
  }

  if (sort === "alphabetical") {
    return first.name.localeCompare(second.name, "de-DE");
  }

  if (sort === "highest-tier") {
    return getTierRank(second.subTier) - getTierRank(first.subTier);
  }

  if (sort === "longest-sub") {
    const firstTime = first.subscribedAt ? getTime(first.subscribedAt) : Number.POSITIVE_INFINITY;
    const secondTime = second.subscribedAt
      ? getTime(second.subscribedAt)
      : Number.POSITIVE_INFINITY;

    return firstTime - secondTime;
  }

  return getTime(second.followedAt) - getTime(first.followedAt);
}

function getTierRank(tier: CommunityMember["subTier"]) {
  if (tier === "Tier 3") {
    return 3;
  }

  if (tier === "Tier 2") {
    return 2;
  }

  if (tier === "Tier 1") {
    return 1;
  }

  return 0;
}

function getTime(value: string) {
  return new Date(value).getTime();
}
