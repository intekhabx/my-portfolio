import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function HeroTopBar() {
  return (
    <div
      className="flex items-center justify-between px-5 md:px-12 py-3 md:py-5"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <div className="flex justify-center items-center">
        <Image
          src="/favicon.png"
          width={42}
          height={42}
          alt="logo"
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <span
          className="text-[11px] tracking-[1px] hidden md:flex"
          style={{ color: "var(--accent)" }}
        >
          ✦ Available for freelance
        </span>

        <span>
          <ThemeToggle />
        </span>

        <Link
          href="#contact"
          className="text-[10px] tracking-[2px] uppercase px-3 py-1 md:px-5 md:py-2 border transition-colors duration-200 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)]"
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