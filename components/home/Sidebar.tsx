"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiLayers,
  FiBriefcase,
  FiUser,
  FiMail,
} from "react-icons/fi";

const navLinks = [
  { label: "HOME", href: "#home" },
  // { label: "STACK",   href: "#stack"   },
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
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
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <aside
        className="
        hidden md:flex
        fixed left-0 top-0 z-50
        h-screen w-[52px]
        flex-col items-center justify-between
        border-r border-[var(--line-dark)] bg-[var(--bg-dark)]
        py-6
      "
      >
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
              className={`
                rotate-180 [writing-mode:vertical-rl]
                text-[8px] tracking-[2px]
                no-underline transition-colors duration-200
                font-[var(--font-body)]
                ${
                  activeSection === link.href.slice(1)
                    ? "text-[var(--accent)]"
                    : "text-[var(--on-dark-muted)] hover:text-[var(--accent)]"
                }
              `}
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

      <nav
        className="
        md:hidden
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-around
        border-t border-[var(--line-dark)] bg-[var(--bg-dark)]
        px-2 py-3
      "
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`
              flex flex-col items-center gap-[3px]
              text-[7.5px] tracking-[1.5px]
              no-underline transition-colors duration-200
              font-[var(--font-body)]
              px-3 py-1
              ${
                activeSection === link.href.slice(1)
                  ? "text-[var(--accent)]"
                  : "text-[var(--on-dark-muted)] hover:text-[var(--accent)]"
              }
            `}
          >
            <MobileNavIcon label={link.label} />
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

function MobileNavIcon({ label }: { label: string }) {
  const cls = "w-[22px] h-[22px]";

  switch (label) {
    case "HOME":
      return <FiHome className={cls} />;

    // case "STACK":
    //   return <FiLayers className={cls} />;

    case "WORK":
      return <FiBriefcase className={cls} />;

    case "ABOUT":
      return <FiUser className={cls} />;

    case "CONTACT":
      return <FiMail className={cls} />;

    default:
      return null;
  }
}