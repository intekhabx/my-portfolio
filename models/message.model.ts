import mongoose from "mongoose";
import { Document } from "mongoose";


export interface IMessage extends Document {
  name: string,
  email: string,
  message: string,
}


const messageSchema = new mongoose.Schema<IMessage>({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, "message is required"],
    minlength: 10
  }
}, {timestamps: true})


export const messageModel = mongoose.model("Message", messageSchema);