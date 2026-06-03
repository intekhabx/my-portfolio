// components/AboutSection.tsx

const skills = [
  "HTML5",
  "CSS",
  "JavaScript",
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "....."
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-b border-[var(--line)] px-4 py-10 md:px-12 md:py-14"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">

        {/* LEFT — BIO */}
        <div>
          <p className="mb-4 text-[9px] uppercase tracking-[3px] text-[var(--ink-muted)]">
            About Me
          </p>

          <h2 className="mb-5 text-[22px] leading-[1.4] tracking-[-0.5px] md:text-[28px] font-[var(--font-serif)] text-[var(--ink)]">
            "I don't just write code —<br />
            I craft{" "}
            <em className="italic text-[var(--accent)]">experiences.</em>"
          </h2>

          <p className="mb-7 text-[13px] leading-[1.8] md:text-[14px] text-[var(--ink-soft)]">
            Passionate full stack developer from India. I love building products
            that are fast, scalable, and solve real problems. Always learning,
            always shipping.
          </p>

          {/* INFO GRID */}
          <div className="mb-7 grid grid-cols-1 gap-y-4 text-[12px] sm:grid-cols-2 sm:gap-x-8">
            {[
              { label: "Based in", value: "Kolkata, India" },
              { label: "Status", value: "Open to Work", accent: true },
              { label: "Focus", value: "Full Stack · MERN" },
              { label: "Beyond code", value: "OSS · Chess · Coffee" },
            ].map(({ label, value, accent }) => (
              <div key={label}>
                <p className="mb-1 text-[9px] uppercase tracking-[2px] text-[var(--ink-muted)]">
                  {label}
                </p>

                <p
                  className={`font-medium ${
                    accent ? "text-[var(--accent)]" : "text-[var(--ink)]"
                  }`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap gap-4 md:gap-5">
            {[
              { label: "GitHub ↗", href: "https://github.com/intekhabx.com" },
              { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/intekhabx/" },
              { label: "Twitter (X) ↗", href: "https://x.com/intekhab_x" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[var(--line)] pb-[2px] text-[11px] tracking-[1px] text-[var(--ink-soft)] no-underline transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — SKILLS */}
        <div>
          <p className="mb-5 text-[9px] uppercase tracking-[3px] text-[var(--ink-muted)]">
            Skills & Tools
          </p>

          <div className="grid grid-cols-2">
            {skills.map((skill, i) => (
              <div
                key={skill}
                className="flex items-center gap-3 border-b border-[var(--line)] py-3 text-[13px] text-[var(--ink-soft)] transition-colors duration-150 hover:bg-white/40 sm:odd:border-r sm:pl-0 sm:even:pl-4"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink-muted)]" />
                {skill}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}