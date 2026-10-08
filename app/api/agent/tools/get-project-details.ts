import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model"


function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


export async function getProjectDetails(projectName: string) {

  // we add dbConnecton because nextjs run on the edge, when LLM call this tool first it establish DB conneciton
  await dbConnection();

  const safeName = escapeRegex(projectName.trim());

  return await projectModel.findOne({
    name: {
      $regex: safeName, //pattern matching text in name
      $options: "i", //capital, small case insensitive
    },
  }).select("name description techStack liveLink githubLink").lean();
}



export const getProjectDetailsTool = {
  type: "function" as const,
  function: {
    name: "get_project_details",
    description: "Get detailed information about a specific portfolio project.",
    parameters: {
      type: "object",
      properties: {
        projectName: {
          type: "string",
          description: "Name of the project.",
        },
      },
      required: ["projectName"],
    },
  },
}
