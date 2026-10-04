"use client";

import Link from "next/link";
import ChatAgent from "./ChatAgent/ChatAgent";
import { FiCpu } from "react-icons/fi";
import { FaArrowRightLong, FaCode } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import TypedGreeting from "./Typedgreeting";


export default function HeroMiddle() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-32 pb-20 flex flex-col items-center">
      
      {/* ── TOP: HERO HEADER ── */}
      <div className="w-full flex flex-col items-center text-center space-y-6 max-w-3xl mb-16">
        
        {/* Release / Status Tag Badge */}
        <div className="inline-flex items-center gap-2 px-2 md:pr-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--ink)]/[0.03] text-[10px] md:text-[12px] font-mono text-[var(--ink-soft)] cursor-default">
          <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-semibold text-[10px]">
            v2.0
          </span>
          <span>Full-Stack Developer & Ai Engineer</span>
          <span className="text-[var(--accent)] mr-1">
            <Link href="/admin/dashboard">
              <FaArrowRightLong size={7} />
            </Link>
          </span>
        </div>

        {/* Hero Title */}
        <div className="relative mt-1">
          <h1 className="text-[clamp(38px,6vw,72px)] leading-[1.05] tracking-tight font-bold text-[var(--ink)]">
            Engineering Intelligent <br />
            <span className="italic font-serif font-normal text-[var(--accent)]">
              AI Agents & Full Stack Systems.
            </span>
          </h1>

          <span className="absolute left-14 top-[-14px] sm:left-4 sm:top-[-11px]">
            <TypedGreeting />
          </span>
        </div>

        {/* Subtext */}
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[var(--ink-soft)] max-w-2xl font-normal">
          {/* Building high-performance web platforms integrated with LLMs, 
          scalable cloud architectures, and production-ready AI workflows. */}
          Architecting production-grade AI workflows, robust backend architectures, 
          and high-performance products powered by LLMs.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="#work"
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl bg-[var(--ink)] text-[var(--bg)] text-[12px] sm:text-[14px] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white shadow-sm active:scale-95"
          >
            <FaCode size={18} />
            <span>Explore My Works</span>
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className=" flex justify-center items-center gap-2 px-6 py-3 font-bold rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[12px] sm:text-[14px] text-[var(--ink)] transition-all duration-200 hover:border-[var(--ink)] hover:bg-[var(--ink)]/5 active:scale-95"
          >
            <MdOutlineFileDownload size={18} />
            <span>CV</span>
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
