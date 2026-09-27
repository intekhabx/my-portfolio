"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IProject } from "@/models/project.model";
import AddProjectForm from "./AddProjectForm";
import UpdateProjectForm from "./UpdateProjectForm";

// ── React Icons Imports ──
import { RiDeleteBin6Line, RiEdit2Line,  } from "react-icons/ri";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  MdVisibility,
  MdVisibilityOff,
  MdOutlineFolderSpecial,
} from "react-icons/md";
import { HiPlus } from "react-icons/hi2";
import { IoSearch, IoClose, IoCheckmarkCircle, IoWarning } from "react-icons/io5";
import { FiMaximize2 } from "react-icons/fi";

// ── Macbook Mockup Component ──
const MacbookFrame = ({
  src,
  alt,
  onClick,
}: {
  src?: string;
  alt: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="relative w-full max-w-[440px] md:max-w-[480px] mx-auto group cursor-pointer select-none transition-all duration-300"
      onClick={onClick}
    >
      {/* ── Laptop Chassis / Display Lid ── */}
      <div className="relative aspect-[16/10] w-full rounded-[10px] md:rounded-[12px] bg-[#121214] dark:bg-[#2d2d32] p-[2.5%] pb-[3.2%] shadow-2xl border border-neutral-700/30 dark:border-neutral-500/40">
        
        {/* Camera Dot */}
        <div className="absolute top-[1.2%] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#08080a] dark:bg-[#18181c] flex items-center justify-center z-20">
          <div className="w-[1.5px] h-[1.5px] rounded-full bg-[#0a3246]" />
        </div>

        {/* Display Screen */}
        <div className="relative w-full h-full overflow-hidden rounded-[3px] bg-black">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center font-mono text-[11px] tracking-wider uppercase gap-2"
              style={{ color: "var(--ink-muted)" }}
            >
              <MdOutlineFolderSpecial className="w-7 h-7 opacity-40" />
              <span>No Preview Available</span>
            </div>
          )}

          {/* Screen Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

          {/* Hover Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <span
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--ink)",
                borderColor: "var(--line)",
              }}
            >
              <FiMaximize2 className="w-3.5 h-3.5" /> View Full Preview
            </span>
          </div>
        </div>
      </div>

      {/* ── Base / Lip ── */}
      <div className="relative w-[106%] -left-[3%] h-[10px] md:h-[12px] bg-gradient-to-b from-[#242428] via-[#161618] to-[#0c0c0e] dark:from-[#3e3e46] dark:via-[#2b2b30] dark:to-[#1f1f24] rounded-b-[8px] md:rounded-b-[10px] border-t border-neutral-600/40 dark:border-neutral-400/30 shadow-lg flex justify-center">
        <div className="w-[14%] h-[3px] md:h-[4px] bg-[#0c0c0e] dark:bg-[#1f1f24] rounded-b-[2px]" />
      </div>

      <div className="w-[85%] mx-auto h-[8px] bg-black/30 dark:bg-black/60 blur-sm rounded-full -mt-0.5" />
    </div>
  );
};

interface IOldData {
  id: string;
  name: string;
  description?: string;
  techStack: string;
  githubLink?: string;
  liveLink?: string;
  image?: string;
}

