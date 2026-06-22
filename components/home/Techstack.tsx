const categories = [
  {
    label: "Frontend",
    skills: [
      { name: "React", level: "Expert", dash: "———" },
      { name: "Next.js", level: "Expert", dash: "———" },
      { name: "Tailwind CSS", level: "Advanced", dash: "——" },
      { name: "HTML / CSS", level: "Expert", dash: "———" },
    ],
  },

  {
    label: "Backend",
    skills: [
      { name: "Node.js", level: "Advanced", dash: "——" },
      { name: "Express.js", level: "Advanced", dash: "——" },
      { name: "REST APIs", level: "Advanced", dash: "——" },
      { name: "WebSocket / Socket.io", level: "Advanced", dash: "——" },
    ],
  },

  {
    label: "Languages",
    skills: [
      { name: "JavaScript", level: "Expert", dash: "———" },
      { name: "TypeScript", level: "Advanced", dash: "——" },
      { name: "SQL", level: "Advanced", dash: "——" },
    ],
  },

  {
    label: "Tools & DevOps",
    skills: [
      { name: "MongoDB / PostgreSQL", level: "Advanced", dash: "——" },
      { name: "Redis", level: "Intermediate", dash: "—" },
      { name: "Docker", level: "Intermediate", dash: "—" },
      { name: "Git / GitHub", level: "Advanced", dash: "——" },
    ],
  },
];


const allTags = [
  "#javascript", "#typescript", "#react", "#nextjs",
  "#nodejs", "#express", "#mongodb", "#postgresql",
  "#rest-api", "#sql", "#websocket", "#socketio",
  "#tailwind", "#html5", "#css3", "#git", "#github", 
  "#docker", "#redis", "#kafka", "#vercel",
  "#figma", "#mongoose", "#drizzle", "#jwt",
  "#zod", "#joi", "#prisma", 
];

const levelColor: Record<string, string> = {
  Expert:       "var(--accent)",
  Advanced:     "var(--ink-soft)",
  Intermediate: "var(--ink-muted)",
};

export default function TechStack() {
  return (
    <section id="stack" className="border-b border-[var(--line)]">

      {/* Header */}
      <div className="flex items-center gap-5 px-4 py-5 md:px-12 border-b border-[var(--line)]">
        <span className="text-[11px] tracking-[3px] shrink-0 text-[var(--ink-muted)]">
          01
        </span>

        <span className="text-[11px] text-[var(--ink-muted)]">—</span>

        <h2 className="text-[28px] md:text-[36px] tracking-[-1px]">
          Technology <em className="italic text-[var(--accent)]">Stack</em>
        </h2>

        <div className="hidden md:block flex-1 h-px ml-4 bg-[var(--line)]" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, ci) => (
          <div
            key={cat.label}
            className="px-6 py-8 md:px-10 md:py-10"
            style={{
              borderRight:
                ci < categories.length - 1
                  ? "1px solid var(--line)"
                  : "none",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {/* Category label */}
            <p className="text-[9px] tracking-[3px] uppercase mb-6 text-[var(--ink-muted)]">
              {cat.label}
            </p>

            {/* Skills */}
            <ul className="flex flex-col gap-4 font-extrabold font-mono cursor-auto">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3 group">

                  <span className="text-[14px] text-[var(--ink-muted)] hidden md:flex">
                    •
                  </span>

                  <span className="text-[14px] font-medium tracking-[-0.2px] transition-colors group-hover:text-[var(--accent)]">
                    {skill.name}
                  </span>

                  <span
                    className="text-[12px] tracking-[-2px] shrink-0 opacity-50"
                    style={{ color: levelColor[skill.level] }}
                  >
                    {skill.dash}
                  </span>

                  <span
                    className="text-[10px] uppercase tracking-[1px] shrink-0"
                    style={{ color: levelColor[skill.level] }}
                  >
                    {skill.level}
                  </span>

                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tags */}
      {/* <div className="px-4 py-8 md:px-12">
        <p className="text-[9px] tracking-[3px] uppercase mb-5 text-[var(--ink-muted)]">
          All Technologies
        </p>

        <div className="flex flex-wrap gap-2 font-mono font-extrabold">
          {allTags.map((tag) => (
            <span
              key={tag}
              className="border border-[var(--line)] text-[11px] px-3 py-1.5 text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--ink-soft)] transition cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div> */}

    </section>
  );
}