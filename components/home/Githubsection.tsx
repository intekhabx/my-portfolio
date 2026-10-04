import SectionHeader from "./Sectionheader";
import type { IconType } from "react-icons";
import { FaCodeCommit, FaCalendarCheck, FaGithub } from "react-icons/fa6";

/* ── Config ───────────────────────────────────────────────────── */
const USERNAME = "intekhabx";
const PROFILE_URL = `https://github.com/${USERNAME}`;

/* ── Types ────────────────────────────────────────────────────── */
type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Repo = { language: string | null; fork: boolean };
type Achievement = { name: string; src: string; count: number; href: string };

/* Used when the live profile can't be read (same badges as the GitHub profile). */
const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Pull Shark",
    src: "https://github.githubassets.com/assets/pull-shark-bronze-a37accb528d1.png",
    count: 2,
    href: `${PROFILE_URL}?achievement=pull-shark&tab=achievements`,
  },
  {
    name: "Quickdraw",
    src: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png",
    count: 1,
    href: `${PROFILE_URL}?achievement=quickdraw&tab=achievements`,
  },
  {
    name: "YOLO",
    src: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
    count: 1,
    href: `${PROFILE_URL}?achievement=yolo&tab=achievements`,
  },
];

/* ── Data fetching (runs on the server, cached) ──────────────── */
const ghHeaders: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

async function getJson<T>(url: string, headers?: HeadersInit): Promise<T> {
  const res = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json() as Promise<T>;
}

/* GitHub has no API for profile achievements, so read them from the
   public profile page and fall back to the list above if that fails. */
async function getAchievements(): Promise<Achievement[]> {
  try {
    const res = await fetch(PROFILE_URL, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(String(res.status));
    const html = await res.text();

    const found = new Map<string, Achievement>();
    for (const m of html.matchAll(/<img[^>]*alt="Achievement: ([^"]+)"[^>]*>/g)) {
      const tag = m[0];
      const name = m[1];
      const src = tag.match(/src="([^"]+)"/)?.[1];
      if (!src || found.has(name)) continue;

      const after = html.slice(m.index! + tag.length, m.index! + tag.length + 300);
      const count = Number(after.match(/>\s*x(\d+)\s*</)?.[1] ?? 1);
      const slug = name.toLowerCase().replace(/\s+/g, "-");

      found.set(name, {
        name,
        src: src.replace(/&amp;/g, "&"),
        count,
        href: `${PROFILE_URL}?achievement=${slug}&tab=achievements`,
      });
    }
    return found.size ? [...found.values()] : FALLBACK_ACHIEVEMENTS;
  } catch {
    return FALLBACK_ACHIEVEMENTS;
  }
}

/* ── Helpers ──────────────────────────────────────────────────── */
function toWeeks(days: Day[]): (Day | null)[][] {
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  const firstDow = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstDow; i++) week.push(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

const monthName = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });

/* One label per month, placed on the week that contains the 1st. */
function monthLabels(weeks: (Day | null)[][]): string[] {
  const names = weeks.map((w) => {
    const d = w.find((x) => x && new Date(`${x.date}T00:00:00Z`).getUTCDate() === 1);
    return d ? monthName(d.date) : "";
  });
  const first = weeks[0]?.find(Boolean);
  if (first && !names[0] && !names[1] && !names[2]) names[0] = monthName(first.date);
  return names.map((n, i) => (i > weeks.length - 3 ? "" : n));
}

const fmt = (n: number) => n.toLocaleString("en-US");

/*
  ALWAYS-DARK BOX (used only for the heatmap and the languages box)
  The `dark` class re-applies the portfolio's own dark-theme tokens
  (--bg-soft #1a1a1a, --ink #f0e8d8, --line ...) to this subtree, so the box
  uses exactly the same dark colors as dark mode, even while the page is in
  light mode. Everything inside just uses the normal var(--...) tokens.
*/
const DARK_BOX =
  "dark border border-[var(--line)] bg-[var(--bg-soft)] text-[var(--ink)]";

/* Contribution graph: green, like GitHub */
const LEVEL_BG = [
  "bg-[var(--line)]",
  "bg-emerald-500/30",
  "bg-emerald-500/55",
  "bg-emerald-500/80",
  "bg-emerald-400",
] as const;

const LANG_BG = [
  "bg-[var(--accent)]",
  "bg-[var(--accent)]/75",
  "bg-[var(--accent)]/50",
  "bg-[var(--accent)]/30",
  "bg-[var(--ink-muted)]/60",
] as const;

/* ── Small pieces ─────────────────────────────────────────────── */
function Stat({
  label,
  value,
  unit,
  Icon,
}: {
  label: string;
  value: string;
  unit?: string;
  Icon: IconType;
}) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--ink-muted)]">
          {label}
        </span>
        <Icon aria-hidden size={14} className="text-emerald-500" />
      </div>
      <p className="flex items-baseline gap-1.5">
        <span
          className="text-[34px] font-semibold leading-none tracking-tight text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[12px] text-[var(--ink-muted)]">{unit}</span>
        )}
      </p>
    </div>
  );
}

function Label({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <p
        className={`shrink-0 text-[10px] uppercase tracking-[3px] ${
          dark ? "text-[var(--ink-soft)]" : "text-[var(--ink-muted)]"
        }`}
      >
        {children}
      </p>
      <span className="h-px w-full bg-[var(--line)]" />
    </div>
  );
}

