"use client";

import Link from "next/link";
import ChatAgent from "./ChatAgent/ChatAgent";
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

          <span className="absolute left-18 top-[-14px] sm:left-4 sm:top-[-11px]">
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

      {/* ── AI AGENT ── */}
      <div id="agent"
        className="w-[calc(100%+1rem)] sm:w-full"
        style={{ maxWidth: 1000 }}>
          <ChatAgent />
      </div>
    </div>
  );
}
