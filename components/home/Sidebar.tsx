"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME",    href: "#home"    },
  { label: "STACK",   href: "#stack"   },
  { label: "WORK",    href: "#work"    },
  { label: "ABOUT",   href: "#about"   },
  { label: "CONTACT", href: "#contact" },
];

export default function Sidebar() {
  return (
    <>
      {/* ── DESKTOP: Fixed left vertical sidebar ── */}
      <aside className="
        hidden md:flex
        fixed left-0 top-0 z-50
        h-screen w-[52px]
        flex-col items-center justify-between
        border-r border-[var(--line-dark)] bg-[var(--bg-dark)]
        py-6
      ">
        {/* Name */}
        <span
          style={{ fontWeight: "bold" }}
          className="rotate-180 [writing-mode:vertical-rl] text-[11px] tracking-[4px] text-[var(--on-dark)] font-[var(--font-body)]"
        >
          INTEKHAB
        </span>

        {/* Nav Links */}
        <nav className="flex flex-col items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rotate-180 [writing-mode:vertical-rl] text-[8px] tracking-[2px] text-[var(--on-dark-muted)] no-underline transition-colors duration-200 hover:text-[var(--accent)] font-[var(--font-body)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Status dot */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="rotate-180 [writing-mode:vertical-rl] text-[7px] tracking-[2px] text-[var(--on-dark-muted)]">
            OPEN
          </span>
        </div>
      </aside>

      {/* ── MOBILE: Fixed bottom navigation bar ── */}
      <nav className="
        md:hidden
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-around
        border-t border-[var(--line-dark)] bg-[var(--bg-dark)]
        px-2 py-3
      ">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="
              flex flex-col items-center gap-[3px]
              text-[7.5px] tracking-[1.5px]
              text-[var(--on-dark-muted)]
              no-underline transition-colors duration-200
              hover:text-[var(--accent)]
              active:text-[var(--accent)]
              font-[var(--font-body)]
              px-3 py-1
            "
          >
            <MobileNavIcon label={link.label} />
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

// Simple inline icons for mobile nav — no extra dep needed
function MobileNavIcon({ label }: { label: string }) {
  const cls = "w-[18px] h-[18px] stroke-current fill-none stroke-[1.5]";

  switch (label) {
    case "HOME":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /><path d="M5 10v11h14V10" />
        </svg>
      );
    case "STACK":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "WORK":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      );
    case "ABOUT":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      );
    case "CONTACT":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16v13H4z" /><path d="M4 4l8 8 8-8" />
        </svg>
      );
    default:
      return null;
  }
}