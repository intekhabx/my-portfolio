"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { projectSchemaDto, ProjectSchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  setShowUpdateProjectPage: React.Dispatch<React.SetStateAction<boolean>>;
  oldProjectData: {
    id: string;
    name: string;
    description?: string;
    techStack: string;
    githubLink?: string;
    liveLink?: string;
  };
}

const fields = [
  {
    name: "name" as const,
    label: "Project Name",
    type: "text",
    placeholder: "Portfolio Website",
    hint: null,
  },
  {
    name: "techStack" as const,
    label: "Tech Stack",
    type: "text",
    placeholder: "React, Next.js, TypeScript, MongoDB",
    hint: "Separate technologies with commas",
  },
  {
    name: "githubLink" as const,
    label: "GitHub Link",
    type: "url",
    placeholder: "https://github.com/username/project",
    hint: null,
  },
  {
    name: "liveLink" as const,
    label: "Live Demo Link",
    type: "url",
    placeholder: "https://yourproject.com",
    hint: null,
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  padding: "10px 0",
  fontSize: "13px",
  color: "#f0e8d8",
  fontFamily: "var(--font-body)",
  outline: "none",
};

const UpdateProjectForm = ({ setShowUpdateProjectPage, oldProjectData }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectSchemaType>({
    defaultValues: {
      name:        oldProjectData?.name,
      description: oldProjectData?.description,
      techStack:   oldProjectData?.techStack,
      githubLink:  oldProjectData?.githubLink,
      liveLink:    oldProjectData?.liveLink,
    },
    resolver: zodResolver(projectSchemaDto),
  });

  const onSubmit = async (data: ProjectSchemaType) => {
    try {
      setLoading(true);
      const parsedData = await projectSchemaDto.parseAsync(data);
      const payload = {
        ...parsedData,
        techStack: parsedData.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };
      await axios.patch(`/api/project/${oldProjectData.id}`, payload);
      reset();
      alert("Project Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-xl relative"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p
              className="text-[9px] tracking-[3px] uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Admin · Projects
            </p>
            <h2
              className="text-[22px] tracking-[-0.5px]"
              style={{ fontFamily: "var(--font-serif)", color: "#f0e8d8" }}
            >
              Edit{" "}
              <em className="italic" style={{ color: "#c8430a" }}>
                Project.
              </em>
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowUpdateProjectPage(false)}
            className="flex items-center justify-center w-8 h-8 transition-colors duration-150"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.3)",
              background: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c8430a";
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "#c8430a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <FaXmark size={12} />
          </button>
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 py-6 flex flex-col gap-5"
        >
          {/* Single line fields */}
          {fields.map(({ name, label, type, placeholder, hint }) => (
            <div key={name}>
              <label
                className="block text-[9px] tracking-[2px] uppercase mb-2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                style={inputStyle}
                onFocus={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(200,67,10,0.6)")
                }
                onBlur={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)")
                }
                className="placeholder:opacity-20"
              />
              {hint && (
                <p
                  className="text-[10px] tracking-[0.5px] mt-1.5"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {hint}
                </p>
              )}
              {errors[name] && (
                <p className="text-[11px] mt-1.5" style={{ color: "#c8430a" }}>
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Description — textarea */}
          <div>
            <label
              className="block text-[9px] tracking-[2px] uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe your project..."
              {...register("description")}
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(200,67,10,0.6)")
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.1)")
              }
              className="placeholder:opacity-20"
            />
            {errors.description && (
              <p className="text-[11px] mt-1.5" style={{ color: "#c8430a" }}>
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-[11px] tracking-[2px] uppercase py-3.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            style={{
              background: "#c8430a",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              if (!loading)
                (e.currentTarget as HTMLElement).style.background = "#a83508";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c8430a";
            }}
          >
            {loading ? "Updating..." : "Update Project →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;