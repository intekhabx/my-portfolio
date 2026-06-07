"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  MdDashboard,
  MdMessage,
  MdFolder,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

const navItems = [
  {
    group: "Overview",
    links: [{ label: "Dashboard", href: "/admin/dashboard", icon: MdDashboard }],
  },
  {
    group: "Content",
    links: [
      { label: "Messages", href: "/admin/message", icon: MdMessage },
      { label: "Projects", href: "/admin/project", icon: MdFolder },
    ],
  },
];

export default function DashboardSidebar({
  unreadCount = 0,
}: {
  unreadCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const consent = confirm("Are you want to logout?");
      if(!consent) return;
      
      await axios.post("/api/auth/logout");
      router.replace("/admin/login");
    } 
    catch (err) {
      console.error("error while logout", err);
    }
  };

  const NavContent = () => (
    <>
      {/* Brand */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div>
          <p className="text-[9px] tracking-[3px] uppercase text-white/25">
            Admin Panel
          </p>
          <p className="text-[20px] tracking-[-0.5px] mt-1 text-[#f0e8d8] font-[var(--font-serif)]">
            Portfolio<em className="italic text-[#c8430a]">.</em>
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden flex items-center justify-center w-7 h-7 text-white/30 hover:text-white transition"
        >
          <MdClose size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
        {navItems.map(({ group, links }) => (
          <div key={group}>
            <p className="text-[9px] tracking-[2px] uppercase px-2 mb-2 text-white/20">
              {group}
            </p>

            <div className="flex flex-col gap-0.5">
              {links.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-[11px] tracking-[1px] uppercase transition-all
                      ${
                        isActive
                          ? "text-[#F5BB27] bg-[#F5BB2714] border-l-2 border-[#F5BB27]"
                          : "text-white/40 border-l-2 border-transparent hover:text-[#f0e8d8] hover:bg-white/5"
                      }`}
                  >
                    <Icon size={15} />
                    <span>{label}</span>

                    {label === "Messages" && unreadCount > 0 && (
                      <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 min-w-[18px] text-center bg-[#c8430a] text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-[11px] tracking-[1px] uppercase text-white/30 hover:text-red-500 hover:bg-red-500/10 transition text-left font-[var(--font-body)]"
        >
          <MdLogout size={15} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col h-screen w-[220px] shrink-0 sticky top-0 bg-[#0f0f0f] border-r border-white/10 font-[var(--font-body)]">
        <NavContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0f0f0f] border-b border-white/10 font-[var(--font-body)]">
        <p className="text-[18px] tracking-[-0.5px] text-[#f0e8d8] font-[var(--font-serif)]">
          Portfolio<em className="italic text-[#c8430a]">.</em>
        </p>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-9 h-9 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition"
        >
          <MdMenu size={20} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full z-50 flex flex-col w-[240px] bg-[#0f0f0f] border-r border-white/10 font-[var(--font-body)] transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavContent />
      </aside>
    </>
  );
}