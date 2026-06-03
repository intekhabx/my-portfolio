// components/HeroTopBar.tsx
// SERVER COMPONENT — static top bar, no interactivity

import Link from "next/link";

export default function HeroTopBar() {
  return (
    <div
      className="flex items-center justify-between px-12 py-5"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <p
        className="text-[11px] tracking-[3px] uppercase"
        style={{ color: "var(--ink-muted)" }}
      >
        Full Stack Developer — MERN · Next.js
      </p>

      <div className="flex items-center gap-6">
        {/* <span
          className="text-[11px] tracking-[2px] uppercase"
          style={{ color: "var(--ink-muted)" }}
        >
          MERN · Next.js · TypeScript
        </span> */}
        <span
          className="text-[11px] tracking-[1px]"
          style={{ color: "var(--accent)" }}
        >
          ✦ Available for freelance
        </span>
        <Link
          href="#contact"
          className="text-[10px] tracking-[2px] uppercase px-5 py-2 border transition-colors duration-200 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)]"
        >
          Hire Me
        </Link>
        <Link
          href="/admin/dashboard"
          className="hover:text-[var(--accent)]"
        >
          ↗
        </Link>
      </div>
    </div>
  );
}