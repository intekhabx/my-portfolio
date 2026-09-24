"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";


export default function HeroTopBar() {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <nav
        className="flex items-center justify-between px-4 py-2.5 rounded-full backdrop-blur-xl bg-[var(--bg)]/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
        style={{ border: "1px solid var(--line)" }}
      >
        {/* Brand Logo & Identifier */}
        <Link href="/" className="flex items-center gap-2.5 pl-1 group">
          <div className="relative overflow-hidden rounded-full border border-[var(--line)] p-1 bg-[var(--bg)] transition-transform duration-300 group-hover:rotate-12">
            <Image
              src="/favicon.png"
              width={26}
              height={26}
              alt="Logo"
              className="rounded-full object-cover"
            />
          </div>
          <span className="tracking-[1.2px] text-[var(--ink)] font-bold">
            intekhab<span className="text-[var(--accent)]">x</span>
          </span>
        </Link>

        {/* Center Nav Links (Pinterest-inspired floating pill style) */}
        <div className="hidden md:flex items-center gap-1 bg-[var(--ink)]/[0.03] p-1 rounded-full border border-[var(--line)]">
          <Link
            href="#work"
            className="px-4 py-1.5 rounded-full text-[12px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition-all duration-200"
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="px-4 py-1.5 rounded-full text-[12px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition-all duration-200"
          >
            About
          </Link>
          <Link
            href="#agent"
            className="px-4 py-1.5 rounded-full text-[12px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition-all duration-200"
          >
            AI Agent
          </Link>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border border-[var(--line)] bg-[var(--ink)]/[0.02] text-[var(--ink-soft)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available</span>
          </div>

          <ThemeToggle />

          <Link
            href="#contact"
            className="text-[11px] font-mono tracking-[1px] uppercase px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--bg)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white active:scale-95 shadow-sm"
          >
            Hire Me
          </Link>

          <Link
            href="/admin/dashboard"
            className="hover:text-[var(--accent)]">
              <PiArrowBendDoubleUpRightBold  />
          </Link>
        </div>
      </nav>
    </div>
  );
}
