"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiBriefcase,
  FiUser,
  FiMail,
} from "react-icons/fi";

const navLinks = [
  { label: "HOME", href: "#home", icon: FiHome },
  { label: "WORK", href: "#work", icon: FiBriefcase },
  { label: "ABOUT", href: "#about", icon: FiUser },
  { label: "CONTACT", href: "#contact", icon: FiMail },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── DESKTOP SIDEBAR (Floating Vertical Dock) ── */}
      <aside
        className="
          hidden md:flex
          fixed left-4 top-1/2 -translate-y-1/2 z-50
          h-[88vh] w-[56px]
          flex-col items-center justify-between
          rounded-2xl border border-[var(--line-dark)] 
          bg-[var(--bg-dark)]/90 backdrop-blur-xl
          py-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          transition-all duration-300 hover:border-[var(--accent)]/30
        "
      >
        {/* Top Logo / Brand Name */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="rotate-180 [writing-mode:vertical-rl] text-[10px] font-mono tracking-[4px] font-bold text-slate-200 opacity-90 select-none"
          >
            INTEKHABx<span className="text-[var(--accent)]">.DEV</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-8 my-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <div key={link.label} className="relative group flex items-center">
                <Link
                  href={link.href}
                  className={`
                    relative flex items-center justify-center
                    rotate-180 [writing-mode:vertical-rl]
                    text-[9px] font-mono tracking-[2.5px] font-medium
                    no-underline transition-all duration-300
                    py-1.5 px-0.5 rounded-sm
                    ${
                      isActive
                        ? "text-[var(--accent)] font-semibold"
                        : "text-[var(--on-dark-muted)] hover:text-[var(--on-dark)]"
                    }
                  `}
                >
                  {link.label}
                </Link>

                {/* Active Bar Indicator */}
                {isActive && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Live Availability Badge */}
        <div className="flex flex-col items-center gap-2 group relative cursor-pointer">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>

          <span className="rotate-180 [writing-mode:vertical-rl] text-[7.5px] font-mono tracking-[2px] text-[var(--on-dark-muted)] group-hover:text-emerald-400 transition-colors">
            LIVE
          </span>
        </div>
      </aside>

      {/* ── MOBILE NAVIGATION (Floating Glass Bottom Pill Bar) ── */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px]">
        <nav
          className="
            flex items-center justify-around
            rounded-full border border-[var(--line-dark)]
            bg-[var(--bg-dark)]/85 backdrop-blur-xl
            px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.4)]
          "
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  relative flex flex-col items-center gap-1
                  text-[8px] font-mono tracking-[1px]
                  no-underline transition-all duration-200
                  px-3 py-1.5 rounded-full
                  ${
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent)]/10"
                      : "text-[var(--on-dark-muted)] hover:text-[var(--on-dark)]"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>

                {/* Mobile Active Dot Indicator */}
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
