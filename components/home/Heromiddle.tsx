"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChatAgent from "./ChatAgent/ChatAgent";
import { FiCpu, FiX } from "react-icons/fi";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { FaArrowRightLong, FaCode } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import TypedGreeting from "./Typedgreeting";

// Phone par AI button bottom navbar ke UPAR rahe, uske neeche na chhupe.
const FAB_BOTTOM = "calc(5.5rem + env(safe-area-inset-bottom, 0px))";

/* Border par ghoomti accent line — Framer Motion se (koi <style> tag nahi).
   Parent ka `relative` + `rounded-full` hona zaroori hai. */
function OrbitBorder({ duration = 3.6 }: { duration?: number }) {
  const angle = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const controls = animate(angle, 360, { duration, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [angle, duration, reduce]);

  // 300deg ko chhota karo => line lambi, bada karo => line chhoti
  const background = useMotionTemplate`conic-gradient(from ${angle}deg, transparent 0deg 300deg, var(--accent, #1d9bf0) 352deg, transparent 360deg)`;

  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute -inset-px rounded-full p-px"
      style={{
        background,
        opacity: reduce ? 0.5 : 1,
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        maskComposite: "exclude",
      }}
    />
  );
}

/* Page light hai ya dark: --bg ka asli rang padh kar nikalta hai,
   isliye class / data-theme / system theme kisi se bhi toggle ho, kaam karega. */
function useIsLightPage() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
      const probe = document.createElement("div");
      probe.style.color = bg || "#000";
      probe.style.display = "none";
      document.body.appendChild(probe);
      const m = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
      document.body.removeChild(probe);
      if (!m) return;
      const [r, g, b] = m.map(Number);
      setIsLight((0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55);
    };

    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true });
    obs.observe(document.body, { attributes: true });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", check);
    return () => { obs.disconnect(); mq.removeEventListener("change", check); };
  }, []);

  return isLight;
}

export default function HeroMiddle() {
  const [agentOpen, setAgentOpen] = useState(false);   // sirf phone par kaam karta hai
  const isLight = useIsLightPage();

  /* Phone par agent khulne par page scroll lock */
  useEffect(() => {
    if (!agentOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [agentOpen]);

  /* Escape se band + screen bada ho jaye (>= sm) to overlay state reset */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setAgentOpen(false); };
    const mq = window.matchMedia("(min-width: 640px)");
    const onMq = () => { if (mq.matches) setAgentOpen(false); };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => { window.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, []);

  /* Navbar ka "AI Agent" (#agent) link phone par agent open kare */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href="#agent"]');
      if (a && window.innerWidth < 640) {
        e.preventDefault();
        setAgentOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-32 sm:pb-20 flex flex-col items-center">
      
      {/* ── TOP: HERO HEADER ── */}
      <div className="w-full flex flex-col items-center text-center space-y-6 max-w-3xl mb-16">
        
        {/* Release / Status Tag Badge */}
        <div className="relative inline-flex items-center gap-2 px-2 md:pr-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--ink)]/[0.03] text-[10px] md:text-[12px] font-mono text-[var(--ink-soft)] cursor-default">
          {/* accent line jo border par ghoomti hai */}
          <OrbitBorder />
          <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-semibold text-[10px]">
            v2.0
          </span>
          <span>Full-Stack Developer & AI Engineer</span>
          <span className="text-[var(--accent)] mr-1">
            <Link href="/admin/dashboard">
              <FaArrowRightLong size={7} />
            </Link>
          </span>
        </div>

        {/* Name */}
        <div className="-mt-3">
          <TypedGreeting className="text-[18px] sm:text-[22px] md:text-[26px] leading-none" />
        </div>

        {/* Hero Title */}
        {/* <div className="relative !mt-2"> */}

        {/* Hero Title */}
        <h1 className="text-[clamp(38px,6vw,72px)] leading-[1.05] tracking-tight font-bold text-[var(--ink)]">
          Engineering Intelligent <br />
          <span className="italic font-serif font-normal text-[var(--accent)]">
            AI Agents & Full Stack Systems.
          </span>
        </h1>

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

          {/* Ai button that show only in small screen */}
          <button
            type="button"
            onClick={() => setAgentOpen(true)}
            className={`sm:hidden flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl text-[12px] transition-all duration-200 active:scale-95 cursor-pointer ${
              isLight
                ? "border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                : "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/25"
            }`}
          >
            <FiCpu size={16} />
            <span>Talk to AI</span>
          </button>
        </div>
      </div>

      {/* ── AI AGENT ── */}
      <div
        id="agent"
        onClick={e => { if (e.target === e.currentTarget) setAgentOpen(false); }}
        className={`${
          agentOpen
            ? "fixed inset-0 z-[100] flex flex-col items-center justify-end px-2 pt-8 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-black/70 backdrop-blur-sm"
            : "hidden"
        } sm:block sm:static sm:z-auto sm:p-0 sm:bg-transparent sm:backdrop-blur-none sm:w-full`}
        style={{ maxWidth: 1000 }}
      >
        <div className="w-full max-w-[1000px] max-h-full overflow-y-auto sm:overflow-visible sm:max-h-none [&::-webkit-scrollbar]:hidden">
          {/* Close button — sirf phone */}
          <div className="flex justify-end pb-2 sm:hidden">
            <button
              type="button"
              onClick={() => setAgentOpen(false)}
              aria-label="Close AI agent"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[1.5px] font-medium cursor-pointer active:scale-95 transition-transform"
              style={{
                color: "rgba(255,255,255,0.85)",
                background: "rgba(15,19,27,0.9)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 999,
              }}
            >
              <FiX className="w-3.5 h-3.5" />
              Close
            </button>
          </div>

          <ChatAgent />
        </div>
      </div>

      {/* ── Floating AI button — sirf phone, bottom-right ── */}
      {!agentOpen && (
        <button
          type="button"
          onClick={() => setAgentOpen(true)}
          aria-label="Open AI agent"
          className="sm:hidden fixed right-4 z-40 flex items-center gap-2 h-11 pl-3.5 pr-4 rounded-full cursor-pointer active:scale-95 transition-transform"
          style={{
            bottom: FAB_BOTTOM,
            background: "linear-gradient(145deg, #121826, #0b0e14)",
            border: "1px solid rgba(29,155,240,0.45)",
            boxShadow:
              "0 10px 30px -8px rgba(0,0,0,0.6), 0 0 26px -4px rgba(29,155,240,0.4)",
          }}
        >
          <FiCpu className="w-[22px] h-[22px]" style={{ color: "#1d9bf0" }} />
          <span className="text-[13px] font-semibold tracking-[1.5px] text-white/90">AI</span>
        </button>
      )}
    </div>
  );
}
