"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";


interface ProjectFormData {
  name: string;
  description: string;
  techStack: string;
  githubLink: string;
  liveLink: string;
}

interface Props {
  setShowAddProjectPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectForm = ({setShowAddProjectPage}: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        techStack: data.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      const response = await axios.post("/api/project", payload);

      console.log(response.data);

      reset();
      alert("Project Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 w-full fixed top-0 left-0 ">
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <div className="flex justify-between">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Add New Project
          </h2>
          <span onClick={()=> setShowAddProjectPage(false)}>
            <FaXmark />
          </span>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Project Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Portfolio Website"
              {...register("name", {
                required: "Project name is required",
              })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Describe your project..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Tech Stack
            </label>

            <input
              type="text"
              placeholder="React, Next.js, TypeScript, MongoDB"
              {...register("techStack", {
                required: "Tech stack is required",
              })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-zinc-500">
              Separate technologies with commas.
            </p>

            {errors.techStack && (
              <p className="mt-1 text-sm text-red-400">
                {errors.techStack.message}
              </p>
            )}
          </div>

          {/* Github Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              GitHub Link
            </label>

            <input
              type="url"
              placeholder="https://github.com/username/project"
              {...register("githubLink")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Live Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Live Demo Link
            </label>

            <input
              type="url"
              placeholder="https://yourproject.com"
              {...register("liveLink")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;