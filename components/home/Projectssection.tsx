// components/ProjectsSection.tsx
// SERVER COMPONENT — receives projects from page.tsx (fetched server-side)

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
      className="w-full"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      {/* Header */}
      <div
        className="flex items-baseline justify-between px-12 py-6"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <h2
          className="text-[28px] tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}
        >
          Selected Work
        </h2>
        <span
          className="text-[11px] tracking-[3px] uppercase"
          style={{ color: "var(--ink-muted)", fontFamily: "var(--font-display)" }}
        >
          {String(projects.length).padStart(2, "0")} Projects
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {projects.length === 0 ? (
          <p className="px-12 py-10 text-[13px] text-[var(--ink-muted)]">
            No projects yet — add from admin dashboard.
          </p>
        ) : (
          projects.map((project, i) => (
            <ProjectRow key={project._id} project={project} index={i} />
          ))
        )}
      </div>
    </section>
  );
}

// ── Individual row — client for hover
import ProjectRowClient from "./Projectrowclient";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return <ProjectRowClient project={project} index={index} />;
}