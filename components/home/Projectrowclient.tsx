"use client";

import { FiGithub } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";

interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
}

export default function ProjectCardClient({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className="group relative flex flex-col justify-between min-h-[280px] md:min-h-[320px] cursor-default px-6 py-8 md:px-10 md:py-10 transition-colors duration-300 hover:bg-[var(--bg-soft)]"
      style={{
        borderBottom: "1px solid var(--line)",
        borderRight: isEven ? "1px solid var(--line)" : "none",
      }}
    >
      <div>
        {/* Top Row */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[11px] tracking-[3px] uppercase"
            style={{
              color: "var(--ink-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Project {String(index + 1).padStart(3, "0")}
          </span>

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              <FiGithub size={18} />
            </a>
          )}
        </div>

        {/* Project Name */}
        <h3
          className="mb-4 leading-[1.1] tracking-[-1px] text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 3.5vw, 28px)",
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="mb-6 max-w-[380px] text-[13px] leading-[1.75] text-[var(--ink-soft)]"
          style={{
            fontFamily: "var(--font-body)",
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-[10px] tracking-[1px] uppercase border border-[var(--line)] text-[var(--ink-soft)] transition-all duration-200 group-hover:border-[var(--accent)]"
              style={{
                fontFamily: "var(--font-body)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Live Link Arrow */}
      <div
        className="absolute bottom-6 right-6 flex items-center justify-center w-10 h-10 border border-[var(--line)] text-[var(--ink-muted)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full"
          >
            <GoArrowUpRight size={18} />
          </a>
        ) : (
          <GoArrowUpRight size={18} />
        )}
      </div>
    </div>
  );
}