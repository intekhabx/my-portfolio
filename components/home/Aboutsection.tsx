import Image from "next/image";
import SectionHeader from "./Sectionheader";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaCode, FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiCoffee, FiFlag } from "react-icons/fi";

/* ── Editable content ─────────────────────────────────────────── */
const TIMELINE = [
  {
    period: "2022 — 2026",
    title: "B.Tech in Computer Science",
    place: "Seacom Engineering College",
    note: "Graduated. Four years of systems, algorithms and building real projects.",
    current: false,
  },
  {
    period: "Now",
    title: "Full-Stack Developer & AI Engineer",
    place: "Open to opportunities",
    // note: "Looking for a team where I can own features from design to deployment.",
    current: true,
  },
];

const CONSTANTS = [
  { label: "Chai", Icon: FiCoffee },
  { label: "Code", Icon: FaCode },
  { label: "Conquer", Icon: FiFlag },
] as const;

/* ── Component ────────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section id="about" className="mt-8">
      {/* ── Section Header  */}
      <SectionHeader slNo="04" slText="About Me" leftMainTitle="The engineer behind the" rightMainTitle="work" desc="Who I am, how I build, and what I bring to a team." />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-stretch">
          {/* ── LEFT: portrait, same height as the right content on desktop ── */}
          <aside className="lg:col-span-5">
            <div className="relative h-full">
              {/* offset frame behind the portrait */}
              <div
                aria-hidden
                className="hidden sm:block absolute -bottom-3 -right-3 h-full w-full rounded-[28px] border border-[var(--accent)]/40"
              />

              <figure className="relative flex h-full flex-col rounded-[28px] border border-[var(--line)] bg-[var(--bg-soft)] p-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[var(--bg-dark)] lg:aspect-auto lg:min-h-[420px] lg:flex-1">
                  <Image
                    src="/intekhab.jpg"
                    alt="Md Intekhab Alam"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                    <p
                      className="text:lg sm:text-xl font-semibold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Md Intekhab Alam
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-white/70 mt-0.5">
                      Full-Stack Developer &amp; AI Engineer
                    </p>
                  </div>
                </div>

                <figcaption className="mt-3 flex items-center justify-between gap-4 px-2">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[12px] text-[var(--ink-soft)]">
                      Open to work · <span className="hidden sm:inline-flex">Let&apos;s build together</span>
                    </span>
                  </span>

                  <span className="flex items-center gap-3 text-[var(--ink-soft)]">
                    <a
                      href="https://www.linkedin.com/in/intekhabx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="hover:text-[var(--accent)] focus-visible:text-[var(--accent)] outline-none transition-colors"
                    >
                      <FaLinkedinIn className="h-3 w-3 sm:h-auto sm:w-auto" />
                    </a>
                    <a
                      href="https://www.linkedin.intekhabx/in/intekhabx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X profile"
                      className="hover:text-[var(--accent)] focus-visible:text-[var(--accent)] outline-none transition-colors"
                    >
                      <FaXTwitter className="h-3 w-3 sm:h-auto sm:w-auto" />
                    </a>
                    <a
                      href="https://www.instagram.com/_intekhab.x/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram profile"
                      className="hover:text-[var(--accent)] focus-visible:text-[var(--accent)] outline-none transition-colors"
                    >
                      <FaInstagram className="h-3 w-3 sm:h-auto sm:w-auto" />
                    </a>
                    <a
                      href="https://github.com/intekhabx"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                      className="hover:text-[var(--accent)] focus-visible:text-[var(--accent)] outline-none transition-colors"
                    >
                      <FiGithub className="h-3 w-3 sm:h-auto sm:w-auto" />
                    </a>
                  </span>
                </figcaption>
              </figure>
            </div>
          </aside>

          {/* ── RIGHT: story, journey, principles, stack ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Intro */}
            <div className="space-y-4 sm:space-y-6">
              <div
                className="text-[20px] sm:text-[32px] leading-[1.2] italic tracking-tight text-[var(--ink)] space-y-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <p>"I don&apos;t just write code.</p>
                <p>
                  <em className="italic text-[var(--accent)]">
                    I engineer intelligent systems."
                  </em>
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-[12px] sm:text-[14px] leading-[1.75] text-[var(--ink-soft)] max-w-[62ch]">
                <p>
                  I&apos;m a Computer Science Engineering graduate from Seacom Engineering College, 
                  focused on building full-stack applications and AI-powered systems with
                  clean architecture, reliable backends, and thoughtful user experiences.
                </p>

                <p>
                  I work across the stack from designing APIs, authentication, databases,
                  and real-time systems to building modern interfaces and deploying
                  production-ready applications. I enjoy turning complex ideas into
                  practical software that is scalable, maintainable, and built to be used.
                </p>
              </div>
            </div>

            {/* Journey (a real sequence, so a timeline fits) */}
            <div>
              {/* <h3
                className="text-[13px] font-semibold text-[var(--ink)] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Journey
              </h3> */}

              <ol className="relative border-l border-[var(--line)] ml-1.5 space-y-6">
                {TIMELINE.map((t) => (
                  <li key={t.title} className="relative pl-8">
                    <span
                      aria-hidden
                      className={`absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] ${t.current ? "bg-[var(--accent)]" : "bg-[var(--ink-muted)]"
                        }`}
                    />
                    <p className="text-[10px] sm:text-[12px] font-mono text-[var(--ink-muted)] mb-1">
                      {t.period}
                    </p>
                    <p
                      className="text-[13.5px] sm:text-[17px] font-semibold text-[var(--ink)] leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t.title}
                    </p>
                    <p className="text-[11px] sm:text-[13px] text-[var(--ink-soft)] mt-0.5">
                      {t.place}
                    </p>
                    <p className="text-[11px] sm:text-[13px] text-[var(--ink-muted)] mt-2 max-w-[56ch] leading-relaxed">
                      {t.note}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Constants */}
            <div className="border-t border-[var(--line)] pt-4">
              <p className="mb-3 text-[10px] font-mono tracking-[1.5px] sm:tracking-[3px] uppercase text-[var(--ink-muted)]">
                Only constants in my life
              </p>
              <ul className="flex flex-wrap items-center gap-2">
                {CONSTANTS.map(({ label, Icon }, i) => (
                  <li key={label} className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-2.5 sm:px-3.5 py-1.5 font-mono text-[12px] text-[var(--ink-soft)]">
                      <Icon className="text-[var(--accent)]" size={13} />
                      {label}
                    </span>
                    {i < CONSTANTS.length - 1 && (
                      <span aria-hidden className="font-mono text-[var(--ink-muted)]">
                        +
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}