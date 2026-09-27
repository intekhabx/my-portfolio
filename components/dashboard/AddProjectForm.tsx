"use client";

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { FiUploadCloud, FiMonitor, FiEdit3, FiCheckCircle } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchemaType, projectSchemaDto } from "@/lib/validation";

interface Props {
  setShowAddProjectPage: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function AddProjectForm({ setShowAddProjectPage }: Props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const { register, handleSubmit, watch, reset, formState: { errors }} = useForm<ProjectSchemaType>({
    defaultValues: {
      name: "",
      description: "",
      githubLink: "https://github.com/",
      liveLink: "https://",
      techStack: "React, Next.js, TypeScript, Tailwind CSS",
    },
    resolver: zodResolver(projectSchemaDto),
  });

  const formValues = watch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data: ProjectSchemaType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("githubLink", data.githubLink);
      formData.append("liveLink", data.liveLink);
      formData.append("techStack", data.techStack);

      if (file) {
        formData.append("file", file);
      }

      await axios.post("/api/project", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      setFile(null);
      setFilePreview(null);
      alert("Project Added Successfully!");
      setShowAddProjectPage(false);
    } 
    catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to add project. Please try again.");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 my-auto"
        style={{
          background: "var(--bg)",
          borderColor: "var(--line)",
          color: "var(--ink)",
          fontFamily: "var(--font-body)",
        }}
      >
        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>

          <div
            className="flex items-center p-1 rounded-xl border text-xs font-mono"
            style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.03)" }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === "form" ? "bg-[var(--accent)] text-white font-semibold" : "opacity-70 hover:opacity-100 text-[var(--ink)]"
              }`}
            >
              <FiEdit3 className="text-xs" /> Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === "preview" ? "bg-[var(--accent)] text-white font-semibold" : "opacity-70 hover:opacity-100 text-[var(--ink)]"
              }`}
            >
              <FiMonitor className="text-xs" /> Live Preview
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddProjectPage(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--line)] cursor-pointer"
            style={{ color: "var(--ink)" }}
            aria-label="Close"
          >
            <GoX className="text-lg" />
          </button>
        </div>

        {/* Title Heading */}
        <div className="px-6 sm:px-8 pt-5 pb-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-2 border font-bold"
            style={{ borderColor: "var(--line)", color: "var(--accent)" }}
          >
            ✦ Admin Panel · Projects
          </div>
          <h2
            className="text-2xl sm:text-3xl tracking-tight font-normal text-[var(--ink)]"
            style={{ lineHeight: 1.1 }}
          >
            Add New{" "}
            <span className="italic font-serif font-normal text-[var(--accent)]">
              Project.
            </span>
          </h2>
        </div>

        {/* Dynamic Form Content */}
        {activeTab === "form" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 sm:px-8 py-5 flex flex-col gap-5">
            
            {/* Top Row: File Upload & Title */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {/* Image Uploader */}
              <div>
                <label className="block text-[11px] font-mono tracking-[1.5px] uppercase mb-1.5 font-bold text-[var(--ink)]">
                  Project Banner
                </label>
                <div
                  className="relative border-2 border-dashed rounded-xl p-3.5 text-center transition-all duration-200 group hover:border-[var(--accent)] flex flex-col items-center justify-center cursor-pointer"
                  style={{ borderColor: "var(--line)", background: "rgba(0, 0, 0, 0.02)" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {filePreview ? (
                    <div className="flex items-center gap-3">
                      <img src={filePreview} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-[var(--line)]" />
                      <div className="text-left">
                        <p className="text-xs font-semibold text-[var(--ink)] flex items-center gap-1">
                          <FiCheckCircle className="text-emerald-500" /> {file?.name}
                        </p>
                        <p className="text-[10px] text-[var(--ink-muted)]">Click or drop image to replace</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 py-1">
                      <FiUploadCloud className="text-xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors" />
                      <p className="text-xs font-semibold text-[var(--ink)]">Upload Preview Image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-[11px] font-mono tracking-[1.5px] uppercase mb-1.5 font-bold text-[var(--ink)]">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Portfolio Website"
                  {...register("name")}
                  className="w-full bg-transparent outline-none text-sm py-2.5 px-3 rounded-lg border transition-colors duration-200 focus:border-[var(--accent)] text-[var(--ink)] font-medium placeholder:opacity-40"
                  style={{ borderColor: "var(--line)" }}
                />
                {errors.name && (
                  <p className="text-[11px] font-mono mt-1 text-red-500 font-medium">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono tracking-[1.5px] uppercase mb-1.5 font-bold text-[var(--ink)]">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  {...register("githubLink")}
                  className="w-full bg-transparent outline-none text-sm py-2 px-3 rounded-lg border transition-colors duration-200 focus:border-[var(--accent)] text-[var(--ink)] font-medium placeholder:opacity-40"
                  style={{ borderColor: "var(--line)" }}
                />
                {errors.githubLink && (
                  <p className="text-[11px] font-mono mt-1 text-red-500 font-medium">{errors.githubLink.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-[1.5px] uppercase mb-1.5 font-bold text-[var(--ink)]">
                  Live URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  {...register("liveLink")}
                  className="w-full bg-transparent outline-none text-sm py-2 px-3 rounded-lg border transition-colors duration-200 focus:border-[var(--accent)] text-[var(--ink)] font-medium placeholder:opacity-40"
                  style={{ borderColor: "var(--line)" }}
                />
                {errors.liveLink && (
                  <p className="text-[11px] font-mono mt-1 text-red-500 font-medium">{errors.liveLink.message}</p>
                )}
              </div>
            </div>

            {/* Comma Separated Tech Stack */}
            <div>
              <label className="block text-[11px] font-mono tracking-[1.5px] uppercase mb-1.5 font-bold text-[var(--ink)]">
                Technologies (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
                {...register("techStack")}
                className="w-full bg-transparent outline-none text-sm py-2 px-3 rounded-lg border transition-colors duration-200 focus:border-[var(--accent)] text-[var(--ink)] font-medium placeholder:opacity-40"
                style={{ borderColor: "var(--line)" }}
              />
              <p className="text-[10px] font-mono mt-1 text-[var(--ink-muted)]">
                Separate technologies with commas
              </p>
              {errors.techStack && (
                <p className="text-[11px] font-mono mt-1 text-red-500 font-medium">{errors.techStack.message}</p>
              )}
            </div>

            {/* Description Area */}
            <div>
              <label className="block text-[11px] font-mono tracking-[1.5px] uppercase mb-1.5 font-bold text-[var(--ink)]">
                Summary / Description
              </label>
              <textarea
                rows={3}
                placeholder="Write project description..."
                {...register("description")}
                className="w-full bg-transparent outline-none text-sm py-2 px-3 rounded-lg border transition-colors duration-200 focus:border-[var(--accent)] text-[var(--ink)] font-medium placeholder:opacity-40 resize-none"
                style={{ borderColor: "var(--line)" }}
              />
              {errors.description && (
                <p className="text-[11px] font-mono mt-1 text-red-500 font-medium">{errors.description.message}</p>
              )}
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-xs font-mono tracking-[2px] uppercase py-3.5 rounded-xl font-bold transition-all duration-200 hover:shadow-lg active:scale-[0.99] mt-2 cursor-pointer disabled:opacity-50"
              style={{
                background: "var(--accent)",
                color: "#ffffff",
              }}
            >
              {loading ? "Saving Project..." : "Publish Project →"}
            </button>
          </form>
        ) : (
          /* Live Preview View Container matched with image max-width */
          <div className="px-6 sm:px-8 py-6 flex flex-col items-center">
            <div className="w-full max-w-[420px] mx-auto">
              
              {/* Image Frame */}
              <div className="select-none pointer-events-none">
                <div className="relative aspect-[16/10] w-full rounded-xl bg-neutral-900 p-2 shadow-xl border border-neutral-700">
                  <div className="relative w-full h-full overflow-hidden rounded bg-black">
                    {filePreview ? (
                      <img src={filePreview} alt="Preview" className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-neutral-900">
                        <span className="text-3xl font-mono text-neutral-600">
                          {formValues.name ? formValues.name.charAt(0) : "P"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Section within exact image frame width */}
              <div className="mt-4 w-full p-4 rounded-xl border text-left" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.02)" }}>
                <h3 className="text-lg font-bold text-[var(--ink)]">
                  {formValues.name || "Untitled Project"}
                </h3>
                <p className="text-xs text-[var(--ink)] opacity-80 mt-1 line-clamp-3">
                  {formValues.description || "Project details preview will render here..."}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formValues.techStack?.split(",").map((tech, idx) => (
                    tech.trim() && (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold" style={{ borderColor: "var(--line)", color: "var(--accent)" }}>
                        {tech.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Footer info */}
        <div
          className="px-6 sm:px-8 py-3 flex justify-between items-center border-t text-[10px] font-mono font-semibold"
          style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        >
          <span>Portfolio Admin</span>
          <span>v2.0</span>
        </div>
      </div>
    </div>
  );
}
