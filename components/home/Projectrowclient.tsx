"use client";

import { VscGithub } from "react-icons/vsc";
import { GoArrowUpRight } from "react-icons/go";


interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
}

export default function ProjectRowClient({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="group flex items-center gap-5 px-12 cursor-pointer min-h-[72px] border-b border-[var(--line)] transition-all duration-300 hover:bg-white/50">
      {/* Number */}
      <span className="w-10 shrink-0 text-[22px] leading-none font-display text-[var(--ink-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Info */}
      <div className="flex-1 py-4">
        <p className="text-[16px] font-medium tracking-[-0.2px] text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {project.name}
        </p>

        <p className="mt-1 text-[11px] text-[var(--ink-muted)] max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
          {project.description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap justify-end gap-2">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-[9px] uppercase tracking-[1px] bg-[rgba(26,18,8,0.06)] text-[var(--ink-muted)]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="ml-1 flex items-center gap-3">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[18px] uppercase tracking-[1px] no-underline text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)]"
          >
            <VscGithub />
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="no-underline text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            <GoArrowUpRight />
          </a>
        )}
      </div>
    </div>
  );
}