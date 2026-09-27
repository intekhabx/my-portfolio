"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IMessage } from "@/models/message.model";
import { IProject } from "@/models/project.model";
import { 
  MdMessage, 
  MdFolder, 
  MdMarkEmailRead, 
  MdOpenInNew, 
  MdVisibility, 
  MdVisibilityOff 
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function DashboardPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [msgRes, projRes] = await Promise.all([
          axios.get("/api/message"),
          axios.get("/api/project"),
        ]);
        setMessages(msgRes.data.data || []);
        setProjects(projRes.data.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const unreadCount = messages.filter((m) => !m.markAsRead).length;
  const liveProjects = projects.filter((p) => p.liveLink).length;
  const visibleProjects = projects.filter((p) => p.isVisible !== false).length;

  if (loading) {
    return (
      <div 
        className="flex min-h-screen items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div 
            className="h-9 w-9 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: "var(--line)", borderTopColor: "var(--accent)" }}
          />
          <p 
            className="text-[11px] font-[var(--font-body)] uppercase tracking-[2px]"
            style={{ color: "var(--ink-soft)" }}
          >
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Messages",
      value: messages.length,
      sub: unreadCount > 0 ? `+${unreadCount} unread` : "All read",
      subColor: unreadCount > 0 ? "var(--accent)" : "#10b981",
      icon: MdMessage,
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      sub: unreadCount > 0 ? "Action required" : "Inbox clear",
      subColor: unreadCount > 0 ? "var(--accent)" : "var(--ink-soft)",
      icon: MdMarkEmailRead,
    },
    {
      label: "Total Projects",
      value: projects.length,
      sub: `${visibleProjects} Published · ${projects.length - visibleProjects} Hidden`,
      subColor: "var(--ink-soft)",
      icon: MdFolder,
    },
    {
      label: "Live Deployments",
      value: liveProjects,
      sub: "Active links",
      subColor: "#10b981",
      icon: MdOpenInNew,
    },
  ];

  return (
    <div 
      className="min-h-screen font-[var(--font-body)] p-4 sm:p-6 lg:p-8 space-y-6 md:space-y-8 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
    >
      
      {/* Top Header Banner */}
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b"
        style={{ borderColor: "var(--line)" }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: "var(--accent)" }}
            />
            <p 
              className="text-[10px] font-mono tracking-[2px] uppercase"
              style={{ color: "var(--ink-soft)" }}
            >
              Admin Control Center
            </p>
          </div>
          <h1 
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Dashboard<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div 
            className="px-3 py-1.5 rounded-lg border text-[11px] font-mono shadow-sm"
            style={{ 
              backgroundColor: "var(--bg-soft)", 
              borderColor: "var(--line)",
              color: "var(--ink-soft)" 
            }}
          >
            System Online
          </div>
        </div>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, subColor, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: "var(--bg-soft)", 
              borderColor: "var(--line)" 
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span 
                className="text-[10px] font-mono tracking-[1.5px] uppercase"
                style={{ color: "var(--ink-soft)" }}
              >
                {label}
              </span>
              <div 
                className="p-2 rounded-lg border"
                style={{ 
                  backgroundColor: "var(--bg)", 
                  borderColor: "var(--line)",
                  color: "var(--ink)" 
                }}
              >
                <Icon size={16} />
              </div>
            </div>

            <div>
              <p 
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {value}
              </p>
              <p className="text-[11px] font-mono mt-2" style={{ color: subColor }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid: Recent Messages & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* --- MESSAGES SECTION --- */}
        <div 
          className="rounded-xl border overflow-hidden flex flex-col"
          style={{ 
            backgroundColor: "var(--bg-soft)", 
            borderColor: "var(--line)" 
          }}
        >
          <div 
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ 
              backgroundColor: "var(--bg)", 
              borderColor: "var(--line)" 
            }}
          >
            <div className="flex items-center gap-2.5">
              <MdMessage size={16} style={{ color: "var(--accent)" }} />
              <h2 
                className="text-xs font-mono tracking-[1.5px] uppercase font-semibold"
                style={{ color: "var(--ink)" }}
              >
                Recent Messages
              </h2>
              {unreadCount > 0 && (
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white font-bold"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {unreadCount}
                </span>
              )}
            </div>

            <Link 
              href="/admin/message" 
              className="text-[11px] font-mono hover:underline transition-colors"
              style={{ color: "var(--ink-soft)" }}
            >
              View all →
            </Link>
          </div>

          <div className="divide-y flex-1" style={{ borderColor: "var(--line)" }}>
            {messages.length === 0 ? (
              <div 
                className="py-12 text-center text-xs font-mono"
                style={{ color: "var(--ink-muted)" }}
              >
                No messages received yet.
              </div>
            ) : (
              messages.slice(0, 5).map((msg) => (
                <div
                  key={String(msg._id)}
                  className="flex items-start gap-3.5 p-4 transition-all duration-200 hover:opacity-90"
                  style={{ 
                    backgroundColor: !msg.markAsRead ? "var(--bg)" : "transparent",
                    borderColor: "var(--line)"
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg border flex items-center justify-center text-[11px] font-mono font-bold shrink-0 mt-0.5"
                    style={{ 
                      backgroundColor: "var(--bg)", 
                      borderColor: "var(--line)",
                      color: "var(--accent)" 
                    }}
                  >
                    {msg.email?.slice(0, 2).toUpperCase() || "MSG"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--ink)" }}>
                        {msg.email}
                      </p>
                      <span className="text-[10px] font-mono shrink-0" style={{ color: "var(--ink-muted)" }}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <p className="text-xs line-clamp-1 font-sans" style={{ color: "var(--ink-soft)" }}>
                      {msg.message}
                    </p>
                  </div>

                  <div className="shrink-0 self-center">
                    <span
                      className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold"
                      style={
                        msg.markAsRead
                          ? { backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.2)" }
                          : { backgroundColor: "rgba(200, 67, 10, 0.1)", color: "var(--accent)", borderColor: "rgba(200, 67, 10, 0.3)" }
                      }
                    >
                      {msg.markAsRead ? "Read" : "New"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- PROJECTS SECTION --- */}
        <div 
          className="rounded-xl border overflow-hidden flex flex-col"
          style={{ 
            backgroundColor: "var(--bg-soft)", 
            borderColor: "var(--line)" 
          }}
        >
          <div 
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ 
              backgroundColor: "var(--bg)", 
              borderColor: "var(--line)" 
            }}
          >
            <div className="flex items-center gap-2.5">
              <MdFolder size={16} style={{ color: "var(--accent)" }} />
              <h2 
                className="text-xs font-mono tracking-[1.5px] uppercase font-semibold"
                style={{ color: "var(--ink)" }}
              >
                Projects Overview
              </h2>
            </div>

            <Link 
              href="/admin/project" 
              className="text-[11px] font-mono hover:underline transition-colors"
              style={{ color: "var(--ink-soft)" }}
            >
              View all →
            </Link>
          </div>

          <div className="divide-y flex-1" style={{ borderColor: "var(--line)" }}>
            {projects.length === 0 ? (
              <div 
                className="py-12 text-center text-xs font-mono"
                style={{ color: "var(--ink-muted)" }}
              >
                No projects added yet.
              </div>
            ) : (
              projects.slice(0, 5).map((proj) => (
                <div
                  key={proj._id.toString()}
                  className="flex items-center gap-3.5 p-4 transition-all duration-200"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div 
                    className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0"
                    style={{ 
                      backgroundColor: "var(--bg)", 
                      borderColor: "var(--line)",
                      color: "var(--ink-soft)" 
                    }}
                  >
                    <MdFolder size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--ink)" }}>
                        {proj.name}
                      </p>

                      {/* isVisible Badge */}
                      {proj.isVisible !== false ? (
                        <span 
                          className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border"
                          style={{ 
                            backgroundColor: "rgba(16, 185, 129, 0.1)", 
                            color: "#10b981", 
                            borderColor: "rgba(16, 185, 129, 0.2)" 
                          }}
                          title="Visible on site"
                        >
                          <MdVisibility size={10} /> Active
                        </span>
                      ) : (
                        <span 
                          className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border"
                          style={{ 
                            backgroundColor: "rgba(245, 158, 11, 0.1)", 
                            color: "#f59e0b", 
                            borderColor: "rgba(245, 158, 11, 0.2)" 
                          }}
                          title="Hidden from site"
                        >
                          <MdVisibilityOff size={10} /> Hidden
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {proj.techStack?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                          style={{ 
                            backgroundColor: "var(--bg)", 
                            borderColor: "var(--line)",
                            color: "var(--ink-soft)" 
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border transition-colors hover:opacity-80"
                        style={{ 
                          backgroundColor: "var(--bg)", 
                          borderColor: "var(--line)",
                          color: "var(--ink)" 
                        }}
                        title="GitHub Repo"
                      >
                        <FaGithub size={13} />
                      </a>
                    )}

                    {proj.liveLink && (
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border transition-colors"
                        style={{ 
                          backgroundColor: "rgba(16, 185, 129, 0.1)", 
                          borderColor: "rgba(16, 185, 129, 0.2)",
                          color: "#10b981" 
                        }}
                        title="Live Site"
                      >
                        <MdOpenInNew size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
