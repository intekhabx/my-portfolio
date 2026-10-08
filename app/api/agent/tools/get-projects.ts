import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model";


export async function getProjects(){

    // we add dbConnecton because nextjs run on the edge, when LLM call this tool first it establish DB conneciton
  await dbConnection();

  return await projectModel.find({}, {
    name: 1,
    description: 1,
    techStack: 1,
    liveLink: 1,
    githubLink: 1,
  })
  .sort({isVisible: -1, createdAt: -1}); //latest project which has isVisible: true
  // return only these 5 data of every project
  // _id, createdAt, updatedAt, etc shouldn't send to the LLM
}


export const getProjectsTool = {
  type: "function" as const,
  function: {
    name: "get_projects",
    description: "Get Md Intekhab Alam's portfolio projects.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
}