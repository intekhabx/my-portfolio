import ProjectCardClient from "./Projectrowclient";
import SectionHeader from "./Sectionheader";

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
      <SectionHeader slNo="02" slText="Selected Work" leftMainTitle="Selected Engineering &" rightMainTitle="Full-Stack Work" desc="A curated showcase of production-ready web applications, custom full-stack systems, and software projects built with clean architecture." />

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