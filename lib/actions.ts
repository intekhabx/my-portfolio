"use server";

import { messageModel } from "@/models/message.model";
import dbConnection from "./db";
import { messageSchemaDto } from "./validation";

export async function submitContactMessage(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    const inputBody = await messageSchemaDto.safeParseAsync(rawData);
    if(!inputBody.success){
      return {success: false, error: inputBody.error.flatten().fieldErrors}
    }

    const {email, message, name} = inputBody.data;
    
    await dbConnection();

    const result = await messageModel.create({
      name, 
      email,
      message
    })

    if(!result){
      return {success: false, error: "failed to send message"};
    }

    return { success: true };
  } 
  catch (error) {
    console.error(error);
    return {success: false, error: "something went wrong"}
  }
}