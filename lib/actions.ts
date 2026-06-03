"use server";

import { messageModel } from "@/models/message.model";
import dbConnection from "./db";

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!email || !message || !name) {
    return { success: false, error: "Missing fields" };
  }

  await dbConnection();

  const result = await messageModel.create({
    name, 
    email,
    message
  })

  if(!result){
    return {success: false}
  }

  return { success: true };
}