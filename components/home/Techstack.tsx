"use client";

import { useState } from "react";
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5,
  SiNodedotjs, SiExpress, SiSocketdotio, SiTrpc,
  SiJavascript, SiTypescript,
  SiMongodb, SiPostgresql, SiRedis, SiDocker, SiGit,
} from "react-icons/si";
import { TbApi, TbDatabase, TbDeviceDesktop, TbServer, TbTerminal2, TbCloud } from "react-icons/tb";
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
  skills: Skill[];
}

const categories: Category[] = [
  {
    label: "Frontend",
    ColIcon: TbDeviceDesktop,
    colColor: "#61DAFB",
    skills: [
      { name: "React",        level: "Expert",   Icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",      level: "Expert",   Icon: SiNextdotjs,   color: "#a3a3a3" },
      { name: "Tailwind CSS", level: "Advanced", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "HTML / CSS",   level: "Expert",   Icon: SiHtml5,       color: "#E34F26" },
    ],
  },
  {
    label: "Backend",
    ColIcon: TbServer,
    colColor: "#339933",
    skills: [
      { name: "Node.js",    level: "Advanced", Icon: SiNodedotjs,    color: "#339933" },
      { name: "Express.js", level: "Advanced", Icon: SiExpress,      color: "#9CA3AF" },
      { name: "REST APIs",  level: "Advanced", Icon: TbApi,           color: "#1d9bf0" },
      { name: "tRPC",       level: "Advanced", Icon: SiTrpc,          color: "#2596BE" },
      { name: "WebSocket",  level: "Advanced", Icon: SiSocketdotio,  color: "#a3a3a3" },
    ],
  },
  {
    label: "Languages",
    ColIcon: TbTerminal2,
    colColor: "#a78bfa",
    skills: [
      { name: "JavaScript", level: "Expert",   Icon: SiJavascript, color: "#d4b800" },
      { name: "TypeScript", level: "Advanced", Icon: SiTypescript, color: "#3178C6" },
      { name: "SQL",        level: "Advanced", Icon: TbDatabase,   color: "#60A5FA" },
    ],
  },
  {
    label: "Tools & DevOps",
    ColIcon: TbCloud,
    colColor: "#2496ED",
    skills: [
      { name: "MongoDB",      level: "Advanced",     Icon: SiMongodb,    color: "#47A248" },
      { name: "PostgreSQL",   level: "Advanced",     Icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis",        level: "Intermediate", Icon: SiRedis,      color: "#DC382D" },
      { name: "Docker",       level: "Intermediate", Icon: SiDocker,     color: "#2496ED" },
      { name: "Git / GitHub", level: "Advanced",     Icon: SiGit,        color: "#F05032" },
    ],
  },
];

const levelPct: Record<string, string> = {
  Expert:       "100%",
  Advanced:     "70%",
  Intermediate: "40%",
};

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="border-b border-[var(--line)]">

      {/* Header */}
      <div className="flex items-center gap-5 px-4 py-5 md:px-12 border-b border-[var(--line)]">
        <span className="text-[11px] tracking-[3px] shrink-0 text-[var(--ink-muted)]">01</span>
        <span className="text-[11px] text-[var(--ink-muted)]">—</span>
        <h2
          className="text-[28px] md:text-[36px] tracking-[-1px] text-[var(--ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Technology <em className="italic text-[var(--accent)]">Stack</em>
        </h2>
        <div className="hidden md:block flex-1 h-px ml-4 bg-[var(--line)]" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderBottom: "1px solid var(--line)" }}>
        {categories.map((cat, ci) => {
          const ColIcon = cat.ColIcon;
          return (
            <div
              key={cat.label}
              className="px-6 py-8 md:px-8 md:py-10"
              style={{
                borderRight: ci < categories.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              {/* Column header */}
              <div
                className="flex items-center gap-2 mb-6"
                style={{ paddingBottom: "0.75rem", borderBottom: "1px solid var(--line)" }}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center shrink-0"
                  style={{ background: `${cat.colColor}18` }}
                >
                  <ColIcon style={{ color: cat.colColor, fontSize: 15 }} />
                </div>
                <span
                  className="text-[9px] tracking-[2.5px] uppercase font-medium"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Skills */}
              <ul className="flex flex-col gap-[18px]">
                {cat.skills.map((skill) => {
                  const Icon = skill.Icon;
                  const key = `${cat.label}-${skill.name}`;
                  const isHovered = hovered === key;

                  return (
                    <li
                      key={skill.name}
                      className="flex items-center gap-3 cursor-default"
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Icon — always brand color, visible */}
                      <Icon
                        style={{
                          color: skill.color,
                          fontSize: 15,
                          flexShrink: 0,
                        }}
                      />

                      {/* Skill name — always visible */}
                      <span
                        className="text-[12px] md:text-[14px] font-medium tracking-[-0.2px]"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        {skill.name}
                      </span>

                      {/* Progress bar — medium width, fills on hover */}
                      <div
                        className="ml-auto shrink-0"
                        style={{
                          width: 48,
                          height: 3,
                          borderRadius: 999,
                          background: "var(--line)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 999,
                            background: skill.color,
                            /* start from 0, animate to full pct on hover */
                            width: isHovered ? levelPct[skill.level] : "0%",
                            transition: "width 0.45s ease",
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

    </section>
  );
}
