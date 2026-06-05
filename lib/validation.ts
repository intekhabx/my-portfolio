import { z } from "zod";


export const loginSchemaDto = z.object({
  email: z.email("Invalid email").max(322),
  password: z.string().min(8, "password must be atleast 8 character long").max(66)
})

export type LoginSchemaType = z.infer<typeof loginSchemaDto>;


export const messageSchemaDto = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email"),
  message: z.string().min(10, "Message too short"),
});

export type messageSchemaType = z.infer<typeof messageSchemaDto>;