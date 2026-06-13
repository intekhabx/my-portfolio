
interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
}

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="work"
      className="w-full border-b border-[var(--line)]"
    >
      {/* ── Section Header ── */}
      <div
        className="flex items-center gap-5 px-4 py-5 md:px-12"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <span
          className="text-[11px] tracking-[3px] shrink-0"
          style={{ color: "var(--ink-muted)", fontFamily: "var(--font-display)" }}
        >
          02
        </span>
        <span style={{ color: "var(--ink-muted)", fontSize: "11px" }}>—</span>
        <h2
          className="text-[28px] md:text-[36px] tracking-[-1px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Selected <em className="italic" style={{ color: "var(--accent)" }}>Work</em>
        </h2>
        <div
          className="hidden md:block flex-1 h-px ml-4"
          style={{ background: "var(--line)" }}
        />
      </div>

      {/* ── Cards Grid ── */}
      {projects.length === 0 ? (
        <p className="px-4 py-10 text-[13px] md:px-12" style={{ color: "var(--ink-muted)" }}>
          No projects yet — add from admin dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

import ProjectCardClient from "./Projectrowclient";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <ProjectCardClient project={project} index={index} />;
}