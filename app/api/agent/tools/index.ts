// tools/index.ts

import { getProjectDetails } from "./get-project-details";
import { getProjects } from "./get-projects";



export const toolHandlers = {
  get_projects: async () => {
    return getProjects();
  },

  get_project_details: async (args: { projectName: string }) => {
    return getProjectDetails(args.projectName);
  },
};
