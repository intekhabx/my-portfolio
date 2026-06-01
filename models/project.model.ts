import mongoose from "mongoose";
import { Document } from "mongoose";


export interface IProject extends Document {
  name: string,
  description: string,
  techStack: string[],
  liveLink?: string,
  githubLink?: string
}


const projectSchema = new mongoose.Schema<IProject>({
  name: {
    type: String,
    required: [true, "project name is required"],
    trim: true,
    minlength: 2,
  },
  description: {
    type: String,
  },
  techStack: [
    {type: String}
  ],
  liveLink: {
    type: String,
  },
  githubLink: {
    type: String
  }
}, {timestamps: true})


export const projectModel = mongoose.model("Project", projectSchema);