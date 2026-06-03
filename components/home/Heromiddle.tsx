"use client";
// components/HeroMiddle.tsx
// CLIENT COMPONENT — buttons have hover + photo

import Link from "next/link";
import Image from "next/image";

export default function HeroMiddle() {
  return (
    <div className="flex flex-1">

      {/* LEFT — text */}
      <div
        className="flex flex-col justify-center px-12 py-16"
        style={{ flex: 1, borderRight: "1px solid var(--line)" }}
      >
        {/* Ghost text */}
        <p
          className="select-none pointer-events-none leading-none mb-[-48px]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px,13vw,160px)",
            color: "var(--ink)",
            opacity: 0.04,
            letterSpacing: "-4px",
          }}
        >
          DEV
        </p>

        {/* Headline */}
        <h1
          className="relative z-10 mb-3"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(42px,5.5vw,72px)",
            lineHeight: 1.02,
            letterSpacing: "-2px",
            color: "var(--ink)",
          }}
        >
          Building
          <br />
          <em className="not-italic" style={{ color: "var(--accent)", fontStyle: "italic" }}>
            the web.
          </em>
        </h1>

        {/* Role */}
        <p
          className="text-[11px] tracking-[3px] uppercase mb-5"
          style={{ color: "var(--ink-muted)" }}
        >
          Full Stack Developer &nbsp;·&nbsp; India
        </p>

        {/* Description */}
        <p
          className="text-[14px] leading-[1.85] mb-10 max-w-[400px]"
          style={{ color: "var(--ink-soft)" }}
        >
          I build fast, scalable web applications that solve real problems.
          Clean architecture, meaningful products, and code that lasts.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href="#work"
            className="no-underline bg-[var(--ink)] text-[var(--bg)] text-[11px] tracking-[2px] uppercase px-8 py-3 transition-colors duration-200 hover:bg-[var(--accent)]"
          >
            View Projects
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[var(--ink-muted)] border-[var(--line)] no-underline text-[11px] tracking-[2px] uppercase px-8 py-3 border transition-all duration-200 hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* RIGHT — profile photo */}
      {/* <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: "380px", background: "var(--bg-soft)" }}
      >

        <span className="absolute top-6 left-6 w-8 h-8 border-t border-l opacity-40" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute bottom-6 right-6 w-8 h-8 border-b border-r opacity-40" style={{ borderColor: "var(--accent)" }} />

        <div
          className="relative overflow-hidden"
          style={{
            width: "240px",
            height: "300px",
            border: "1px solid var(--line)",
          }}
        >

          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "var(--bg-dark)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "52px",
                color: "var(--accent)",
                opacity: 0.25,
                letterSpacing: "-2px",
              }}
            >
              YN
            </span>
            <span
              className="text-[9px] tracking-[3px] uppercase"
              style={{ color: "var(--on-dark-muted)" }}
            >
              Add photo
            </span>
          </div>

          <Image src="/profile.jpg" alt="Profile" fill className="object-cover object-top" priority />
        </div>
      </div> */}

    </div>
  );
}