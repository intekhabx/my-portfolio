"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IMessage } from "@/models/message.model";
import { IProject } from "@/models/project.model";
import { MdMessage, MdFolder, MdMarkEmailRead, MdOpenInNew } from "react-icons/md";
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

  const unreadCount = messages.filter((m) => !m.markAsRead).length;
  const liveProjects = projects.filter((p) => p.liveLink).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#c8430a]" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Messages",
      value: messages.length,
      sub: unreadCount > 0 ? `+${unreadCount} unread` : "All read",
      subColor: unreadCount > 0 ? "text-[#c8430a]" : "text-green-500",
      icon: MdMessage,
    },
    {
      label: "Unread",
      value: unreadCount,
      sub: "Need attention",
      subColor: "text-white/20",
      icon: MdMarkEmailRead,
    },
    {
      label: "Projects",
      value: projects.length,
      sub: "Total added",
      subColor: "text-white/20",
      icon: MdFolder,
    },
    {
      label: "Live",
      value: liveProjects,
      sub: "Deployed",
      subColor: "text-green-500",
      icon: MdOpenInNew,
    },
  ];

  return (
    <div className="min-h-screen font-[var(--font-body)]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-5 md:py-6 border-b border-white/10">
        <div>
          <p className="text-[9px] tracking-[3px] uppercase mb-1 text-white/25">
            Admin · Overview
          </p>
          <h1 className="text-[22px] md:text-[28px] tracking-[-0.5px] text-[#f0e8d8] font-[var(--font-serif)]">
            Dashboard<em className="italic text-[#c8430a]">.</em>
          </h1>
        </div>
        <p className="hidden sm:block text-[11px] tracking-[1px] text-white/20">
          Last updated: just now
        </p>
      </div>

      <div className="px-4 md:px-8 py-5 md:py-6 flex flex-col gap-6 md:gap-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0">
          {stats.map(({ label, value, sub, subColor, icon: Icon }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-2 md:gap-3 p-4 md:p-5 bg-[#161616] border border-white/10 ${
                i < 3 ? "-mr-px" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[2px] uppercase text-white/25">
                  {label}
                </span>
                <Icon size={13} className="text-white/15" />
              </div>

              <p className="text-[28px] md:text-[36px] tracking-[-2px] leading-none text-[#f0e8d8] font-[var(--font-display)]">
                {value}
              </p>

              <p className={`text-[10px] md:text-[11px] ${subColor}`}>
                {sub}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10">

          {/* Messages */}
          <div className="border-b md:border-b-0 md:border-r border-white/10">
            <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MdMessage size={13} className="text-white/30" />
                <span className="text-[11px] tracking-[1px] uppercase text-white/50">
                  Recent Messages
                </span>
                {unreadCount > 0 && (
                  <span className="text-[9px] px-1.5 py-0.5 min-w-[18px] text-center bg-[#c8430a] text-white">
                    {unreadCount}
                  </span>
                )}
              </div>

              <Link href="/admin/message" className="text-[10px] tracking-[1px] uppercase text-white/20">
                View all →
              </Link>
            </div>

            <div className="flex flex-col">
              {messages.length === 0 ? (
                <p className="px-5 py-10 text-center text-[12px] text-white/20">
                  No messages yet
                </p>
              ) : (
                messages.slice(0, 5).map((msg) => (
                  <div
                    key={String(msg._id)}
                    className={`flex items-start gap-3 px-4 md:px-5 py-4 border-b border-white/5 transition ${
                      msg.markAsRead
                        ? "bg-transparent hover:bg-white/5"
                        : "bg-[#c8430a08] hover:bg-white/5"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex items-center justify-center w-8 h-8 text-[11px] font-semibold bg-[#c8430a26] text-[#c8430a]">
                      {msg.email.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium truncate text-[#f0e8d8]">
                        {msg.email}
                      </p>
                      <p className="text-[11px] truncate mt-0.5 text-white/40">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[10px] text-white/20">
                        {msg.createdAt?.toString().split("T")[0]}
                      </span>

                      <span
                        className={`text-[8px] tracking-[1px] uppercase px-1.5 py-0.5 border ${
                          msg.markAsRead
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-[#c8430a20] text-[#c8430a] border-[#c8430a30]"
                        }`}
                      >
                        {msg.markAsRead ? "Read" : "New"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MdFolder size={13} className="text-white/30" />
                <span className="text-[11px] tracking-[1px] uppercase text-white/50">
                  Projects
                </span>
              </div>

              <Link href="/admin/project" className="text-[10px] tracking-[1px] uppercase text-white/20">
                View all →
              </Link>
            </div>

            <div className="flex flex-col">
              {projects.length === 0 ? (
                <p className="px-5 py-10 text-center text-[12px] text-white/20">
                  No projects yet
                </p>
              ) : (
                projects.slice(0, 5).map((proj) => (
                  <div
                    key={proj._id.toString()}
                    className="flex items-start gap-3 px-4 md:px-5 py-4 border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-white/5 border border-white/10">
                      <MdFolder size={14} className="text-white/30" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate text-[#f0e8d8]">
                        {proj.name}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.techStack?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[8px] tracking-[0.5px] uppercase px-1.5 py-0.5 bg-[#c8430a14] text-[#c8430a]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/20 hover:text-white"
                        >
                          <FaGithub size={14} />
                        </a>
                      )}

                      {proj.liveLink && (
                        <>
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/20 hover:text-green-500"
                          >
                            <MdOpenInNew size={14} />
                          </a>

                          <span className="text-[8px] tracking-[1px] uppercase px-1.5 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20">
                            Live
                          </span>
                        </>
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