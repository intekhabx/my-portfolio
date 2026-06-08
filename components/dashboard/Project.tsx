"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IProject } from "@/models/project.model";
import AddProjectForm from "./AddProjectForm";
import UpdateProjectForm from "./UpdateProjectForm";
import { FaGithub } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

interface IOldData {
  id: string;
  name: string;
  description?: string;
  techStack: string;
  githubLink?: string;
  liveLink?: string;
}

const Project = () => {
  const [projects, setProjects]                           = useState<IProject[]>([]);
  const [loading, setLoading]                             = useState(true);
  const [showAddProjectPage, setShowAddProjectPage]       = useState(false);
  const [showUpdateProjectPage, setShowUpdateProjectPage] = useState(false);
  const [oldProjectData, setOldProjectData]               = useState<IOldData>();
  const [error, setError]                                 = useState("");
  const [success, setSuccess]                             = useState("");

  async function getAllProject() {
    try {
      const response = await axios.get("/api/project");
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setError(""); setSuccess("");
    const isConfirmed = confirm("Are you sure want to delete?");
    if (!isConfirmed) return;
    try {
      const response = await axios.delete(`/api/project/${id}`);
      setSuccess(response?.data?.message);
      setProjects((prev) => prev.filter((p) => p._id.toString() !== id));
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    }
  }

  useEffect(() => {
    getAllProject();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2"
          style={{ borderColor: "rgba(255,255,255,0.1)", borderTopColor: "#c8430a" }}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>

      {/* ── Page header ── */}
      <div
        className="flex items-center justify-between px-4 py-5 sm:px-8 sm:py-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <p className="text-[9px] tracking-[3px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
            Admin · Content
          </p>
          <h1 className="text-[22px] sm:text-[28px] tracking-[-0.5px]" style={{ fontFamily: "var(--font-serif)", color: "#f0e8d8" }}>
            Projects<em className="italic" style={{ color: "#c8430a" }}>.</em>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Total count — hidden on very small screens */}
          <div
            className="hidden sm:flex flex-col items-center px-4 py-2"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#161616" }}
          >
            <span className="text-[20px] font-semibold tracking-[-1px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-display)" }}>
              {projects.length}
            </span>
            <span className="text-[9px] tracking-[2px] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Total
            </span>
          </div>

          {/* Add button */}
          <button
            onClick={() => setShowAddProjectPage(true)}
            className="text-[10px] tracking-[2px] uppercase px-4 py-2.5 sm:px-5 transition-all duration-150"
            style={{ background: "#c8430a", color: "#fff", border: "none", cursor: "pointer", fontFamily: "var(--font-body)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#a83508")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#c8430a")}
          >
            + Add
          </button>
        </div>
      </div>

      {/* ── Toast notifications ── */}
      <div className="px-4 pt-4 flex flex-col gap-2 sm:px-8">
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 text-[12px] tracking-[0.5px]"
            style={{ background: "rgba(239,68,68,0.08)", borderLeft: "2px solid #ef4444", color: "#ef4444" }}>
            ✕ &nbsp;{error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 px-4 py-3 text-[12px] tracking-[0.5px]"
            style={{ background: "rgba(34,197,94,0.08)", borderLeft: "2px solid #22c55e", color: "#22c55e" }}>
            ✓ &nbsp;{success}
          </div>
        )}
      </div>

      {/* ── Projects list ── */}
      <div className="px-4 py-4 flex flex-col gap-0 sm:px-8 sm:py-6">

        {/* Column headers — desktop only */}
        <div
          className="hidden sm:grid gap-4 px-4 py-2 text-[9px] tracking-[2px] uppercase"
          style={{
            gridTemplateColumns: "1fr 200px 120px",
            color: "rgba(255,255,255,0.2)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span>Project</span>
          <span>Links</span>
          <span className="text-right">Actions</span>
        </div>

        {projects.length === 0 ? (
          <div
            className="py-16 text-center text-[13px]"
            style={{ border: "1px dashed rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", marginTop: "1px" }}
          >
            No projects found — add your first project
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id.toString()}>

              {/* ── MOBILE card layout (< sm) ── */}
              <div
                className="sm:hidden flex flex-col gap-3 px-3 py-4 transition-colors duration-150"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "transparent" }}
              >
                {/* Top: name + actions */}
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[14px] font-medium" style={{ color: "#f0e8d8" }}>
                    {project.name}
                  </p>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        setShowUpdateProjectPage(true);
                        setOldProjectData({
                          id: project._id.toString(),
                          name: project.name,
                          description: project?.description,
                          techStack: project.techStack.join(", "),
                          githubLink: project?.githubLink,
                          liveLink: project?.liveLink,
                        });
                      }}
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0 }}
                    >
                      <MdEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id.toString())}
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0 }}
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {project.description || "No description"}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="text-[9px] tracking-[1px] uppercase px-2 py-0.5"
                      style={{ background: "rgba(200,67,10,0.1)", color: "#c8430a", border: "1px solid rgba(200,67,10,0.2)" }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px]"
                      style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
                      <FaGithub size={13} /><span>GitHub</span>
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px]"
                      style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
                      <IoMdEye size={14} /><span>Live</span>
                    </a>
                  )}
                </div>
              </div>

              {/* ── DESKTOP grid layout (sm+) ── */}
              <div
                className="hidden sm:grid gap-4 px-4 py-5 transition-colors duration-150"
                style={{
                  gridTemplateColumns: "1fr 200px 120px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: "transparent",
                  alignItems: "start",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <div>
                  <p className="text-[15px] font-medium mb-1" style={{ color: "#f0e8d8" }}>{project.name}</p>
                  <p className="text-[12px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {project.description || "No description"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="text-[9px] tracking-[1px] uppercase px-2 py-0.5"
                        style={{ background: "rgba(200,67,10,0.1)", color: "#c8430a", border: "1px solid rgba(200,67,10,0.2)" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] tracking-[0.5px] mt-3 font-mono" style={{ color: "rgba(255,255,255,0.12)" }}>
                    ID: {project._id.toString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-0.5">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[11px] tracking-[0.5px] transition-colors duration-150 w-fit"
                      style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f0e8d8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}>
                      <FaGithub size={13} /><span>GitHub</span>
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[11px] tracking-[0.5px] transition-colors duration-150 w-fit"
                      style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#22c55e")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}>
                      <IoMdEye size={14} /><span>Live</span>
                    </a>
                  )}
                  {!project.githubLink && !project.liveLink && (
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.15)" }}>No links</span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-0.5">
                  <button
                    onClick={() => {
                      setShowUpdateProjectPage(true);
                      setOldProjectData({
                        id: project._id.toString(),
                        name: project.name,
                        description: project?.description,
                        techStack: project.techStack.join(", "),
                        githubLink: project?.githubLink,
                        liveLink: project?.liveLink,
                      });
                    }}
                    title="Edit project"
                    className="transition-colors duration-150"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#60a5fa")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id.toString())}
                    title="Delete project"
                    className="transition-colors duration-150"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ef4444")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {showAddProjectPage && <AddProjectForm setShowAddProjectPage={setShowAddProjectPage} />}
      {showUpdateProjectPage && oldProjectData && (
        <UpdateProjectForm setShowUpdateProjectPage={setShowUpdateProjectPage} oldProjectData={oldProjectData} />
      )}
    </div>
  );
};

export default Project;