"use client";

import Link from "next/link";
import HeroPlayground from "./Heroplayground";

export default function HeroMiddle() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
      
      {/* LEFT */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16">
        {/* Ghost text */}
        <p className="pointer-events-none select-none mb-[-48px] leading-none text-[clamp(72px,13vw,160px)] tracking-[-4px] text-[var(--ink)] opacity-[0.04] font-[var(--font-display)]">
          DEV
        </p>

        {/* Headline */}
        <h1 className="relative z-10 mb-3 text-[clamp(38px,5.5vw,72px)] leading-[1.02] tracking-[-2px] text-[var(--ink)] font-[var(--font-serif)]">
          Building
          <br />
          <em className="italic text-[var(--accent)]">the web.</em>
        </h1>

        {/* Role */}
        <p className="mb-5 text-[11px] uppercase tracking-[3px] text-[var(--ink-muted)]">
          Full Stack Developer &nbsp;·&nbsp; India
        </p>

        {/* Description */}
        <p className="mb-10 max-w-[400px] text-[13px] leading-[1.85] text-[var(--ink-soft)] md:text-[14px]">
          I build fast, scalable web applications that solve real problems.
          Clean architecture, meaningful products, and code that lasts.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="#work"
            className="bg-[var(--ink)] text-[var(--bg)] no-underline px-8 py-3 text-[11px] uppercase tracking-[2px] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-white"
          >
            View Projects
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--line)] bg-transparent px-8 py-3 text-[11px] uppercase tracking-[2px] text-[var(--ink-muted)] no-underline transition-all duration-200 hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* RIGHT — Playground */}
      <div className="w-full md:flex-1 flex items-center justify-center px-6 md:px-0">
        <HeroPlayground />
      </div>

    </div>
  );
}