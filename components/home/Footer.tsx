"use client";

import Link from "next/link";
import { FiArrowUp, FiMail, FiMapPin, FiFileText, FiArrowUpRight } from "react-icons/fi";
import SocialBanner from "./Socialbanner";
import Image from "next/image";


const NAV_LINKS = [
  { label: "Project Works", href: "#work" },
  { label: "AI Agent", href: "#agent" },
  { label: "Tech Stack", href: "#how-i-work" },
  { label: "About Me", href: "#about" },
  { label: "GitHub", href: "#github" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full relative bg-[var(--bg)] transition-colors duration-300 pt-4 sm:pt-16 pb-8 px-6 md:px-12 lg:px-20"
      style={{ borderTop: "1px solid var(--line)" }}>

      {/* ── Top: brand · links · contact ── */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-10">

        {/* Brand */}
        <div className="space-y-3 md:col-span-5">
          <div className="flex items-center gap-2">
            <Link href="/" className="cursor-default">
              <div className="group relative">
                <div className="w-10 h-10 sm:w-full sm:h-full">
                    <Image src="/favicon.png" alt="IX" width={52} height={52}/>
                </div>
        
                {/* subtle glow effect */}
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 bg-blue-500 transition-all duration-300 rounded-full" />
              </div>
            </Link>

            <div className="mt-1">
              <h2 className=" text:lg sm:text-xl font-bold tracking-tight text-[var(--ink)]">
                intekhab<span className="text-[var(--accent)]">x</span>
              </h2>
              <p className="text-xs text-[var(--ink-soft)]">Full-Stack Developer & AI Engineer</p>
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-[var(--ink-soft)] max-w-sm font-normal">
            Full Stack Engineer crafting high-performance digital products, 
            scalable systems, and interactive web experiences.
          </p>

          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[11px] font-mono border border-[var(--line)] bg-[var(--ink)]/[0.03] text-[var(--ink-soft)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for new opportunities</span>
          </div>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer" className="md:col-span-3 hidden sm:block">
          <p className="mb-4 text-[10px] font-mono tracking-[3px] uppercase text-[var(--ink-muted)]">
            Navigate
          </p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[13px] text-[var(--ink-soft)] transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-4">
          <p className="mb-4 text-[10px] font-mono tracking-[3px] uppercase text-[var(--ink-muted)]">
            Get in touch
          </p>
          <p className="mb-4 max-w-xs text-[13px] leading-relaxed text-[var(--ink-soft)]">
            Have a project, an idea or a role in mind? I&apos;d love to hear about it.
          </p>

          <ul className="mb-5 space-y-2.5 text-[13px] text-[var(--ink-soft)]">
            <li>
              <a
                href={`mailto:intekhab118211989@gmail.com`}
                className="inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-[var(--accent)]"
              >
                <FiMail aria-hidden className="h-4 w-4 text-[var(--accent)]" />
                Email Directly
              </a>
            </li>
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-[var(--accent)]"
              >
                <FiFileText aria-hidden className="h-4 w-4 text-[var(--accent)]" />
                Download resume
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <FiMapPin aria-hidden className="h-4 w-4 text-[var(--accent)]" />
              Based in India
            </li>
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[12px] font-medium text-white transition-colors duration-200 hover:bg-[var(--accent-hov)]"
          >
            Start a conversation
            <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 2nd last bottom social icons */}
      <div className="py-4">
        <SocialBanner />
      </div>

      {/* Bottom Bar Divider */}
      <div 
        className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        {/* Copyright */}
        <p className="text-[11px] font-mono text-[var(--ink-muted)] tracking-wider">
          © {currentYear} INTEKHAB. ALL RIGHTS RESERVED.
        </p>

        {/* Subtitle / Signature */}
        <p className="text-[11px] font-mono text-[var(--ink-soft)] tracking-wide">
          Designed & Engineered by <span className="text-[var(--accent)] font-semibold">intekhabx</span>
        </p>

        {/* Interactive Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-[11px] font-mono tracking-[1.5px] uppercase text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors duration-200 group cursor-pointer"
        >
          <span>Back to top</span>
          <div className="p-1.5 rounded-full border border-[var(--line)] group-hover:border-[var(--accent)] group-hover:-translate-y-1 transition-all duration-200">
            <FiArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </footer>
  );
}