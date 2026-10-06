import Image from "next/image";
import MernStack from "./Mernstack";
import SectionHeader from "./Sectionheader";
import { FaLightbulb, FaCode, FaDatabase, FaRocket } from "react-icons/fa6";

const FLOW = [
  { label: "Plan", Icon: FaLightbulb, color: "#38BDF8" },
  { label: "Build", Icon: FaCode, color: "#3b82f6"},
  { label: "Integrate", Icon: FaDatabase, color: "#22c55e" },
  { label: "Deploy", Icon: FaRocket, color: "#ec4899"},
] as const;

const PRINCIPLES = [
  {
    no: "01",
    tag: "Define",
    title: "Planning & Strategy",
    text: "I start with requirements, user flows and data models, then pick an architecture that fits the problem before any code is written.",
  },
  {
    no: "02",
    tag: "Build",
    title: "Development & Iteration",
    text: "I build frontend and backend in small working increments, reviewing and refining each one as the product takes shape.",
  },
  {
    no: "03",
    tag: "Ship",
    title: "Optimization & Deploy",
    text: "I tune performance and harden the app, then ship through CI/CD and containers so every release is repeatable.",
  },
] as const;

export default function MyWorkApproach() {
  return (
    <section id="how-i-work" className="mt-8">
      {/* ── Section Header ── */}
      <SectionHeader
        slNo="03"
        slText="How I Work"
        leftMainTitle="Process &"
        rightMainTitle="Architecture"
        desc="How I plan, build and ship a feature, from the first schema to production."
      />

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-evenly md:gap-12 px-6 md:px-8 py-4">
        {/* Left Side */}
        <div className="flex w-full max-w-xl flex-col gap-3 md:h-[480px]">
          <blockquote
            className="italic leading-[1.35] tracking-[-0.3px] text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(22px, 3.5vw, 36px)",
            }}
          >
            "Clear architecture first.
            <br />
            <em className="text-[var(--accent)]">Clean code</em> follows."
          </blockquote>

          {/* Section definition */}
          <div className="max-w-[500px]">
            <p className="mb-4 font-mono text-[13px] leading-[1.9] text-[var(--ink-soft)]">
              This is how an idea becomes production software. I understand the
              problem, plan the architecture, build in small iterations, connect
              the APIs and data, then optimize and deploy. Every project follows
              the same path, so quality stays consistent from the first commit
              to the final release.
            </p>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {FLOW.map(({ label, Icon, color }, i) => (
                <li key={label} className="flex items-center gap-2">
                  <span 
                  className={`inline-flex items-center gap-1.5 rounded-full border bg-[var(--bg-soft)] px-3 py-1 font-mono text-[11px] text-[var(--ink-soft)]`}>
                    <Icon aria-hidden size={11} style={{color}} />
                    {label}
                  </span>
                  {i < FLOW.length - 1 && (
                    <span aria-hidden className="text-[var(--accent)]">→</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* MERN — origin story */}
          <div className="border-t border-[var(--line)] pt-4">
            <p className="mb-2 text-[10px] tracking-[3px] uppercase text-[var(--ink-muted)]">
              Where I Started | Core Tech Stack & Ecosystem
            </p>
            <div className="w-full flex justify-center md:block">
              <MernStack />
            </div>
          </div>
        </div>

        {/* Right Side - Only Image */}
        <div className="relative h-[300px] md:h-[480px] w-[550px]">
          <Image
            src="/programmer.png"
            alt="Intekhab"
            fill
            sizes="auto"
            priority
            className="object-contain md:object-cover"
          />
        </div>
      </div>

      {/* ── Working Principles ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <div className="mb-6 flex items-center gap-4">
          <p className="shrink-0 text-[10px] tracking-[3px] uppercase text-[var(--ink-muted)]">
            Working Principles
          </p>
          <span className="h-px w-full bg-[var(--line)]" />
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li
              key={p.no}
              className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-6 transition-colors duration-300 hover:border-[var(--accent)]/40"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[12px] tracking-[2px] text-[var(--accent)]">
                  {p.no}
                </span>
                <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[2px] text-[var(--ink-muted)]">
                  {p.tag}
                </span>
              </div>

              <h3
                className="mb-2 text-[18px] font-semibold tracking-tight text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>

              <p className="font-mono text-[12px] leading-[1.8] text-[var(--ink-soft)]">
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}