import { getProjectDetails } from "./get-project-details";
import { getProjects } from "./get-projects";
import { webSearch } from "./web-search";



export const toolHandlers = {
  get_projects: async () => {
    return getProjects();
  },

  get_project_details: async (args: { projectName: string }) => {
    return getProjectDetails(args.projectName);
  },

  web_search: async(args: {query: string, site?: string}) => {
    return webSearch(args.query, args?.site);
  },

};
