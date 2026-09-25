import Image from "next/image";
import MernStack from "./Mernstack";

export default function AboutSection() {
  return (
    <section id="about" className="border-b mt-8 border-[var(--line)]">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto pb-4 border-b border-[var(--line)]">
          
          {/* Sub-badge / Index */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[12px] font-mono tracking-[3px] text-[var(--ink-muted)]">
              03
            </span>
            <span className="text-[var(--ink-muted)] text-[12px]">—</span>
            <span className="text-[11px] font-mono uppercase tracking-[3px] text-[var(--ink-muted)]">
              About Me
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-[28px] sm:text-[28px] md:text-[38px] tracking-[-1.5px] leading-tight font-semibold text-[var(--ink)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Engineering Background & <em className="italic font-serif font-normal text-[var(--accent)]">Philosophy</em>
          </h2>

          {/* Centered Description */}
          <p className="text-[12px] md:text-[13px] text-[var(--ink-muted)] max-w-xl leading-relaxed font-normal">
            A look into my development methodology, core philosophy, technical evolution, and stack capabilities.
          </p>

        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-evenly md:gap-12 px-6 md:px-8 py-8">
        {/* Left Side */}
        <div className="max-w-xl">
          <blockquote
            className="mb-5 italic leading-[1.35] tracking-[-0.3px] text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(22px, 3.5vw, 36px)",
            }}
          >
            "I don't just write code —
            <br />
            I build <em className="text-[var(--accent)]">resilient platforms.</em>"
          </blockquote>

          <p className="mb-5 max-w-[500px] font-mono text-[13px] leading-[1.9] text-[var(--ink-soft)]">
            Full-stack software engineer based in India. Specializing in high-performance web applications, scalable backend architectures, and clean, maintainable codebases built to solve real-world engineering problems.
          </p>

          {/* MERN — origin story */}
          <div className="mt-5 border-t border-[var(--line)] pt-4">
            <p className="mb-2 text-[10px] tracking-[3px] uppercase text-[var(--ink-muted)]">
              Core Tech Stack & Ecosystem
            </p>
            <div className="w-full flex justify-center md:block">
              <MernStack />
            </div>
          </div>

          <div className="mt-8">
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