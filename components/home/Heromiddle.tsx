"use client";

import Link from "next/link";
import ChatAgent from "./ChatAgent/ChatAgent";
import { BsCloudDownload } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";

export default function HeroMiddle() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-32 pb-20 flex flex-col items-center">
      
      {/* ── TOP: MINTLIFY-INSPIRED HERO HEADER ── */}
      <div className="w-full flex flex-col items-center text-center space-y-6 max-w-3xl mb-16">
        
        {/* Release / Status Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--line)] bg-[var(--ink)]/[0.03] text-[12px] font-mono text-[var(--ink-soft)]">
          <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-semibold text-[10px]">
            v2.0
          </span>
          <span>Full Stack Developer & Ai Engineer</span>
          <span className="text-[var(--accent)]">→</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-[clamp(38px,6vw,72px)] leading-[1.05] tracking-tight font-bold text-[var(--ink)]">
          Engineering Intelligent <br />
          <span className="italic font-serif font-normal text-[var(--accent)]">
            AI Agents & Full Stack Systems.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[var(--ink-soft)] max-w-2xl font-normal">
          Building high-performance web platforms integrated with LLMs, 
          scalable cloud architectures, and production-ready AI workflows.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="#work"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--ink)] text-[var(--bg)] font-mono text-[11px] tracking-[1.5px] uppercase transition-all duration-200 hover:bg-[var(--accent)] hover:text-white shadow-sm active:scale-95"
          >
            <span>Explore Projects</span>
            <FaLaptopCode size={15} />
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className=" flex justify-center items-center gap-2 px-6 py-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-mono text-[11px] tracking-[1.5px] uppercase text-[var(--ink)] transition-all duration-200 hover:border-[var(--ink)] hover:bg-[var(--ink)]/5 active:scale-95"
          >
            <span>Download CV</span>
            <BsCloudDownload size={15} fontWeight={800}/>
          </a>
        </div>
      </div>

      {/* ── AI AGENT SHOWCASE ── */}
      {/* ── AI AGENT — paste inside your HeroSection JSX ── */}

      <div
        id="agent"
        className="relative w-full overflow-hidden mx-auto px-3 sm:px-0"
        style={{
          maxWidth: 1000,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "#0f1117",
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 0 60px rgba(29,155,240,0.06),
            0 32px 80px rgba(0,0,0,0.35)
          `,
        }}
      >
        {/* Subtle top glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl"
          style={{ background: "rgba(29,155,240,0.07)" }}
        />

        {/* ── Single unified header (replaces both old headers) ── */}
        <div
          className="relative flex items-center justify-between px-4 sm:px-5 h-11"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "#0d1015",
          }}
        >
          {/* Left — identity */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: "rgba(29,155,240,0.12)",
                border: "1px solid rgba(29,155,240,0.25)",
              }}
            >
              <FiCpu className="w-3 h-3" style={{ color: "#1d9bf0" }} />
            </div>
            <span className="text-[10px] font-semibold tracking-[2px] uppercase"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              AI Agent
            </span>
            <span className="hidden sm:block text-[9px] font-mono"
              style={{ color: "rgba(255,255,255,0.18)" }}>
              · intekhab.dev
            </span>
          </div>

          {/* Right — live status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping"
                style={{ background: "orange", opacity: 0.45 }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "orange" }} />
            </span>
            <span className="text-[9px] uppercase tracking-wider hidden sm:block"
              style={{ color: "orange", opacity: 0.7 }}>
              Ready
            </span>
          </div>
        </div>

        {/* ── ChatAgent (handles its own scroll + input) ── */}
        <ChatAgent />

      </div>
    </div>
  );
}
