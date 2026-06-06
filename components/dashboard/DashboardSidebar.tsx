"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard, MdMessage, MdFolder, MdPerson, MdLogout } from "react-icons/md";

const navItems = [
  {
    group: "Overview",
    links: [
      { label: "Dashboard", href: "/admin/dashboard", icon: MdDashboard },
    ],
  },
  {
    group: "Content",
    links: [
      { label: "Messages", href: "/admin/message", icon: MdMessage },
      { label: "Projects", href: "/admin/project", icon: MdFolder },
    ],
  },
  // {
  //   group: "Settings",
  //   links: [
  //     { label: "Profile", href: "/admin/profile", icon: MdPerson },
  //   ],
  // },
];

export default function DashboardSidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.replace("/admin/login");
    } 
    catch (err) {
      console.error("error while logout", err);
    }
  };

  return (
    <aside
      className="flex flex-col h-screen w-[220px] shrink-0"
      style={{
        background: "#0f0f0f",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Brand */}
      <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Admin Panel
        </p>
        <p className="text-[20px] tracking-[-0.5px] mt-1" style={{ fontFamily: "var(--font-serif)", color: "#f0e8d8" }}>
          Portfolio<em className="italic" style={{ color: "#c8430a" }}>.</em>
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
        {navItems.map(({ group, links }) => (
          <div key={group}>
            <p className="text-[9px] tracking-[2px] uppercase px-2 mb-2" style={{ color: "rgba(255,255,255,0.18)" }}>
              {group}
            </p>
            <div className="flex flex-col gap-0.5">
              {links.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 text-[11px] tracking-[1px] uppercase transition-all duration-150"
                    style={{
                      textDecoration: "none",
                      color: isActive ? "#F5BB27" : "rgba(255,255,255,0.38)",
                      background: isActive ? "rgba(200,67,10,0.08)" : "transparent",
                      borderLeft: isActive ? "2px solid #F5BB27" : "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "#f0e8d8";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}
                  >
                    <Icon size={15} />
                    <span>{label}</span>
                    {label === "Messages" && unreadCount > 0 && (
                      <span
                        className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 min-w-[18px] text-center"
                        style={{ background: "#c8430a", color: "#fff" }}
                      >
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
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-[11px] tracking-[1px] uppercase transition-all duration-150"
          style={{
            color: "rgba(255,255,255,0.28)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#ef4444";
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <MdLogout size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}