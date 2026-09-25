"use client";

import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiTrpc,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
} from "react-icons/si";
import {
  TbApi,
  TbDatabase,
  TbDeviceDesktop,
  TbServer,
  TbTerminal2,
  TbCloud,
} from "react-icons/tb";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  Icon: IconType;
  color: string;
}

interface Category {
  label: string;
  ColIcon: IconType;
  colColor: string;
  description: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    label: "Frontend Engineering",
    ColIcon: TbDeviceDesktop,
    colColor: "#61DAFB",
    description: "Building responsive, highly accessible, and pixel-perfect user interfaces.",
    skills: [
      { name: "React", level: "Expert", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", level: "Expert", Icon: SiNextdotjs, color: "#a3a3a3" },
      { name: "Tailwind CSS", level: "Advanced", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "HTML / CSS", level: "Expert", Icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    label: "Backend & Systems",
    ColIcon: TbServer,
    colColor: "#339933",
    description: "Designing performant web servers, real-time protocols, and type-safe APIs.",
    skills: [
      { name: "Node.js", level: "Advanced", Icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", level: "Advanced", Icon: SiExpress, color: "#9CA3AF" },
      { name: "REST APIs", level: "Advanced", Icon: TbApi, color: "#1d9bf0" },
      { name: "tRPC", level: "Advanced", Icon: SiTrpc, color: "#2596BE" },
      { name: "WebSocket", level: "Advanced", Icon: SiSocketdotio, color: "#a3a3a3" },
    ],
  },
  {
    label: "Core Languages",
    ColIcon: TbTerminal2,
    colColor: "#a78bfa",
    description: "Strong structural foundations in typed, object-oriented, and query languages.",
    skills: [
      { name: "JavaScript", level: "Expert", Icon: SiJavascript, color: "#d4b800" },
      { name: "TypeScript", level: "Advanced", Icon: SiTypescript, color: "#3178C6" },
      { name: "SQL", level: "Advanced", Icon: TbDatabase, color: "#60A5FA" },
    ],
  },
  {
    label: "DevOps & Databases",
    ColIcon: TbCloud,
    colColor: "#2496ED",
    description: "Data persistence layers, memory caching, and containerized deployment workflows.",
    skills: [
      { name: "MongoDB", level: "Advanced", Icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", level: "Advanced", Icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", level: "Intermediate", Icon: SiRedis, color: "#DC382D" },
      { name: "Docker", level: "Intermediate", Icon: SiDocker, color: "#2496ED" },
      { name: "Git / GitHub", level: "Advanced", Icon: SiGit, color: "#F05032" },
    ],
  },
];

const levelPct: Record<string, string> = {
  Expert: "100%",
  Advanced: "75%",
  Intermediate: "50%",
};

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="border-b border-[var(--line)] py-16">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto pb-4 border-b border-[var(--line)]">
          
           {/* Sub-badge / Index */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[12px] font-mono tracking-[3px] text-[var(--ink-muted)]">
              01
            </span>
            <span className="text-[var(--ink-muted)] text-[12px]">—</span>
            <span className="text-[11px] font-mono uppercase tracking-[3px] text-[var(--ink-muted)]">
              Technical Mastery
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-[28px] sm:text-[36px] md:text-[46px] tracking-[-1.5px] leading-tight font-semibold text-[var(--ink)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Technology <em className="italic font-serif font-normal text-[var(--accent)]">Stack</em>
          </h2>

          {/* Centered Description */}
          <p className="text-[12px] md:text-[14px] text-[var(--ink-muted)] max-w-xl leading-relaxed font-normal">
            A comprehensive breakdown of frameworks, databases, core runtime languages, and developer tools powering my software architecture.
          </p>

        </div>
      </div>

      {/* ── Grid Showcase ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => {
            const ColIcon = cat.ColIcon;
            return (
              <div
                key={cat.label}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)]/20 hover:border-[var(--accent)]/40 hover:bg-[var(--bg-soft)]/60 transition-all duration-300"
              >
                {/* Accent Top Line Indicator on Hover */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{ backgroundColor: cat.colColor }}
                />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-3 border-b border-[var(--line)]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-[var(--line)]"
                        style={{ backgroundColor: `${cat.colColor}12` }}
                      >
                        <ColIcon style={{ color: cat.colColor, fontSize: 16 }} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[2px] text-[var(--ink-muted)] block">
                          0{ci + 1}
                        </span>
                        <h3 className="text-[14px] font-semibold text-[var(--ink)]">
                          {cat.label}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Category Brief Description */}
                  <p className="text-[11px] text-[var(--ink-muted)] mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skill Items List */}
                  <ul className="flex flex-col gap-4">
                    {cat.skills.map((skill) => {
                      const Icon = skill.Icon;
                      const key = `${cat.label}-${skill.name}`;
                      const isHovered = hovered === key;

                      return (
                        <li
                          key={skill.name}
                          className="flex flex-col gap-1.5 p-2 rounded-xl transition-colors cursor-default hover:bg-[var(--bg)]/80"
                          onMouseEnter={() => setHovered(key)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Icon
                                style={{
                                  color: skill.color,
                                  fontSize: 16,
                                  flexShrink: 0,
                                }}
                              />
                              <span className="text-[13px] font-medium text-[var(--ink)]">
                                {skill.name}
                              </span>
                            </div>

                            <span className="text-[9px] font-mono uppercase tracking-[1px] px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--ink-muted)] bg-[var(--bg)]">
                              {skill.level}
                            </span>
                          </div>

                          {/* Level Progress Indicator */}
                          <div className="w-full h-[3px] rounded-full bg-[var(--line)] overflow-hidden mt-1">
                            <div
                              style={{
                                height: "100%",
                                borderRadius: "999px",
                                background: skill.color,
                                width: isHovered ? levelPct[skill.level] : "25%",
                                transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}