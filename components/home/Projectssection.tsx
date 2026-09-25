import ProjectCardClient from "./Projectrowclient";

export interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  category?: string;
}

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="work"
      className="w-full border-b border-[var(--line)] bg-[var(--bg)] py-10 my-10 md:py-16 md:my-16 relative overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto pb-4 border-b border-[var(--line)]">
          
          {/* Sub-badge / Index */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[12px] font-mono tracking-[3px] text-[var(--ink-muted)]">
              02
            </span>
            <span className="text-[var(--ink-muted)] text-[12px]">—</span>
            <span className="text-[11px] font-mono uppercase tracking-[3px] text-[var(--ink-muted)]">
              Selected Work
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-[28px] sm:text-[28px] md:text-[38px] tracking-[-1.5px] leading-tight font-semibold text-[var(--ink)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Selected Engineering &<em className="italic font-serif font-normal text-[var(--accent)]"> Full-Stack Work</em>
          </h2>

          {/* Centered Description */}
          <p className="text-[12px] md:text-[13px] text-[var(--ink-muted)] max-w-xl leading-relaxed font-normal">
            A curated showcase of production-ready web applications, custom full-stack systems, and software projects built with clean architecture.
          </p>

        </div>
      </div>

      {/* ── Timeline Section ── */}
      {projects.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-[13px] font-mono text-[var(--ink-muted)]">
            No projects found.
          </p>
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Central Vertical Timeline Line (Desktop Only - Hidden on Mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 -translate-x-1/2 w-[1px] bg-[var(--line)] z-0" />

          {/* Projects Stack */}
          <div className="flex flex-col gap-20 lg:gap-36 relative z-10">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <ProjectCardClient project={project} index={index} />;
}