"use client";

import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FaXmark, FaImage, FaTrash } from "react-icons/fa6";
import { projectSchemaDto, ProjectSchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineEditNote } from "react-icons/md";
import Image from "next/image";

interface Props {
  setShowUpdateProjectPage: React.Dispatch<React.SetStateAction<boolean>>;
  oldProjectData: {
    id: string;
    name: string;
    description?: string;
    techStack: string;
    githubLink?: string;
    liveLink?: string;
    imageUrl?: string; // Old project image URL
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

const UpdateProjectForm = ({ setShowUpdateProjectPage, oldProjectData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    oldProjectData?.imageUrl || null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectSchemaType>({
    defaultValues: {
      name: oldProjectData?.name,
      description: oldProjectData?.description,
      techStack: oldProjectData?.techStack,
      githubLink: oldProjectData?.githubLink,
      liveLink: oldProjectData?.liveLink,
    },
    resolver: zodResolver(projectSchemaDto),
  });

  // Image handle & preview logic
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: ProjectSchemaType) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      formData.append("techStack", data.techStack);
      if (data.githubLink) formData.append("githubLink", data.githubLink);
      if (data.liveLink) formData.append("liveLink", data.liveLink);

      // Agar new image select hui hai toh FormData mein append karein
      if (imageFile) {
        formData.append("file", imageFile);
      } else if (imagePreview) {
        // Agar new image nahi select hui par purani hai
        formData.append("imageUrl", imagePreview);
      }

      await axios.put(`/api/project/${oldProjectData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      setShowUpdateProjectPage(false);
    } 
    catch (error) {
      console.error("Update error:", error);
      alert("Failed to update project");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={() => setShowUpdateProjectPage(false)}
    >
      <div
        className="w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 font-[var(--font-body)]"
        style={{
          backgroundColor: "var(--bg-soft)",
          borderColor: "var(--line)",
          color: "var(--ink)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--line)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg border"
              style={{
                backgroundColor: "var(--bg-soft)",
                borderColor: "var(--line)",
                color: "var(--accent)",
              }}
            >
              <MdOutlineEditNote size={20} />
            </div>
            <div>
              <p
                className="text-[10px] font-mono tracking-[2px] uppercase"
                style={{ color: "var(--ink-muted)" }}
              >
                Admin · Projects
              </p>
              <h2
                className="text-lg font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--ink)",
                }}
              >
                Edit Project<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowUpdateProjectPage(false)}
            className="hover:bg-[var(--accent)]/5 p-2 rounded-lg border transition-colors hover:opacity-80 cursor-pointer"
            style={{
              borderColor: "var(--line)",
              color: "var(--ink-soft)",
            }}
            title="Close Modal"
          >
            <FaXmark size={14} />
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 overflow-y-auto space-y-5 flex-1"
        >
          {/* Image Upload & Preview Section */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] font-mono tracking-[1.5px] uppercase font-semibold"
              style={{ color: "var(--ink-soft)" }}
            >
              Project Cover Image
            </label>

            {imagePreview ? (
              <div
                className="relative w-full h-44 rounded-lg overflow-hidden border group"
                style={{ borderColor: "var(--line)" }}
              >
                <Image
                  src={imagePreview}
                  alt="Project Preview"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 rounded-md bg-black/70 text-red-400 hover:bg-black/90 transition-colors"
                  title="Remove Image"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center w-full h-36 rounded-lg border-2 border-dashed cursor-pointer transition-colors"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--line)",
                }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaImage
                    className="mb-2 text-2xl"
                    style={{ color: "var(--ink-muted)" }}
                  />
                  <p
                    className="text-xs font-mono"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Click to upload new image
                  </p>
                  <p
                    className="text-[10px] font-mono mt-1"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    PNG, JPG, WEBP (MAX. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Dynamic Fields */}
          {fields.map(({ name, label, type, placeholder, hint }) => (
            <div key={name} className="space-y-1.5">
              <label
                className="block text-[10px] font-mono tracking-[1.5px] uppercase font-semibold"
                style={{ color: "var(--ink-soft)" }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border outline-none transition-all duration-200 focus:ring-1"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--line)",
                  color: "var(--ink)",
                }}
              />
              {hint && (
                <p
                  className="text-[10px] font-mono"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {hint}
                </p>
              )}
              {errors[name] && (
                <p
                  className="text-[11px] font-mono mt-1"
                  style={{ color: "var(--accent)" }}
                >
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] font-mono tracking-[1.5px] uppercase font-semibold"
              style={{ color: "var(--ink-soft)" }}
            >
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe your project..."
              {...register("description")}
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border outline-none transition-all duration-200 focus:ring-1 resize-none"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--line)",
                color: "var(--ink)",
              }}
            />
            {errors.description && (
              <p
                className="text-[11px] font-mono mt-1"
                style={{ color: "var(--accent)" }}
              >
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div
            className="pt-4 flex items-center justify-end gap-3 border-t shrink-0"
            style={{ borderColor: "var(--line)" }}
          >
            <button
              type="button"
              onClick={() => setShowUpdateProjectPage(false)}
              className="bg-[var(--bg)] hover:bg-[var(--accent)]/5 px-4 py-2.5 text-xs tracking-wider rounded-lg border transition-all cursor-pointer"
              style={{
                borderColor: "var(--line)",
                color: "var(--ink-soft)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs bg-[var(--accent)]/90 hover:bg-[var(--accent)] tracking-wider rounded-lg text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Updating..." : "Update Project →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;