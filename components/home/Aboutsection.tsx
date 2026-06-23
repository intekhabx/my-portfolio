import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="border-b border-[var(--line)]">
      {/* Header */}
      <div className="flex items-center gap-5 px-4 py-5 md:px-12 border-b border-[var(--line)]">
        <span
          className="shrink-0 text-[11px] tracking-[3px]"
          style={{
            color: "var(--ink-muted)",
            fontFamily: "var(--font-display)",
          }}
        >
          03
        </span>

        <span className="text-[11px] text-[var(--ink-muted)]">—</span>

        <h2
          className="text-[28px] md:text-[36px] tracking-[-1px] text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About <span className="italic text-[var(--accent)]">Me</span>
        </h2>

        <div className="hidden md:block flex-1 h-px ml-4 bg-[var(--line)]" />
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-evenly md:gap-12 px-6 md:px-8 py-8">
        {/* Left Side */}
        <div className="max-w-xl">
          <blockquote
            className="mb-8 italic leading-[1.35] tracking-[-0.3px] text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(22px, 3.5vw, 36px)",
            }}
          >
            "I don't just write code —
            <br />
            I craft{" "}
            <em className="text-[var(--accent)]">experiences.</em>"
          </blockquote>

          <p className="mb-10 max-w-[500px] font-mono text-[13px] leading-[1.9] text-[var(--ink-soft)]">
            Passionate full stack developer from India. I love building
            products that are fast, scalable, and solve real problems.
            Always learning, always shipping clean code.
          </p>

          <div className="flex flex-wrap gap-5">
            {[
              {
                label: "GitHub ↗",
                href: "https://github.com/intekhabx",
              },
              {
                label: "LinkedIn ↗",
                href: "https://www.linkedin.com/in/intekhabx/",
              },
              {
                label: "Twitter (X) ↗",
                href: "https://x.com/intekhab_x",
              },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[var(--line)] pb-[2px] text-[11px] tracking-[1px] text-[var(--ink-soft)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="mt-12">
            <p
              className="text-xl italic text-[var(--accent)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              — Intekhab
            </p>
          </div>
        </div>

        {/* Right Side - Only Image */}
        <div className="relative h-[300px] md:h-[480px] w-[550px]">
          <Image
            src="/programmer.png"
            alt="Intekhab"
            fill
            priority
            className="object-contain md:object-cover"
          />
        </div>
      </div>
    </section>
  );
}