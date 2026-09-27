"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  MdDashboard,
  MdMessage,
  MdFolder,
  MdLogout,
  MdMenu,
  MdClose,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineShield,
  MdHome,
} from "react-icons/md";
import { GrSun, GrMoon } from "react-icons/gr";



const navGroups = [
  {
    group: "Core",
    links: [
      { label: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
    ],
  },
  {
    group: "Management",
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

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Sync theme with document class/attribute on load
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      const consent = confirm("Are you sure you want to log out?");
      if (!consent) return;

      await axios.post("/api/auth/logout");
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const NavList = ({ isCompact = false }: { isCompact?: boolean }) => (
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      {navGroups.map(({ group, links }) => (
        <div key={group} className="space-y-1">
          {!isCompact && (
            <p
              className="px-3 text-[10px] font-mono tracking-[1.5px] uppercase font-semibold mb-2"
              style={{ color: "var(--ink-muted)" }}
            >
              {group}
            </p>
          )}

          {links.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                title={isCompact ? label : undefined}
                className={`relative flex items-center ${
                  isCompact ? "justify-center px-2" : "justify-between px-3"
                } py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all duration-200 group`}
                style={
                  isActive
                    ? {
                        color: "var(--accent)",
                        backgroundColor: "rgba(200, 67, 10, 0.12)",
                      }
                    : {
                        color: "var(--ink-soft)",
                      }
                }
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                )}

                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    size={18}
                    className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: isActive ? "var(--accent)" : "var(--ink-soft)" }}
                  />
                  {!isCompact && <span className="truncate font-medium">{label}</span>}
                </div>

                {/* Badge Notification */}
                {label === "Messages" && unreadCount > 0 && (
                  <span
                    className={`inline-flex items-center justify-center font-bold text-[10px] rounded-full text-white ${
                      isCompact
                        ? "absolute -top-1 -right-1 w-4 h-4 text-[8px]"
                        : "px-2 py-0.5"
                    }`}
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 border-r transition-all duration-300 z-30 ${
          collapsed ? "w-[76px]" : "w-[250px]"
        }`}
        style={{
          backgroundColor: "var(--bg-soft)",
          borderColor: "var(--line)",
          color: "var(--ink)",
        }}
      >
        {/* Header with Image Link to Home */}
        <div
          className="h-20 px-4 flex items-center justify-between border-b shrink-0"
          style={{ borderColor: "var(--line)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 group min-w-0 overflow-hidden"
            title="Go to Home Page"
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden mb-1.5">
              <Image src="/favicon.png" alt="I" fill className="object-cover" />
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold tracking-tight truncate flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                  Intekhab <MdHome className="inline opacity-0 group-hover:opacity-100 transition-opacity" size={13} />
                </span>
                <span className="text-[10px] font-mono truncate" style={{ color: "var(--ink-muted)" }}>
                  Visit Portfolio ↗
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border hover:bg-[var(--bg)] transition-colors shrink-0"
            style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Links Area */}
        <NavList isCompact={collapsed} />

        {/* Theme Toggle & User Footer */}
        <div
          className="p-3 border-t shrink-0 space-y-2"
          style={{ borderColor: "var(--line)" }}
        >
          {/* Theme Toggler Button */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center ${
              collapsed ? "justify-center" : "justify-between px-3"
            } py-2 rounded-xl text-xs font-mono border transition-all duration-200 hover:bg-[var(--bg)]`}
            style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          >
            <div className="flex items-center gap-2">
              {isDark ? (
                <GrSun size={16} className="text-amber-400 shrink-0" />
              ) : (
                <GrMoon size={16} className="text-indigo-400 shrink-0" />
              )}
              {!collapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
            </div>
            {!collapsed && (
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded border" style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}>
                Theme
              </span>
            )}
          </button>

          {/* Profile Card */}
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            } p-2 rounded-xl border`}
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0"
                style={{ backgroundColor: "var(--bg-soft)", color: "var(--ink)" }}
              >
                <MdOutlineShield size={16} style={{ color: "var(--accent)" }} />
              </div>

              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--ink)" }}>
                    Admin Panel
                  </p>
                  <p className="text-[10px] font-mono truncate" style={{ color: "var(--ink-muted)" }}>
                    System Active
                  </p>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <MdLogout size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* --- MOBILE TOP HEADER --- */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 h-16 z-40 px-4 flex items-center justify-between border-b backdrop-blur-md"
        style={{
          backgroundColor: "var(--bg-soft)",
          borderColor: "var(--line)",
          color: "var(--ink)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden">
              <Image src="/favicon.png" alt="Home" fill className="object-cover" />
            </div>
          <span className="font-semibold text-xs tracking-tight"></span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Quick Mobile Theme Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 border rounded-lg"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
            title="Toggle Theme"
          >
            {isDark ? <GrSun size={18} className="text-amber-400" /> : <GrMoon size={18} className="text-indigo-400" />}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 border rounded-lg"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            <MdMenu size={20} />
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* --- MOBILE DRAWER --- */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-[270px] flex flex-col border-r transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--bg-soft)",
          borderColor: "var(--line)",
          color: "var(--ink)",
        }}
      >
        <div
          className="h-16 px-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <Link href="/" className="flex items-center gap-1">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden">
              <Image src="/favicon.png" alt="Home" fill className="object-cover" />
            </div>
            <span className="font-semibold">intekhab<span className="text-[var(--accent)]">x</span></span>
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ color: "var(--ink-soft)" }}>
            <MdClose size={20} />
          </button>
        </div>

        <NavList />

        <div className="p-4 border-t space-y-2 mt-auto" style={{ borderColor: "var(--line)" }}>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono rounded-lg border"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            {isDark ? <GrSun size={16} className="text-amber-400" /> : <GrMoon size={16} className="text-indigo-400" />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono uppercase font-semibold rounded-lg bg-red-500/10 text-red-500 transition-colors"
          >
            <MdLogout size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}