const Project = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProjectPage, setShowAddProjectPage] = useState(false);
  const [showUpdateProjectPage, setShowUpdateProjectPage] = useState(false);
  const [oldProjectData, setOldProjectData] = useState<IOldData>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // ── Fetch Projects ──
  async function getAllProject() {
    try {
      const response = await axios.get("/api/project");
      setProjects(response.data.data);
    } 
    catch (err) {
      console.error("Error fetching projects:", err);
    } 
    finally {
      setLoading(false);
    }
  }

  // ── Delete Project ──
  async function handleDelete(id: string) {
    setError("");
    setSuccess("");
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await axios.delete(`/api/project/${id}`);
      setSuccess(response?.data?.message || "Project deleted successfully.");
      setProjects((prev) => prev.filter((p) => p._id.toString() !== id));
    } 
    catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    }
  }

  // ── Toggle Visibility ──
  async function handleToggleVisibility(id: string) {
    setError("");
    setSuccess("");
    try {
      const res = await axios.patch(`/api/project/${id}`);
      console.log(res.data);
      const updatedVisibility: boolean = res.data.data.isVisible;
      setProjects((prev) => prev.map((item) => String(item._id) === id ? ({ ...item, isVisible: updatedVisibility } as IProject) : item));
      setSuccess("Visibility updated successfully")
    }
    catch (err: any) {
      setError(err?.response?.data?.error || "Failed to update visibility.");
    }
  }

  useEffect(() => {
    getAllProject();
  }, [showAddProjectPage, showUpdateProjectPage]);

  useEffect(() => {
    let errorTimeout: ReturnType<typeof setTimeout>;
    let successTimeout: ReturnType<typeof setTimeout>;
    if (error) {
      errorTimeout = setTimeout(() => setError(""), 4000);
    }
    if (success) {
      successTimeout = setTimeout(() => setSuccess(""), 4000);
    }
    return () => {
      if (errorTimeout) clearTimeout(errorTimeout);
      if (successTimeout) clearTimeout(successTimeout);
    };
  }, [error, success]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack?.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (loading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
          style={{
            borderColor: "var(--line)",
            borderTopColor: "var(--accent)",
          }}
        />
        <p className="font-mono text-xs text-[var(--ink-muted)]">
          Loading showcase projects...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--ink)",
        backgroundColor: "var(--bg)",
      }}
      className="min-h-screen pb-20"
    >
      {/* ── Professional Control Header ── */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-xl"
        style={{
          borderColor: "var(--line)",
          backgroundColor: "var(--bg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-8 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p
                className="text-[10px] font-mono tracking-[2px] uppercase font-medium"
                style={{ color: "var(--ink-muted)" }}
              >
                Control Center
              </p>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Projects
              <span
                className="text-xs px-2.5 py-1 rounded-full font-mono border"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                  color: "var(--ink-soft)",
                }}
              >
                {filteredProjects.length}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-72">
              <IoSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--ink-muted)" }}
              />
              <input
                type="text"
                placeholder="Search projects or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                  color: "var(--ink)",
                }}
              />
            </div>

            {/* Add Action Button */}
            <button
              onClick={() => setShowAddProjectPage(true)}
              className="inline-flex items-center justify-center gap-2 text-xs tracking-wider px-4 py-2.5 rounded-xl font-medium text-white transition-all hover:opacity-95 active:scale-[0.98] shadow-sm shrink-0 cursor-pointer"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <HiPlus className="w-4 h-4" />
              <span className="font-semibold">New Project</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Toast Notifications ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        {error && (
          <div
            className="flex items-center justify-between px-4 py-3 text-xs font-mono rounded-xl border shadow-sm animate-in fade-in duration-200"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderColor: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
            }}
          >
            <div className="flex items-center gap-2">
              <IoWarning className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              className="p-1 hover:opacity-80 rounded"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>
        )}
        {success && (
          <div
            className="flex items-center justify-between px-4 py-3 text-xs font-mono rounded-xl border shadow-sm animate-in fade-in duration-200"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.08)",
              borderColor: "rgba(34, 197, 94, 0.2)",
              color: "#22c55e",
            }}
          >
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
            <button
              onClick={() => setSuccess("")}
              className="p-1 hover:opacity-80 rounded"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Main Projects List ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {filteredProjects.length === 0 ? (
          <div
            className="py-20 text-center rounded-2xl border border-dashed flex flex-col items-center justify-center gap-3"
            style={{
              borderColor: "var(--line)",
              color: "var(--ink-muted)",
            }}
          >
            <MdOutlineFolderSpecial className="w-10 h-10 opacity-40" />
            <p className="text-sm font-mono">No matching projects found</p>
            <p className="text-xs text-[var(--ink-muted)]">
              Try adjusting your search criteria or create a new project.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id.toString()}
                className="group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-xl flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch"
                style={{
                  backgroundColor: "var(--bg-soft)",
                  borderColor: "var(--line)",
                }}
              >
                {/* Left Side: Macbook Image Frame */}
                <div className="w-full lg:w-96 shrink-0 flex items-center justify-center">
                  <MacbookFrame
                    src={project.image}
                    alt={project.name}
                    onClick={() => {
                      if (project.image) {
                        setPreviewImage({
                          url: project.image,
                          title: project.name,
                        });
                      }
                    }}
                  />
                </div>

                {/* Right Side: Information & Action Control */}
                <div className="flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    {/* Header: Title + Visibility Badge Button */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="text-xl font-semibold tracking-tight"
                          style={{
                            color: "var(--ink)",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          {project.name}
                        </h3>
                      </div>

                      <button
                        onClick={()=> handleToggleVisibility(project._id.toString())}
                        title={
                          project.isVisible ? "Hide project" : "Make visible"
                        }
                        className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full font-semibold border transition-all hover:scale-105 shrink-0 cursor-pointer ${
                          project.isVisible !== false
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {project.isVisible !== false ? (
                          <>
                            <MdVisibility className="w-3.5 h-3.5" /> Visible
                          </>
                        ) : (
                          <>
                            <MdVisibilityOff className="w-3.5 h-3.5" /> Hidden
                          </>
                        )}
                      </button>
                    </div>

                    {/* Description */}
                    <p
                      className="text-xs sm:text-sm leading-relaxed line-clamp-3"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {project.description || "No project description provided."}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md border font-medium transition-colors"
                          style={{
                            backgroundColor: "var(--bg)",
                            borderColor: "var(--line)",
                            color: "var(--accent)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div
                    className="pt-4 border-t flex items-center justify-between gap-4"
                    style={{ borderColor: "var(--line)" }}
                  >
                    {/* Repository & Demo Links */}
                    <div className="flex items-center gap-4 text-xs font-mono">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          <FaGithub className="w-4 h-4" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:underline text-emerald-600 dark:text-emerald-400 font-medium"
                        >
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    {/* Edit & Delete Controls */}
                    <div className="flex items-center gap-2">
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
                            image: project?.image,
                          });
                        }}
                        className="p-2 rounded-xl border transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 cursor-pointer"
                        style={{
                          borderColor: "var(--line)",
                          color: "var(--ink-soft)",
                          backgroundColor: "var(--bg)",
                        }}
                        title="Edit Project"
                      >
                        <RiEdit2Line className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id.toString())}
                        className="p-2 rounded-xl border text-red-500 border-red-500/20 transition-all hover:bg-red-500/10 active:scale-95 cursor-pointer"
                        style={{
                          backgroundColor: "var(--bg)",
                        }}
                        title="Delete Project"
                      >
                        <RiDeleteBin6Line className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Image Preview Lightbox ── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-2xl border p-4 sm:p-5 shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--line)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between border-b pb-3 mb-4"
              style={{ borderColor: "var(--line)" }}
            >
              <h4
                className="text-sm font-semibold font-mono"
                style={{ color: "var(--ink)" }}
              >
                {previewImage.title}
              </h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg dark:hover:bg-white/5 cursor-pointer"
                style={{ color: "var(--ink-soft)" }}
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            <div
              className="flex justify-center rounded-xl overflow-hidden p-2"
              style={{ backgroundColor: "var(--bg-soft)" }}
            >
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Update Sub-Modals ── */}
      {showAddProjectPage && (
        <AddProjectForm setShowAddProjectPage={setShowAddProjectPage} />
      )}
      {showUpdateProjectPage && oldProjectData && (
        <UpdateProjectForm
          setShowUpdateProjectPage={setShowUpdateProjectPage}
          oldProjectData={oldProjectData}
        />
      )}
    </div>
  );
};

export default Project;