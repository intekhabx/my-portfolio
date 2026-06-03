"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IProject } from "@/models/project.model";
import AddProjectForm from "./AddProjectFom";
import { FaGithub } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";


const Project = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProjectPage, setShowAddProjectPage] = useState(false);

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
    confirm("Are you sure want to delete");

    const response = await axios.delete(`/api/project/${id}`)
    console.log(response.data)
    // alert(response?.data?.message)
  }

  useEffect(() => {
    getAllProject();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Total Projects:{" "}
            <span className="font-semibold text-white">
              {projects.length}
            </span>
          </p>
        </div>

        <div className="">
          <button 
          onClick={()=> setShowAddProjectPage(true)}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
            "Add"
          </button>
        </div>
      </div>

      {/* Project List */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          All Projects
        </h2>

        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 py-10 text-center text-zinc-400">
            No projects found
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project._id.toString()}
                className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-5 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">
                      {project.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {project.description || "No description available"}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-wrap gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                        <FaGithub />
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                      >
                        <IoMdEye/>
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                    onClick={()=> handleDelete(project._id.toString())}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                      <MdDelete />
                    </button>

                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                      <MdEdit />
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 border-t border-zinc-700 pt-3 text-xs text-zinc-500">
                  ID: {project._id.toString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* project add page */}
      {
        showAddProjectPage && <AddProjectForm setShowAddProjectPage={setShowAddProjectPage} />
      }
    </div>
  );
};

export default Project;