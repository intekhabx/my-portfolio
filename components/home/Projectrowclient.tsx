"use client";

import { FiGithub } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import MacbookFrame from "./Macbookframe";

interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  category?: string;
}

export default function ProjectCardClient({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;

  const handleCardClick = () => {
    if (project.liveLink) {
      window.open(project.liveLink, "_blank", "noopener,noreferrer");
    } else if (project.githubLink) {
      window.open(project.githubLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative group">
      
      {/* ── Desktop Horizontal Connection Line (Hidden on Mobile) ── */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-[var(--line)]/60 z-0 transition-colors duration-300 group-hover:bg-[var(--accent)]/30" />

      {/* ── Desktop Center Node Dot (Hidden on Mobile) ── */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[var(--line)] bg-[var(--bg)] items-center justify-center transition-all duration-300 group-hover:border-[var(--accent)] group-hover:scale-125 z-20">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-80 group-hover:opacity-100" />
      </div>

      {/* ── Project Content Grid ── */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center relative z-10 cursor-default`}
      >
        {/* ── MacBook Display Side ── */}
        <div
          onClick={handleCardClick}
          className={`lg:col-span-6 w-full ${
            isEven ? "lg:order-1" : "lg:order-2"
          } cursor-pointer`}
        >
          <div className="bg-[var(--bg)] lg:p-2 rounded-xl">
            <MacbookFrame src={project.image} alt={project.name} />
          </div>
        </div>

        {/* ── Details Side ── */}
        <div
          className={`lg:col-span-6 flex flex-col justify-between ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="bg-[var(--bg)] lg:p-2 rounded-xl">
            {/* Header / Badges */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono tracking-[1.5px] uppercase text-[var(--ink-muted)] font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.liveLink && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    Live
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-all duration-200 hover:text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--bg-soft)]"
                    title="GitHub Code"
                  >
                    <FiGithub size={15} />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-all duration-200 hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)]"
                    title="Live Demo"
                  >
                    <GoArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Title */}
            <h3 className="text-[26px] sm:text-[28px] md:text-[30px] font-serif leading-[1.1] tracking-[-0.5px] text-[var(--ink)] mb-1 transition-colors duration-200 group-hover:text-[var(--accent)]">
              {project.name}
            </h3>

            {/* Category Subtitle */}
            {project.category && (
              <span className="block text-[12px] font-mono text-[var(--accent)] mb-4">
                ({project.category})
              </span>
            )}

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] leading-[1.8] text-[var(--ink-soft)] mb-4 max-w-xl font-normal">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-5 border-t border-[var(--line)] bg-[var(--bg)] lg:px-2">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[10px] font-mono tracking-[0.5px] uppercase rounded-full border border-[var(--line)] text-[var(--ink-muted)] bg-[var(--bg)] transition-colors duration-200 group-hover:border-[var(--line-dark)] group-hover:text-[var(--ink)]"
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}