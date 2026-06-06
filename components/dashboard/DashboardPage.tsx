"use client";

// app/admin/dashboard/page.tsx — CLIENT for data fetching
// Shows: stats cards + recent messages + recent projects

import { useEffect, useState } from "react";
import axios from "axios";
import { IMessage } from "@/models/message.model";
import { IProject } from "@/models/project.model";
import { MdMessage, MdFolder, MdMarkEmailRead, MdOpenInNew } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import Link from "next/link";

export default function DashboardPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [msgRes, projRes] = await Promise.all([
          axios.get("/api/message"),
          axios.get("/api/project"),
        ]);
        setMessages(msgRes.data.data);
        setProjects(projRes.data.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const unreadCount  = messages.filter((m) => !m.markAsRead).length;
  const liveProjects = projects.filter((p) => p.liveLink).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            borderTopColor: "#c8430a",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-body)", minHeight: "100vh" }}>

      {/* ── Page Header ── */}
      <div
        className="flex items-center justify-between px-8 py-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <p
            className="text-[9px] tracking-[3px] uppercase mb-1"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Admin · Overview
          </p>
          <h1
            className="text-[28px] tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-serif)", color: "#f0e8d8" }}
          >
            Dashboard
            <em className="italic" style={{ color: "#c8430a" }}>.</em>
          </h1>
        </div>
        <p
          className="text-[11px] tracking-[1px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Last updated: just now
        </p>
      </div>

      <div className="px-8 py-6 flex flex-col gap-8">

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-4 gap-0">
          {[
            {
              label: "Total Messages",
              value: messages.length,
              sub: unreadCount > 0 ? `+${unreadCount} unread` : "All read",
              subColor: unreadCount > 0 ? "#c8430a" : "#22c55e",
              icon: MdMessage,
            },
            {
              label: "Unread",
              value: unreadCount,
              sub: "Need attention",
              subColor: "rgba(255,255,255,0.2)",
              icon: MdMarkEmailRead,
            },
            {
              label: "Projects",
              value: projects.length,
              sub: "Total added",
              subColor: "rgba(255,255,255,0.2)",
              icon: MdFolder,
            },
            {
              label: "Live",
              value: liveProjects,
              sub: "Deployed projects",
              subColor: "#22c55e",
              icon: MdOpenInNew,
            },
          ].map(({ label, value, sub, subColor, icon: Icon }, i) => (
            <div
              key={label}
              className="flex flex-col gap-3 p-5"
              style={{
                background: "#161616",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                border: "1px solid rgba(255,255,255,0.07)",
                marginRight: i < 3 ? "-1px" : 0,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] tracking-[2px] uppercase"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {label}
                </span>
                <Icon size={14} style={{ color: "rgba(255,255,255,0.15)" }} />
              </div>
              <p
                className="text-[36px] tracking-[-2px] leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#f0e8d8",
                }}
              >
                {value}
              </p>
              <p className="text-[11px]" style={{ color: subColor }}>
                {sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom 2 columns ── */}
        <div className="grid grid-cols-2 gap-0" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>

          {/* LEFT — Recent Messages */}
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2">
                <MdMessage size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
                <span
                  className="text-[11px] tracking-[1px] uppercase"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Recent Messages
                </span>
                {unreadCount > 0 && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 min-w-[18px] text-center"
                    style={{ background: "#c8430a", color: "#fff" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              <Link
                href="/admin/messages"
                className="text-[10px] tracking-[1px] uppercase transition-colors duration-150 hover:text-[#c8430a]"
                style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
              >
                View all →
              </Link>
            </div>

            {/* Message rows */}
            <div className="flex flex-col">
              {messages.length === 0 ? (
                <p
                  className="px-5 py-10 text-center text-[12px]"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  No messages yet
                </p>
              ) : (
                messages.slice(0, 5).map((msg) => (
                  <div
                    key={String(msg._id)}
                    className="flex items-start justify-between gap-4 px-5 py-4 transition-colors duration-150"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: msg.markAsRead
                        ? "transparent"
                        : "rgba(200,67,10,0.03)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.02)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        msg.markAsRead ? "transparent" : "rgba(200,67,10,0.03)")
                    }
                  >
                    {/* Avatar */}
                    <div
                      className="flex items-center justify-center w-8 h-8 shrink-0 text-[11px] font-semibold"
                      style={{
                        background: "rgba(200,67,10,0.15)",
                        color: "#c8430a",
                      }}
                    >
                      {msg.email.slice(0, 2).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12px] font-medium truncate"
                        style={{ color: "#f0e8d8" }}
                      >
                        {msg.email}
                      </p>
                      <p
                        className="text-[11px] truncate mt-0.5"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {msg.message}
                      </p>
                    </div>

                    {/* Right — date + status */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span
                        className="text-[10px]"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        {msg.createdAt?.toString().split("T")[0]}
                      </span>
                      <span
                        className="text-[8px] tracking-[1px] uppercase px-1.5 py-0.5"
                        style={{
                          background: msg.markAsRead
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(200,67,10,0.12)",
                          color: msg.markAsRead ? "#22c55e" : "#c8430a",
                          border: `1px solid ${
                            msg.markAsRead
                              ? "rgba(34,197,94,0.2)"
                              : "rgba(200,67,10,0.2)"
                          }`,
                        }}
                      >
                        {msg.markAsRead ? "Read" : "New"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT — Recent Projects */}
          <div>
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2">
                <MdFolder size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
                <span
                  className="text-[11px] tracking-[1px] uppercase"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Projects
                </span>
              </div>
              <Link
                href="/admin/projects"
                className="text-[10px] tracking-[1px] uppercase transition-colors duration-150 hover:text-[#c8430a]"
                style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
              >
                View all →
              </Link>
            </div>

            {/* Project rows */}
            <div className="flex flex-col">
              {projects.length === 0 ? (
                <p
                  className="px-5 py-10 text-center text-[12px]"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  No projects yet
                </p>
              ) : (
                projects.slice(0, 5).map((proj) => (
                  <div
                    key={proj._id.toString()}
                    className="flex items-start justify-between gap-4 px-5 py-4 transition-colors duration-150"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.02)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-8 h-8 shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <MdFolder size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-medium truncate"
                        style={{ color: "#f0e8d8" }}
                      >
                        {proj.name}
                      </p>
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.techStack?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[8px] tracking-[0.5px] uppercase px-1.5 py-0.5"
                            style={{
                              background: "rgba(200,67,10,0.08)",
                              color: "rgba(200,67,10,0.7)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-150"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "#f0e8d8")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color =
                              "rgba(255,255,255,0.2)")
                          }
                        >
                          <FaGithub size={14} />
                        </a>
                      )}
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-150"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.color = "#22c55e")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.color =
                              "rgba(255,255,255,0.2)")
                          }
                        >
                          <MdOpenInNew size={14} />
                        </a>
                      )}
                      {proj.liveLink && (
                        <span
                          className="text-[8px] tracking-[1px] uppercase px-1.5 py-0.5"
                          style={{
                            background: "rgba(34,197,94,0.1)",
                            color: "#22c55e",
                            border: "1px solid rgba(34,197,94,0.2)",
                          }}
                        >
                          Live
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}