/* Fills the width of its box, so it never needs a scrollbar. */
function Heatmap({ weeks }: { weeks: (Day | null)[][] }) {
  const cols = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };
  const labels = monthLabels(weeks);

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-2 grid gap-[3px]" style={cols}>
        {labels.map((l, i) => (
          <span key={i} className="relative h-3">
            <span className="absolute left-0 whitespace-nowrap font-mono text-[10px] text-[var(--ink-soft)]">
              {l}
            </span>
          </span>
        ))}
      </div>

      <div
        className="grid grid-flow-col gap-[3px]"
        style={{ ...cols, gridTemplateRows: "repeat(7, auto)" }}
      >
        {weeks.flatMap((w, wi) =>
          w.map((d, di) =>
            d ? (
              <span
                key={`${wi}-${di}`}
                title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                className={`aspect-square w-full rounded-[3px] ${LEVEL_BG[d.level]}`}
              />
            ) : (
              <span key={`${wi}-${di}`} className="aspect-square w-full" />
            )
          )
        )}
      </div>
    </div>
  );
}

/* ── Component ────────────────────────────────────────────────── */
export default async function GithubSection() {
  const [contribRes, reposRes, achRes] = await Promise.allSettled([
    getJson<{ contributions: Day[] }>(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
    ),
    getJson<Repo[]>(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      ghHeaders
    ),
    getAchievements(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const days =
    contribRes.status === "fulfilled" && contribRes.value.contributions?.length
      ? contribRes.value.contributions
          .filter((d) => d.date <= today)
          .sort((a, b) => a.date.localeCompare(b.date))
      : null;

  const total = days ? days.reduce((sum, d) => sum + d.count, 0) : 0;
  const activeDays = days ? days.filter((d) => d.count > 0).length : 0;
  const weeks = days ? toWeeks(days) : [];

  const repos = reposRes.status === "fulfilled" ? reposRes.value : [];
  const achievements =
    achRes.status === "fulfilled" ? achRes.value : FALLBACK_ACHIEVEMENTS;

  // Languages by number of repositories
  const langCount = new Map<string, number>();
  repos
    .filter((r) => !r.fork && r.language)
    .forEach((r) =>
      langCount.set(r.language!, (langCount.get(r.language!) ?? 0) + 1)
    );
  const langTotal = [...langCount.values()].reduce((a, b) => a + b, 0);
  const languages = [...langCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, n]) => ({ name, pct: Math.round((n / langTotal) * 100) }));

  return (
    <section id="github" className="mt-8">
      <SectionHeader
        slNo="05"
        slText="GitHub"
        leftMainTitle="Commits &"
        rightMainTitle="Consistency"
        desc="Live activity from my GitHub: daily contributions, achievements and the languages I build with."
      />

      <div className="mx-auto max-w-7xl space-y-4 px-6 py-6 md:px-12">
        {/* ── Row 1: 2 stat boxes beside the streak heatmap (equal height) ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          {days && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-rows-2">
              <Stat label="Contributions" value={fmt(total)} unit="past year" Icon={FaCodeCommit} />
              <Stat label="Active days" value={fmt(activeDays)} unit="of 365" Icon={FaCalendarCheck} />
            </div>
          )}

          {days ? (
            <div className={`flex min-w-0 flex-col justify-between gap-5 rounded-2xl p-5 ${DARK_BOX}`}>
              {/* Phones show the last 6 months so the squares stay readable without scrolling */}
              <div className="sm:hidden">
                <Heatmap weeks={weeks.slice(-26)} />
              </div>
              <div className="hidden sm:block">
                <Heatmap weeks={weeks} />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 font-mono text-[10px] text-[var(--ink-soft)]">
                <span>
                  <span className="sm:hidden">Past 6 months</span>
                  <span className="hidden sm:inline">Past 12 months</span>
                </span>
                <div className="flex items-center gap-1.5">
                  Less
                  {LEVEL_BG.map((c) => (
                    <span key={c} className={`h-[11px] w-[11px] rounded-[3px] ${c}`} />
                  ))}
                  More
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-8 text-center lg:col-span-2">
              <p className="text-[13px] text-[var(--ink-soft)]">
                Live contribution data is unavailable right now.
              </p>
            </div>
          )}
        </div>

        {/* ── Row 2: languages + achievements ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {languages.length > 0 && (
            <div className={`rounded-2xl p-6 ${DARK_BOX}`}>
              <Label dark>Top Languages</Label>
              <div className="mb-5 flex h-2 w-full overflow-hidden rounded-full bg-[var(--line)]">
                {languages.map((l, i) => (
                  <span key={l.name} style={{ width: `${l.pct}%` }} className={LANG_BG[i]} />
                ))}
              </div>
              <ul className="space-y-2.5 font-mono text-[12px]">
                {languages.map((l, i) => (
                  <li key={l.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--ink-soft)]">
                      <span className={`h-2 w-2 rounded-full ${LANG_BG[i]}`} />
                      {l.name}
                    </span>
                    <span className="text-[var(--ink-soft)]">{l.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-6">
              <Label>Achievements</Label>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {achievements.map((a) => (
                  <li key={a.name}>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={a.name}
                      className="group relative flex h-full flex-col items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-5 text-center transition-colors duration-300 hover:border-[var(--accent)]/40"
                    >
                      {a.count > 1 && (
                        <span className="absolute right-2 top-2 rounded-full bg-[var(--accent)]/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)]">
                          x{a.count}
                        </span>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.src}
                        alt={`Achievement: ${a.name}`}
                        width={64}
                        height={64}
                        loading="lazy"
                        className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <span
                        className="text-[13px] font-semibold leading-tight text-[var(--ink)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {a.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center pt-4">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-6 py-3 text-[13px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
          >
            <FaGithub aria-hidden size={15} />
            View full profile @{USERNAME}
          </a>
        </div>
      </div>
    </section>
  );
}