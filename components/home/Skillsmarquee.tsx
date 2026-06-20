"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSocketdotio,
  SiTailwindcss,
  SiHtml5,
  SiGit,
  SiGithub,
  SiDocker,
  SiRedis,
  SiApachekafka,
  SiVercel,
  SiFigma,
  SiJsonwebtokens,
  SiZod,
  SiPrisma,
} from "react-icons/si";
import { TbApi, TbDatabase } from "react-icons/tb";
import { IconType } from "react-icons";

/* ── Skill data — icon + label + brand color ─────────────────── */
interface Skill {
  label: string;
  Icon: IconType;
  color: string;
}

const skills: Skill[] = [
  { label: "JavaScript", Icon: SiJavascript,    color: "#F7DF1E" },
  { label: "TypeScript", Icon: SiTypescript,    color: "#3178C6" },
  { label: "React",      Icon: SiReact,         color: "#61DAFB" },
  { label: "Next.js",    Icon: SiNextdotjs,     color: "#FFFFFF" },
  { label: "Node.js",    Icon: SiNodedotjs,     color: "#339933" },
  { label: "Express",    Icon: SiExpress,       color: "#9CA3AF" },
  { label: "MongoDB",    Icon: SiMongodb,       color: "#47A248" },
  { label: "PostgreSQL", Icon: SiPostgresql,    color: "#4169E1" },
  { label: "REST API",   Icon: TbApi,           color: "#1d9bf0" },
  { label: "SQL",        Icon: TbDatabase,      color: "#60A5FA" },
  { label: "Socket.io",  Icon: SiSocketdotio,   color: "#FFFFFF" },
  { label: "Tailwind",   Icon: SiTailwindcss,   color: "#38BDF8" },
  { label: "HTML5",      Icon: SiHtml5,         color: "#E34F26" },
  { label: "Git",        Icon: SiGit,           color: "#F05032" },
  { label: "GitHub",     Icon: SiGithub,        color: "#FFFFFF" },
  { label: "Docker",     Icon: SiDocker,        color: "#2496ED" },
  { label: "Redis",      Icon: SiRedis,         color: "#DC382D" },
  { label: "Kafka",      Icon: SiApachekafka,   color: "#FFFFFF" },
  { label: "Vercel",     Icon: SiVercel,        color: "#FFFFFF" },
  { label: "Figma",      Icon: SiFigma,         color: "#F24E1E" },
  { label: "Drizzle",    Icon: TbDatabase,      color: "#C5F74F" },
  { label: "JWT",        Icon: SiJsonwebtokens, color: "#FB015B" },
  { label: "Zod",        Icon: SiZod,           color: "#3E67B1" },
  { label: "Prisma",     Icon: SiPrisma,        color: "#FFFFFF" },
];

export default function SkillsMarquee() {
  const looped = [...skills, ...skills];

  return (
    <div className="relative w-full max-w-full overflow-hidden py-6 border-t border-b bg-[var(--bg-dark)] border-[var(--line-dark)]">
      
      {/* edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-[var(--bg-dark)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-[var(--bg-dark)] to-transparent" />

      <motion.div
        className="flex gap-3 md:gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
      >
        {looped.map(({ label, Icon, color }, i) => (
          <div
            key={`${label}-${i}`}
            className="group flex items-center gap-2.5 shrink-0 rounded-full px-4 py-2 border border-[var(--line-dark)] bg-[rgba(29,155,240,0.04)] transition-colors duration-200 hover:bg-[rgba(29,155,240,0.08)]"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${color}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line-dark)";
            }}
          >
            <Icon className="text-[16px] md:text-[18px] transition-transform duration-200 group-hover:scale-110" style={{ color }} />
            <span className="text-[11px] md:text-[12px] whitespace-nowrap font-medium text-[var(--on-dark)] cursor-default">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}