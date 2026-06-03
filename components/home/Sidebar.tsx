import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "STACK", href: "#stack" },
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[52px] flex-col items-center justify-between border-r border-[var(--line-dark)] bg-[var(--bg-dark)] py-6">

      {/* Name */}
      <span 
      style={{fontWeight: "bold"}}
      className="rotate-180 [writing-mode:vertical-rl] text-[11px] tracking-[4px] text-[var(--on-dark)] font-[var(--font-body)]"
      >
        INTEKHAB
      </span>

      {/* Nav */}
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

      {/* Status */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

        <span className="rotate-180 [writing-mode:vertical-rl] text-[7px] tracking-[2px] text-[var(--on-dark-muted)]">
          OPEN
        </span>
      </div>
    </aside>
  );
}